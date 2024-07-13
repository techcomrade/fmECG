import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Space, Modal, Col, Form, DatePicker, Input, Select } from "antd";
import { CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { checkDateTypeKey, checkListTypeKey } from "../../utils/arrayUtils";
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
    console.log(payload);
    const res = await props?.submitFunction(payload);
    if (!res?.error) {
      setIsOpen(false);
    }
  }

  useImperativeHandle(ref, () => ({
    open: (data, columns) => {
      setIsOpen(true);
      setData(data);
      setColum(columns.filter(item => item.isEdit));
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
        label: option.label || option.device_name || option.username,
      }))
    : [];

  const handleData = (data) => {
    let dataSubmit = {...data};
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        dataSubmit[key] = data[key].valueOf();      
      }
      if (checkListTypeKey(key)) {
        dataSubmit[key] = data[key].list;      
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
      className={props.className}
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
                      return day && day < dayjs(startDate).startOf('day');
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
                      return day && day < dayjs(startDate).startOf('day');
                    }
                  }}
                />
              )}

              {column.type === "list" && (
                <Form.List name={[column.dataIndex, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            {column?.listLabel?.map(label => (
                              <Form.Item noStyle name={[subField.name, label]} key={[subField.name, label]}>
                                <Input placeholder={label} />
                              </Form.Item>
                            ))}
                            {subFields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => subOpt.remove(subField.name)}
                              />
                            ) : null}
                            {/* <CloseOutlined
                              onClick={() => {
                                ;
                              }}
                            /> */}
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Thêm thông số
                        </Button>
                      </div>
                    )}
                  </Form.List>
              )}
            </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export const ModalControlData = forwardRef(ModalComponent);