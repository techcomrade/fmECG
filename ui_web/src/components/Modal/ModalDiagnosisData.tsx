import * as React from "react";
import {
  Modal,
  Form,
  DatePicker,
  Input,
  TimePicker,
  Row,
  Col,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import "./schedule.scss";

const ModalComponent = (props: any, ref: any) => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(props.isOpen);
  const [column, setColumn] = React.useState<any[]>([]);
  const { t } = useTranslation();

  const handleData = (data: any) => {
    let dataSubmit = { ...data };
    if (dataSubmit.schedule_start_time && dataSubmit.session) {
      const date = dataSubmit.schedule_start_time;
      const time = dataSubmit.session;
      const dateTime = dayjs(date).hour(time.hour()).minute(time.minute());
      dataSubmit.schedule_start_time = dateTime.valueOf() / 1000;
      dataSubmit.schedule_end_time =
        dataSubmit.schedule_start_time + Number(1800);
    }
    delete dataSubmit.session;
    return dataSubmit;
  };

  const handleSubmit = async (values: any) => {
    const account_id = localStorage.getItem("account_id");
    const payload = {
      ...handleData(values),
      schedule_id: data.schedule_id,
      patient_id: data.patient_id,
      account_id: account_id,
    };
    console.log(payload);
    const res = await props?.submitFunction(payload);
    if (!res?.error) {
      setIsOpen(false);
    }
  };

  React.useImperativeHandle(ref, () => ({
    open: (data: any, columns: any[]) => {
      setIsOpen(true);
      setData(data);
      setColumn(columns.filter((item) => item.isEdit));
      form.setFieldsValue(data);
    },
  }));

  const mapOptions: any = (options: any[]) =>
    options
      ? options.map((option) => ({
          value: option.value,
          label: option.label,
        }))
      : [];

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
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        {column.map((column: any) => {
          if (column.type === "text") {
            return (
              <Form.Item
                label={column.title}
                name={column.dataIndex}
                key={column.dataIndex}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin chẩn đoán",
                  },
                ]}
              >
                <Input.TextArea
                  name={column.dataIndex}
                  placeholder="Thông tin chẩn đoán"
                />
              </Form.Item>
            );
          }
          if (column.type === "select") {
            return (
              <Form.Item
                label={column.title}
                name={column.dataIndex}
                key={column.dataIndex}
              >
                <Select
                  options={mapOptions(column.dataSelect || [])}
                  allowClear
                  value={data[column.dataIndex]}
                  placeholder="Loại lịch tái khám"
                ></Select>
              </Form.Item>
            );
          }
          if (column.type === "date") {
            return (
              <Form.Item
                label={column.title}
                name={column.dataIndex}
                key={column.dataIndex}
              >
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item name="schedule_start_time">
                      <DatePicker
                        format={"DD/MM/YYYY"}
                        placeholder="Ngày tái khám"
                        disabledDate={(day) =>
                          day && day < dayjs().startOf("day")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="session">
                      <TimePicker
                        format="HH:mm"
                        placeholder="Ca khám"
                        minuteStep={30}
                        disabledTime={() => ({
                          disabledHours: () => {
                            const hours = [];
                            for (let i = 0; i < 7; i++) hours.push(i);
                            for (let i = 18; i <= 24; i++) hours.push(i);
                            return hours;
                          },
                        })}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            );
          }
          return null;
        })}
      </Form>
    </Modal>
  );
};

export const ModalDiagnosisData = React.forwardRef(ModalComponent);
