const HeartRecService = require("../services/HeartRecSevice");

class HeartRecMiddleware {
    async validateData(req, res, next) {
        let validated = HeartRecService.validateData(req.body).error;
        if (validated === undefined) next();
        return res
            .status(500)
            .json(`invalid request: ${validated.details[0].message}`)
    }
}

module.exports = new HeartRecMiddleware();