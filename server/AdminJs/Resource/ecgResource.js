
const EcgRecords = require('../../Models/ecgRecordModel.js');
const {Components, componentLoader} = require('../Component/CustomComponent.js')

const exportData = async (request, response, context) => {
  try {
    const ecgRecord = context.record;
    const dataDirectory = ecgRecord.param.data_directory;
    console.log(dataDirectory)
    const { record, currentAdmin } = context
          return {
            record: record.toJSON(currentAdmin),
            msg: 'Hello world',
          }

    // if (!fs.existsSync(dataDirectory)) {
    //   return response.status(404).json({ status: 'error', msg: 'Data directory not found' });
    // }

    // const exportFilePath = path.join(dataDirectory, 'exported_data.txt');


    // return response.status(404).json({ status: 'error', msg: 'Data directory not found' });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: 'error', msg: 'An error occurred while exporting data' });
  }
};


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
        created_at: {
          position: 6,
        },
        updated_at: {
          position: 7,
        },
        sensor_type: {
          position: 8
        },
        data_directory :{
          position: 9,
          components: {
            show: Components.ShowECGRecord,
          }
        },
      },

      actions: {
        exportData: {
          actionType: 'record',
          component: false,
          icon: 'Export',
          isVisible: true,
          handler: exportData
        },

        edit: {
          isVisible: false,
        },

      }
    },
  };
  
module.exports = EcgRecordsResource