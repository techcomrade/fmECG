import { createDevice, deleteDevice, getDevice, updateDevice, resetLoadDataStatus, resetCreateDataStatus, resetUpdateDataStatus, resetDeleteDataStatus, } from "../../redux/reducer/deviceSlice";

class DeviceData {
    getColumnShow() {
      const columns = [
        {
            title: 'Tên thiết bị',
            dataIndex: 'device_name',
            key: 'device_name',
            isEdit: true
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'device_type',
            key: 'device_type',
            isEdit: true
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            isEdit: true
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            isEdit: true
          },
      ];

        return columns;
    }

    getFunction() {
        return {
            createData: createDevice,
            getData: getDevice,
            updateData: updateDevice,
            deleteData: deleteDevice,
            resetLoadDataStatus: resetLoadDataStatus,
            resetCreateDataStatus: resetCreateDataStatus,
            resetDeleteDataStatus: resetDeleteDataStatus,
            resetUpdateDataStatus: resetUpdateDataStatus
        }
    }

    checkDateIndex(index) {
        const dateIndex = ['start_date', 'end_date']
        return dateIndex.includes(index);
    }
}
  
  
export default DeviceData;