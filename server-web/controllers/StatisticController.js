const express = require('express');
const StatisticService = require('../services/statisticService');


class StatisticController {
    async CountUsers(req, res, next) {
        console.log(`[P]:::Get all users: `);
        const total = await StatisticService.getAllUsers();
        return res.status(200).json({
            massage: "Get all records successful!",
            metadata: total,
        });
    }

    async CountDevices(req, res, next) {
        console.log(`[P]:::Get all devices: `);
        const total = await StatisticService.getAllDevices();
        return res.status(200).json({
            massage: "Get all records successful!",
            metadata: total,
        });
    }

    async CountRecords(req, res, next) {
        console.log(`[P]:::Get all records: `);
        const total = await StatisticService.getAllRecords();
        return res.status(200).json({
            massage: "Get all records successful!",
            metadata: total,
        });
    }
}

module.exports = new StatisticController();