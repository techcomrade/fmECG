let requests;
// const client = require("../config/redis");
const TokenService = require("../services/TokenService");
class CommonMiddleware {
  validationToken(req, res, next) {
    if (!req.headers["authorization"]) {
      return res.status(400).json({
        message: "Lack of token",
      });
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    return TokenService.decodeToken(token)
      ? next()
      : res.status(500).json({ message: "Failed to verify token" });
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
module.exports = new CommonMiddleware();
