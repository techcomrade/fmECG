
class CommonMiddleware {
  validationToken(req, res, next) {
    next();
  }
}
module.exports = new CommonMiddleware();
