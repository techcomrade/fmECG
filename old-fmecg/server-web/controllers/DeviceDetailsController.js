const DeviceDetailsService = require('../services/DeviceDetailsService');
const DeviceService = require('../services/DeviceService');

class DeviceDetailsController {
   async add(req, res) {
    console.log(`[P]:::Add device frequency data`, req.body);
    const deviceFreq = req.body;
    let checkExistDevice = await DeviceService.getDeviceById(deviceFreq.device_id);
    if(!checkExistDevice) {
        return res.status(400).json({
            message: 'Device frequency not found',
        })
    }
    await DeviceDetailsService.add(deviceFreq)
        .then(checked => {
            if(checked) {
                return res.status(200).json({
                    message: 'Device frequency added successfully',
                });
            }
            return res.status(500).json({
                message: 'err server add failed',
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: " add device frequency failed",
            })
        })
   }

   async delete(req, res) {
    console.log(`[P]:::: Delete device frequency`, req.params.id);
    const id = req.params.id;
    if(!id) {
        return res.status(500).json({
            message: 'No id provided',
        })
    }
    let checkExistDeviceFreq = await DeviceDetailsService.getById(id);
    if(!checkExistDeviceFreq?.dataValues) {
        return res.status(400).json({
            message: 'no device frequency found',
        })
    }
    await DeviceDetailsService.deleteById(id)
    .then(checked => {
        if(checked) {
            return res.status(200).json({
                message: "delete device frequency successfully"
            })
        }
        return res.status(500).json({
            message: 'delete device frequency failed'
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            message: 'error server'
        })
    })
   }

   async update(req, res) {
    console.log(`[P]::: Update device frequency`, req.body);
    const id = req.body.id;
    const deviceFreq = req.body;
    let checkExistDeviceFreq = await DeviceDetailsService.getById(id);
    if(!checkExistDeviceFreq?.dataValues){
        return res.status(400).json({
            message: 'device frequency not found'
        })
    }
    let checkExistDeviceId = await DeviceService.getDeviceById(deviceFreq.device_id);
    if(!checkExistDeviceId?.dataValues){
        return res.status(400).json({
            message: 'device id not found'
        })
    }
    await DeviceDetailsService.updateById(deviceFreq, id)
    .then(checked => {
        if(checked) return res.status(200).json({
            message: 'updated device frequency successfully'
        })
        return res.status(500).json({
            message: 'update device frequency failed'
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            message: 'server error'
        })
    })
   }
}

module.exports = new DeviceDetailsController();