import * as React from "react";
import type { CalendarProps } from "antd";
import { Badge, Calendar, ConfigProvider } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import viVN from "antd/lib/locale/vi_VN";
import {
  createScheduleByDoctor,
  getAllSchedules,
  resetLoadCreateScheduleByDoctorStatus,
} from "../../redux/reducer/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { checkDateTypeKey } from "../../utils/dateUtils";
import { ScheduleModal } from "../../components/Modal/ScheduleModal";
import {
  convertScheduleStatusToString,
  convertScheduleTypeToString,
  scheduleType,
} from "../../constants";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import { ModalDiagnosisData } from "../../components/Modal/ModalDiagnosisData";
import { createDiagnosis } from "../../redux/reducer/diagnosisSlice";
import { DiagnosisRequest } from "../../api";

type AddDiagnosis = {
  open: (data: any[], columns: any[]) => void;
};
export const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.schedule);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [data, setData] = React.useState<any[]>([]);
  const modalAddRef = React.useRef<AddDiagnosis>(null);

  const columns = [
    {
      title: "Thông tin chẩn đoán",
      dataIndex: "information",
      key: "information",
      type: "text",
      isEdit: true,
    },
    {
      title: "Lịch tái khám",
      dataIndex: "schedule_start_time",
      key: "schedule_start_time",
      type: "date",
      isEdit: true,
    },
    {
      title: "Loại lịch tái khám",
      dataIndex: "schedule_type_id",
      key: "schedule_type_id",
      type: "select",
      dataSelect: scheduleType,
      isEdit: true,
    },
  ];

  React.useEffect(() => {
    dispatch(getAllSchedules());
  }, []);

  React.useEffect(() => {
    if (dataState.loadDataStatus === ApiLoadingStatus.Success) {
      const rawData = dataState.data.map((schedule) => handleData(schedule));
      setData(rawData);
    }
  }, [dataState.loadDataStatus]);

  const handleData = (data: any) => {
    const scheduleData = { ...data };
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        const dateObj = dayjs.unix(data[key]);
        scheduleData[key] = dateObj.format("HH:mm DD/MM/YYYY");
        scheduleData.date = dateObj.date();
        scheduleData.month = dateObj.month();
        scheduleData.year = dateObj.year();
        scheduleData.time = Number(dateObj.format("HHmm"));
      }
    });
    return scheduleData;
  };

  const getListData = (value: Dayjs) => {
    return value
      ? data
          .filter(
            (item) =>
              item.date === value.date() &&
              item.month === value.month() &&
              item.year === value.year()
          )
          .map((schedule) => ({
            type: schedule.status_id === 1 ? "error" : "success",
            schedule_id: schedule.id,
            session: `Thời gian: Từ ${dayjs(
              schedule.schedule_start_time
            ).format("HH:mm")} đến ${dayjs(schedule.schedule_end_time).format(
              "HH:mm"
            )}`,
            time: Number(dayjs(schedule.schedule_start_time).format("HHmm")),
            doctor: `Bác sĩ: ${schedule.doctor_name}`,
            patient: `Bệnh nhân: ${schedule.patient_name}`,
            schedule_type: `Loại lịch hẹn: ${convertScheduleTypeToString(
              schedule.schedule_type_id
            )}`,
            status: `Trạng thái lịch hẹn: ${convertScheduleStatusToString(
              schedule.status_id
            )}`,
            patient_id: schedule.patient_id,
          }))
      : [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);

    if (listData.length === 0) {
      return null;
    }

    const count = {
      morning: 0,
      afternoon: 0,
      evening: 0,
    };

    listData.forEach((item) => {
      const time = item.time;
      if (time < 1200) {
        count.morning++;
      } else if (time >= 1200 && time < 1900) {
        count.afternoon++;
      } else {
        count.evening++;
      }
    });

    return (
      <ul className="events">
        <Badge color={"orange"} text={`Số ca sáng: ${count.morning}`} />
        <Badge color={"green"} text={`Số ca chiều: ${count.afternoon}`} />
        <Badge color={"purple"} text={`Số ca tối: ${count.evening}`} />
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const onDateSelect = (value: Dayjs, selectInfo: SelectInfo) => {
    if (selectInfo.source === "date") {
      setSelectedDate(value);
      setIsOpen(true);
    }
  };

  const handleSubmitAddFunction = (data: any) => {
    dispatch(
      createDiagnosis({
        schedule_id: data.schedule_id,
        information: data.information,
      } as DiagnosisRequest)
    );
    if (data.schedule_start_time !== null)
      dispatch(createScheduleByDoctor(data));
  };

  React.useEffect(() => {
    if (
      dataState.loadCreateScheduleByDoctorStatus === ApiLoadingStatus.Success
    ) {
      dispatch(resetLoadCreateScheduleByDoctorStatus());
      dispatch(getAllSchedules());
    }
  }, [dataState.loadCreateScheduleByDoctorStatus]);

  const initData: any = {
    information: "",
    schedule_start_time: "",
    schedule_type: "",
  };

  return (
    <>
      <ConfigProvider locale={viVN}>
        <Calendar cellRender={cellRender} onSelect={onDateSelect} />
        <ScheduleModal
          title={`Lịch hẹn ngày ${selectedDate?.format("DD-MM-YYYY")}`}
          isOpen={isOpen}
          selectedDate={selectedDate}
          data={data}
          onClose={() => setIsOpen(false)}
          getListData={getListData}
          openDiagnosis={(schedule_id: string, patient_id: string) =>
            modalAddRef.current?.open(
              { ...initData, schedule_id: schedule_id, patient_id: patient_id },
              columns
            )
          }
        />
      </ConfigProvider>
      <ModalDiagnosisData
        ref={modalAddRef}
        title="Chẩn đoán của bác sĩ"
        submitFunction={(data: any) => handleSubmitAddFunction(data)}
      ></ModalDiagnosisData>
    </>
  );
};
