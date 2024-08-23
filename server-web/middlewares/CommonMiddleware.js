let requests;

const TokenService = require("../services/TokenService");
const roleGroup = {
  admin: 0,
  doctor: 1,
  patient: 3,
};

const redis = require('../config/redis.config');

class CommonMiddleware {
  async validationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decodeToken = await TokenService.decodeToken(token);
    if (!decodeToken) {
      const decodedRefreshToken = await TokenService.decodeToken(req.body.refresh_token);
      if(!decodedRefreshToken) return res.status(401).json({ message: "Unauthorized" });

      const newAccessToken = await TokenService.refreshToken(req.body.refresh_token, 0.5);
      console.log(token.account_id);
      await res.setHeader("authorization", `Bearer ${newAccessToken}`); 
    }

    res.locals.role = decodeToken.role;
    next();
  }

  restrictRole(...roles) {
    return (req, res, next) => {
      const userRole = res.locals.role;
      console.log(roles);
      if (!roles.includes(userRole)) {
        return res
          .status(500)
          .json({ message: "Access denied. Role restriction." });
      }
      next();
    };
  }

  async apiLimiter(req, res, next) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if ((await client.get(ip)) === null) {
      requests = 1;
      await client.set(ip, requests);
      await client.expire(ip, 1);
      console.log("Number of reqs:", await client.get(ip));
      console.log("Time left:", 1);
      return next();
    } else {
      const requests = await client.incr(ip, (err, result) => {
        if (err) console.log(err);
        return result;
      });
      console.log("Number of reqs:", requests);
      console.log("Time left:", await client.ttl(ip));
      if (requests > 5) {
        return res.status(429).json({
          message: "Too many requests, please try again later",
        });
      }
      return next();
    }
  }
}

module.exports = {
  roleGroup,
  commonMiddleware: new CommonMiddleware(),
};
