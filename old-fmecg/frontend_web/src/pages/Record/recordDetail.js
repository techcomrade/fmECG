import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDateTime } from "../../utils/dateUtils";
import { DrawerSide } from '../../components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getRecordById, loadStatus } from '../../redux/reducer/recordSlice';
import { Divider } from 'antd';

const RecordDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  const { recordData, loadRecordDataStatus } = useSelector((state) => state.record);

  const handleData = (data) => {
    const deviceData = {...data};
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          deviceData[key] = convertTimeToDateTime(data[key]);
        }
      })

    return deviceData;
  };

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      if (id !== idSelect) {
        setIdSelect(id);
        dispatch(getRecordById(id));
      }
    },
  }));

  useEffect(()=>{
    if(loadRecordDataStatus === loadStatus.Success){
      const rawData = recordData.metadata;
      setData(handleData(rawData[0]));
    }
  }, [loadRecordDataStatus]);
 
  const labelsInfo = {
    device_name: "Tên thiết bị",
    username: "Tên người dùng",
    record_type: "Loại bản ghi",
    data_rec_url: "Đường dẫn data",
    start_time: "Thời gian bắt đầu",
    end_time: "Thời gian kết thúc"
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
        title = "Thông tin bản ghi"
        data = {data}
        labels = {labelsInfo}
        customData={customData}
       />
    </>
  );
};

export const RecordDetail = forwardRef(RecordDetailComponent);