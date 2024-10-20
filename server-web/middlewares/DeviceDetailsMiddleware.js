const DeviceDetailsService = require('../services/DeviceDetailsService');

class DeviceFreqMiddleware {
    async validateData(req, res, next) {
        console.log('[V]:::Validate device frequency data');
        let validated = DeviceDetailsService.validateDeviceFreq(req.body, true).error;
        if(validated === undefined) next();
        else return res.status(500).json({
            message: `invalid request: ${validated.details[0].message}`
        })
    }
    async validateCreateData(req, res, next) {
        console.log('[V]:::Validate Create Device Frequency: ')
        let validated = DeviceDetailsService.validateDeviceFreq(req.body,false).error;
        if (validated === undefined) next();
        else
          return res
            .status(500)
            .json({
              message: `invalid request: ${validated.details[0].message}`,
            });
      }
}

module.exports = new DeviceFreqMiddleware();