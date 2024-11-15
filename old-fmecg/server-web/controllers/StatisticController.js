const StatisticService = require("../services/StatisticService");

class StatisticController{
    async getTotal(req, res, next){
        console.log(`[P]:::Count total: `);
        const total = await StatisticService.getStatistics();
        return res.status(200).json({
          message: "Count successful!",
          metadata: total,
        });       
    }
}

module.exports = new StatisticController();