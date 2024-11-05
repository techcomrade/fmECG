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
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import "./schedule.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { DiagnosisResponse } from "../../api";
import {
  getDiagnosisByScheduleId,
  resetLoadGetDiagnosisByScheduleIdStatus,
} from "../../redux/reducer/diagnosisSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import {
  getAvailableScheduleByDoctorId,
  resetLoadGetAvailableScheduleByDoctorId,
} from "../../redux/reducer/scheduleSlice";

const ModalComponent = (props: any, ref: any) => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(props.isOpen);
  const [isEnableAdd, setIsEnableAdd] = React.useState<boolean>(true);
  const [column, setColumn] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector((state) => state.schedule);
  const diagnosisState = useAppSelector((state) => state.diagnosis);
  const [availableSchedule, setAvailableSchedule] = React.useState<any>([]);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
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
    const payload = {
      ...handleData(values),
      doctor_id: data.doctor_id,
      schedule_id: data.schedule_id,
      patient_id: data.patient_id,
      patient: data.patient,
      start_time: data.start_time,
      end_time: data.end_time,
    };
    console.log(payload);
    const res = await props?.submitFunction(payload);
    if (!res?.error) {
      setIsOpen(false);
      form.resetFields();
      dispatch(getDiagnosisByScheduleId(data.schedule_id));
      dispatch(getAvailableScheduleByDoctorId(data.doctor_id));
    }
  };

  const disabledDate = (day: Dayjs): boolean => {
    const availableDates = availableSchedule.map((schedule: any) =>
      dayjs(schedule.date).startOf("day").format("YYYY-MM-DD")
    );
    const isAvailable = availableDates.includes(day.format("YYYY-MM-DD"));
    return day < dayjs().startOf("day") || !isAvailable;
  };

  const getBusyHours = (selectedDate: Dayjs | null): number[] => {
    if (!selectedDate) return [];
    const selectedDateString = selectedDate.format("YYYY-MM-DD");
    const day = availableSchedule.find(
      (schedule: any) =>
        dayjs(schedule.date).format("YYYY-MM-DD") === selectedDateString
    );
    const hours = [
      8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15,
      15.5, 16, 16.5, 17, 17.5,
    ];
    const busyHours = hours.filter(
      (busyHour) => !day?.hours.includes(busyHour)
    );
    return day ? busyHours : [];
  };

  const disabledTime = () => {
    const busyHours = getBusyHours(selectedDate);

    return {
      disabledHours: () => {
        const fullyBusyHours = busyHours.filter(
          (hour) => busyHours.includes(hour + 0.5) && hour % 1 === 0
        );
        for (let i = 0; i < 8; i++) fullyBusyHours.push(i);
        for (let i = 18; i <= 24; i++) fullyBusyHours.push(i);
        return fullyBusyHours;
      },

      disabledMinutes: (selectedHour: number) => {
        const isBusyAtHour = busyHours.includes(selectedHour);
        const isBusyAtHalfHour = busyHours.includes(selectedHour + 0.5);

        const disabledMinutes = [];
        if (isBusyAtHour) disabledMinutes.push(0);
        if (isBusyAtHalfHour) disabledMinutes.push(30);
        return disabledMinutes;
      },
    };
  };

  React.useImperativeHandle(ref, () => ({
    open: (data: any, columns: any[]) => {
      setIsOpen(true);
      setData(data);
      setColumn(columns);
      dispatch(getAvailableScheduleByDoctorId(data.doctor_id));
      if (data.selected_date.startOf("day").isAfter(dayjs().startOf("day")))
        setIsEnableAdd(false);
      else setIsEnableAdd(true);
    },
  }));

  React.useEffect(() => {
    if (data.schedule_id) dispatch(getDiagnosisByScheduleId(data.schedule_id));
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
    ) {
      dispatch(resetLoadGetDiagnosisByScheduleIdStatus());
      setDiagnosis({} as DiagnosisResponse);
    }
  }, [
    diagnosisState.loadGetDiagnosisByScheduleIdStatus,
    Object.keys(diagnosisState.diagnosis),
  ]);

  React.useEffect(() => {
    if (
      scheduleState.loadGetAvailableScheduleByDoctorId ===
      ApiLoadingStatus.Success
    ) {
      dispatch(resetLoadGetAvailableScheduleByDoctorId());
      setAvailableSchedule(scheduleState.availableSchedule);
    }
  }, [scheduleState.loadGetAvailableScheduleByDoctorId]);

  const mapOptions: any = (options: any[]) =>
    options
      ? options.map((option) => ({
          value: option.value,
          label: option.label,
        }))
      : [];

  return (
    <>
      {Object.keys(diagnosis).length === 0 ? (
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
          <Form
            form={form}
            onFinish={handleSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            disabled={!isEnableAdd}
          >
            <Form.Item label="Bệnh nhân" style={{ marginBottom: "8px" }}>
              <div>{data.patient}</div>
            </Form.Item>
            <Form.Item label="Thời gian khám" style={{ marginBottom: "15px" }}>
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
                    style={{ marginBottom: "22px" }}
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
                    style={{ marginBottom: "0px" }}
                  >
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item name="schedule_start_time">
                          <DatePicker
                            format={"DD/MM/YYYY"}
                            placeholder="Ngày tái khám"
                            disabledDate={disabledDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              form.setFieldsValue({
                                schedule_start_time: date,
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="schedule_session">
                          <TimePicker
                            format="HH:mm"
                            placeholder="Ca khám"
                            minuteStep={30}
                            disabledTime={disabledTime}
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
      ) : (
        <Modal
          title={props.title}
          open={isOpen}
          footer={null}
          width={450}
          onCancel={() => {
            setData([]);
            setIsOpen(false);
          }}
          className={props.className}
        >
          <Form form={form} labelCol={{ span: 10 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="Bệnh nhân" style={{ marginBottom: "2px" }}>
              <div>{data.patient}</div>
            </Form.Item>
            <Form.Item label="Thời gian khám" style={{ marginBottom: "4px" }}>
              <div>
                Từ {data.start_time} đến {data.end_time}
              </div>
            </Form.Item>
            <Form.Item
              label="Thông tin chẩn đoán:"
              style={{ marginBottom: "2px" }}
            >
              <div>{diagnosis.information}</div>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export const ModalDiagnosisData = React.forwardRef(ModalComponent);
