
const EcgRecords = require('../../Models/ecgRecordModel.js');
const {Components} = require('../Component/CustomComponent.js')


const EcgRecordsResource = {
    resource: EcgRecords,
    options: {
      parent: {
        // icon: 'List',
      },
      properties: {
        record_id: {
          position: 1,
        },
        user_id: {
          position: 2,
        },
        device_id: {
          position: 3,
        },
        start_time: {
          position: 4,
        },
        stop_time: {
          position: 5,
        },
        create_at: {
          position: 6,
        },
        updated_at: {
          position: 7,
        },
        data_directory :{
          position: 8,
          components: {
            show: Components.ShowECGRecord,
          }
        },
      },

      actions: {
        // show : {
        //   components: Components.ShowECGRecord
        // }
      }
    },
  };
  
module.exports = EcgRecordsResource