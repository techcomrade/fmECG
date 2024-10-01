import { createDevice, deleteDevice, getDevice, updateDevice, resetLoadDataStatus, resetCreateDataStatus, resetUpdateDataStatus, resetDeleteDataStatus, } from "../../redux/reducer/deviceSlice";
import { useTranslation } from "react-i18next";
class DeviceData {
    getColumnShow() {
        // const { t } = useTranslation();
      const columns = [
        {
            title: "Tên thiết bị",
            dataIndex: 'device_name',
            key: 'device_name',
            type: 'text',
            isEdit: true
        },
        {
            title: 'Loại thiết bị',
            dataIndex: 'device_type',
            key: 'device_type',
            type: 'text',
            isEdit: true
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'start_date',
            key: 'start_date',
            type: 'date',
            isEdit: true
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
            type: 'text',
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