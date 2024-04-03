import { createDevice, deleteDevice, getDevice, updateDevice } from "../../redux/reducer/deviceSlice";

class DeviceData {
    getColumnShow() {
      const columns = [
        {
            title: 'Tên thiết bị',
            dataIndex: 'device_name',
            key: 'device_name',
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'device_type',
            key: 'device_type',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
          },
      ];

        return columns;
    }

    getFunction() {
        return {
            createData: createDevice,
            getData: getDevice,
            updateData: updateDevice,
            deleteData: deleteDevice
        }
      }
}
  
  
export default DeviceData;