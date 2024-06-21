import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Col, Form, DatePicker, Input, Select } from "antd";
import dayjs from 'dayjs';
import { checkDateTypeKey } from "../../utils/arrayUtils";
const { RangePicker } = DatePicker;

const ModalComponent = (props, ref) => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [column, setColum] = useState([]);

  const handleSubmit = async (values) => {
    const payload = {
      ...data,
      ...handleData(values)
    };
    const res = await props?.submitFunction(payload);
    if (!res?.error) {
      setIsOpen(false);
    }
  }

  useImperativeHandle(ref, () => ({
    open: (data, colum) => {
      setIsOpen(true);
      setData(data);
      setColum(colum.filter(item => item.isEdit));
      form.setFieldsValue(data);
    },
  }));

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "Đây là trường bắt buộc",
  };

  const mapOptions = (options) =>
  options
    ? options.map((option) => ({
        value: option.id || option.value,
        label: option.label || option.username || option.device_name,
      }))
    : [];

  const handleData = (data) => {
    let dataSubmit = {...data};
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        dataSubmit[key] = data[key].valueOf();      
      }
    });
    return dataSubmit;
  };

  return (
    <Modal
      title={props.title}
      open={isOpen}
      okText="Lưu"
      okType="primary"
      onOk={() => form.submit()}
      cancelText="Hủy bỏ"
      onCancel={() => {
        setData([]);
        setIsOpen(false);
        form.resetFields();
      }}
    >
      <br />
      <Form
        form={form}
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        {column.map((column) => (
            <Form.Item 
              label={column.title} 
              name={column.dataIndex} 
              key={column.title}
              rules={[
                { required: true },
              ]}
            >
              {column.type === 'select' && (
                <Select 
                  options={mapOptions(column.dataSelect || [])}
                  allowClear
                  value={data[column.dataIndex]}
                >
                </Select>
              )}

              {column.type === "text" && (
                <Input
                  name={column.dataIndex}
                  value={data[column.dataIndex]}
                  disabled = {!column.isEdit}
                />
              )}

              {column.type === "date" && (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  name={column.dataIndex}
                  placeholder={"Select date"}
                  disabledDate={(day) => {
                    if (column.dataIndex === 'end_date') {
                      const startDate = form.getFieldValue('start_date');
                      return day && day < dayjs(startDate).endOf('day');
                    }
                  }}
                />
              )}
              
              {column.type === "time" && (
                <DatePicker
                  showTime
                  format="HH:mm DD/MM/YYYY "
                  name={column.dataIndex}
                  placeholder={"Select date"}
                  disabledDate={(day) => {
                    if (column.dataIndex === 'end_time') {
                      const startDate = form.getFieldValue('start_time');
                      return day && day < dayjs(startDate).endOf('day');
                    }
                  }}
                />
              )}
            </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export const ModalControlData = forwardRef(ModalComponent);