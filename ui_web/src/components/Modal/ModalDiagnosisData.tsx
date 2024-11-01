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
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { DiagnosisResponse } from "../../api";
import {
  getDiagnosisByScheduleId,
  resetLoadGetDiagnosisByScheduleIdStatus,
} from "../../redux/reducer/diagnosisSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";

const ModalComponent = (props: any, ref: any) => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(props.isOpen);
  const [column, setColumn] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();
  const diagnosisState = useAppSelector((state) => state.diagnosis);
  const [diagnosis, setDiagnosis] = React.useState<DiagnosisResponse>(
    {} as DiagnosisResponse
  );
  const { t } = useTranslation();

  const handleData = (data: any) => {
    let dataSubmit = { ...data };
    if (dataSubmit.schedule_start_time && dataSubmit.schedule_session) {
      const date = dataSubmit.schedule_start_time;
      const time = dataSubmit.schedule_session;
      const dateTime = dayjs(date).hour(time.hour()).minute(time.minute());
      dataSubmit.schedule_start_time = dateTime.valueOf() / 1000;
      dataSubmit.schedule_end_time =
        dataSubmit.schedule_start_time + Number(1800);
    }
    return dataSubmit;
  };

  const handleSubmit = async (values: any) => {
    const account_id = localStorage.getItem("account_id");
    const payload = {
      ...handleData(values),
      schedule_id: data.schedule_id,
      patient_id: data.patient_id,
      patient: data.patient,
      account_id: account_id,
      start_time: data.start_time,
      end_time: data.end_time,
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
      setColumn(columns);
      form.setFieldsValue(data);
    },
  }));

  React.useEffect(() => {
    dispatch(getDiagnosisByScheduleId(data.schedule_id));
  }, [data.schedule_id]);

  React.useEffect(() => {
    if (
      diagnosisState.loadGetDiagnosisByScheduleIdStatus ===
      ApiLoadingStatus.Success
    ) {
      dispatch(resetLoadGetDiagnosisByScheduleIdStatus());
      setDiagnosis(diagnosisState.diagnosis);
    }
    if (
      diagnosisState.loadGetDiagnosisByScheduleIdStatus ===
      ApiLoadingStatus.Failed
    )
      setDiagnosis({} as DiagnosisResponse);
  }, [diagnosisState.loadGetDiagnosisByScheduleIdStatus]);

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
      {Object.keys(diagnosis).length == 0 ? (
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Bệnh nhân">
            <div>{data.patient}</div>
          </Form.Item>
          <Form.Item label="Thời gian khám">
            <div>
              Từ {data.start_time} đến {data.end_time}
            </div>
          </Form.Item>
          {column.map((item: any) => {
            if (item.type === "text") {
              return (
                <Form.Item
                  label={item.title}
                  name={item.dataIndex}
                  key={item.dataIndex}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin chẩn đoán",
                    },
                  ]}
                >
                  <Input.TextArea
                    name={item.dataIndex}
                    placeholder="Thông tin chẩn đoán"
                  />
                </Form.Item>
              );
            }
            if (item.type === "select") {
              return (
                <Form.Item
                  label={item.title}
                  name={item.dataIndex}
                  key={item.dataIndex}
                >
                  <Select
                    options={mapOptions(item.dataSelect || [])}
                    allowClear
                    value={data[item.dataIndex]}
                    placeholder="Loại lịch tái khám"
                  ></Select>
                </Form.Item>
              );
            }
            if (item.type === "date") {
              return (
                <Form.Item
                  label={item.title}
                  name={item.dataIndex}
                  key={item.dataIndex}
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
                      <Form.Item name="schedule_session">
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
      ) : (
        <Form form={form} labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} >
          <Form.Item label="Thông tin chẩn đoán:">
            <div>{diagnosis.information}</div>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export const ModalDiagnosisData = React.forwardRef(ModalComponent);
