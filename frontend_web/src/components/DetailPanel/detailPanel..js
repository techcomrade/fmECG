import { forwardRef, useImperativeHandle, useState } from "react";
import {  Button, Drawer, Col, Form, DatePicker, Input, Select } from "antd";
import { getCurrentTimeToString } from "../../utils/dateUtils";
import dayjs from 'dayjs';

const ModalComponent = (props, ref) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [column, setColum] = useState([]);

  const handleChangeInput = (para, value) => {
    let preState = { ...data};
    preState[para] = value;
    setData({ ...preState });
  };

  const handleSubmit = () => {
      props?.submitFunction(data);
      setIsOpen(false);
  }

  useImperativeHandle(ref, () => ({
    open: (data, colum) => {
      setIsOpen(true);
      setData(data);
      setColum(colum);
    },
  }));

  const mapOptions = (options) =>
  options
    ? options.map((option) => ({
        value: option.id,
        label: option.username || option.device_name,
      }))
    : [];

  return (
    <Drawer title="Basic Drawer" onClose={setIsOpen} open={isOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
  );
};

export const ModalControlData = forwardRef(ModalComponent);