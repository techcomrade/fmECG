import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Col, Form, DatePicker, Input, Select } from "antd";
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

  const handleSubmit = async () => {
      const res = await props?.submitFunction(data);
      if (!res?.error) {
        setIsOpen(false);
      }
  }

  useImperativeHandle(ref, () => ({
    open: (data, colum) => {
      setIsOpen(true);
      setData(data);
      setColum(colum.filter(item => item.isEdit));
    },
  }));

  const mapOptions = (options) =>
  options
    ? options.map((option) => ({
        value: option.id || option.value,
        label: option.label || option.username || option.device_name,
      }))
    : [];

  return (
    <Modal
      title={props.title}
      open={isOpen}
      okText="Lưu"
      okType="primary"
      onOk={handleSubmit}
      cancelText="Hủy bỏ"
      onCancel={() => {
        setData([]);
        setIsOpen(false);
      }}
    >
      <br />
      {column.map((column) => (
        <Col span={22} key={column.title}>
          <Form.Item label={column.title}>
            {column.type === 'select' && (
              <Select 
                options={mapOptions(column.dataSelect || [])}
                allowClear
                onChange={(value) => handleChangeInput(column.dataIndex, value)}
                value={data[column.dataIndex]}
              >
              </Select>
            )}
            {column.type === "text" && (
              <Input
                name={column.dataIndex}
                value={data[column.dataIndex]}
                onChange={(e) =>
                  handleChangeInput(column.dataIndex, e.target.value)
                }
                disabled = {!column.isEdit}
              />
            )}
            {column.type === "date" && (
              <DatePicker
                format={"DD/MM/YYYY"}
                name={column.dataIndex}
                value={data[column.dataIndex] ? dayjs(data[column.dataIndex], "DD/MM/YYYY") : null}
                placeholder={"Select date"}
                onChange={(date, dateString) =>
                  {
                    handleChangeInput(column.dataIndex, dateString)
                  }
                }
              />
            )}
          </Form.Item>
        </Col>
      ))}
    </Modal>
  );
};

export const ModalControlData = forwardRef(ModalComponent);