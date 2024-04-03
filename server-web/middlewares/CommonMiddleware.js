const rateLimit = [];
class CommonMiddleware {
  validationToken(req, res, next) {
    next();
  }
  apiLimiter(req, res, next) {
    const ip = req.ip;
    const date = Date.now();
    if (!rateLimit[ip]) {
      rateLimit[ip] = { time: date, requests: 1 };
      return next();
    }
    const delta = date - rateLimit[ip].time;
    if (delta < 1000) {
      rateLimit[ip].requests++;
      if (rateLimit[ip].requests > 5) {
        return res.status(429).json({
          message: "Too many requests, please try again later",
        });
      }
      return next();
    }
    rateLimit[ip] = { time: date, requests: 1 };
    return next();
  }
}
module.exports = new CommonMiddleware();
