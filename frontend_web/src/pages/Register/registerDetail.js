import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDateTime } from "../../utils/dateUtils";
import { DrawerSide } from '../../components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getRecordById, loadStatus } from '../../redux/reducer/recordSlice';
import { Divider } from 'antd';

const RegisterDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  const handleData = (data) => {
    const registerData = {...data};
      Object.keys(data).forEach((key) => {
        if (checkDateTypeKey(key)) {
            registerData[key] = convertTimeToDateTime(data[key]);
        }
      })

    return registerData;
  };

  useImperativeHandle(ref, () => ({
    open: (data) => {
      setIsOpen(true);
      if (data?.id !== idSelect) {
        setIdSelect(data.id);
        setData(data);
      }
    },
  }));
 
  const labelsInfo = {
    username: "Họ và tên",
    email: "Email",
    gender: "Giới tính",
    birth: "Ngày sinh",
    phone_number: "Số điện thoại",
    role: "Chức vụ",
    status: "Trạng thái",
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
        title = "Thông tin tài khoản đăng ký"
        data = {data}
        labels = {labelsInfo}
        customData={customData}
       />
    </>
  );
};

export const RegisterDetail = forwardRef(RegisterDetailComponent);