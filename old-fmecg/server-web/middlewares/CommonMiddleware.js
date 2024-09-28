let requests;
// const client = require("../config/redis");
const TokenService = require("../services/TokenService");
const roleGroup = {
  admin: 0,
  doctor: 1,
  patient: 3,
};

class CommonMiddleware {
  validationToken(req, res, next) {
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        message: "Lack of token",
      });
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const decodeToken = TokenService.decodeToken(token);
    if (!decodeToken)
    {  return res.status(500).json({ message: "Failed to verify token" });}
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
