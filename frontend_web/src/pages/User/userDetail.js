import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {convertGenderToString, convertStringToGender} from "../../constants";
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import dayjs from "dayjs";
import { DrawerSide } from '../../components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, loadStatus } from '../../redux/reducer/userSlice';

const UserDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const {userData,loadUserDataStatus} = useSelector((state) => state.user);
  const handleData = (data, type) => {
    const userData = {...data};

    if (type === 'form') {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          userData[key] = dayjs(data[key], "DD/MM/YYYY");
        }

        if (key === 'gender') {
          userData[key] = convertStringToGender(data.gender);
        }
      })
    };
    
    if (type === 'render') {
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
          userData[key] = convertTimeToDate(data[key]);
        }

        if (key === 'gender') {
          userData[key] = convertGenderToString(data.gender);
        }
      })
    };

    return userData;
  }
  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      dispatch(getUserById(id))
    },
  }));
  useEffect(()=>{
    if(loadUserDataStatus === loadStatus.Success){
        
      const rawData = userData.metadata.map((element) => handleData(element, "render"));

        setData(rawData[0])
    }
  },[loadUserDataStatus])
 
  const labelsInfo = {
    username: 'Họ và tên',
    gender: 'Giới tính',
    birth: "Ngày sinh",
    phone_number: "Số điện thoại",
    status: "Trạng thái",
    role: "Quyền hạn",
    devices: "Số thiết bị",
    records: "Số bản ghi"
  }; 

  return (
    <>
       <DrawerSide
       closed = {()=> setIsOpen(false)}
       isOpen = {isOpen}
       title = "Dfdf"
       data = {data}
       labels = {labelsInfo}
       />
    </>
  );
};

export const UserDetail = forwardRef(UserDetailComponent);