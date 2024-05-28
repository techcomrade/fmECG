import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {convertGenderToString, convertRoleToString, convertStringToGender} from "../../constants";
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import { DrawerSide } from '../../components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, loadStatus } from '../../redux/reducer/userSlice';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';

const UserDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  const { userData, loadUserDataStatus } = useSelector((state) => state.user);

  const handleData = (data) => {
    const userData = {
      ...data,
      gender: convertGenderToString(data.gender),
      role: convertRoleToString(data.role)
    };

    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        userData[key] = convertTimeToDate(data[key]);
      }
    })

    return userData;
  };

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      if (id !== idSelect) {
        setIdSelect(id);
        dispatch(getUserById(id));
      }
    },
  }));

  useEffect(()=>{
    if(loadUserDataStatus === loadStatus.Success){
      const rawData = userData.metadata.map((element) => handleData(element));
      setData(rawData[0]);
    }
  }, [loadUserDataStatus]);
 
  const labelsInfo = {
    username: 'Họ và tên',
    gender: 'Giới tính',
    birth: "Ngày sinh",
    phone_number: "Số điện thoại",
    status: "Trạng thái",
    role: "Tác vụ",
    devices: "Số thiết bị",
    records: "Số bản ghi"
  }; 

  const customData = (
    <>
      <Avatar size={60} icon={<UserOutlined />}/>
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
        title = "Thông tin người dùng"
        data = {data}
        labels = {labelsInfo}
        customData={customData}
       />
    </>
  );
};

export const UserDetail = forwardRef(UserDetailComponent);