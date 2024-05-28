import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import { DrawerSide } from '../../components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getDeviceById, loadStatus } from '../../redux/reducer/deviceSlice';
import { Divider } from 'antd';

const DeviceDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  const { deviceData, loadDeviceDataStatus } = useSelector((state) => state.device);

  const handleData = (data) => {
    const deviceData = {...data};
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = convertTimeToDate(data[key]);
        }
      })

    return deviceData;
  };

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      if (id !== idSelect) {
        setIdSelect(id);
        dispatch(getDeviceById(id));
      }
    },
  }));

  useEffect(()=>{
    if(loadDeviceDataStatus === loadStatus.Success){
      const rawData = deviceData.metadata;
      setData(handleData(rawData));
    }
  }, [loadDeviceDataStatus]);
 
  const labelsInfo = {
    device_name: 'Tên thiết bị',
    device_type: 'Loại thiết bị',
    end_date: "Ngày kết thúc",
    start_date: "Ngày bắt đầu",
    recordCount: "Số bản ghi",
  }; 

  const customData = (
    <>
      <p className='site-description-item-profile-p'>Thông tin cụ thể</p>
      <p className='site-description-item-profile-wrapper'>{data?.information}</p>
      <Divider />
    </>
  )

  return (
    <>
       <DrawerSide
        closed = {()=> setIsOpen(false)}
        isOpen = {isOpen}
        title = "Thông tin thiết bị"
        data = {data}
        labels = {labelsInfo}
        customData={customData}
       />
    </>
  );
};

export const DeviceDetail = forwardRef(DeviceDetailComponent);