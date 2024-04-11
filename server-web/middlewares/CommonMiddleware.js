let requests;
const client = require("../config/redis");
class CommonMiddleware {
  validationToken(req, res, next) {
    next();
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
