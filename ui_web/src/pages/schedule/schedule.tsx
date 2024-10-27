import * as React from "react";
import type { CalendarProps } from "antd";
import { Badge, Calendar, ConfigProvider } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import viVN from "antd/lib/locale/vi_VN";
import { getAllSchedules } from "../../redux/reducer/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { checkDateTypeKey } from "../../utils/dateUtils";
import { ScheduleModal } from "../../components/Modal/ScheduleModal";
import { convertScheduleStatusToString, convertScheduleTypeToString } from "../../constants";

export const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.schedule);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [data, setData] = React.useState<any[]>([]);

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
            session: `Thời gian: Từ ${dayjs(
              schedule.schedule_start_time
            ).format("HH:mm")} đến ${dayjs(schedule.schedule_end_time).format(
              "HH:mm"
            )}`,
            time: Number(dayjs(schedule.schedule_start_time).format("HHmm")),
            doctor: `Bác sĩ: ${schedule.doctor_name}`,
            patient: `Bệnh nhân: ${schedule.patient_name}`,
            schedule_type: `Loại lịch hẹn: ${convertScheduleTypeToString(schedule.schedule_type_id)}`,
            status: `Trạng thái lịch hẹn: ${convertScheduleStatusToString(schedule.status_id)}`
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

  const onDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setIsOpen(true);
  };

  return (
    <ConfigProvider locale={viVN}>
      <Calendar cellRender={cellRender} onSelect={onDateSelect} />
      <ScheduleModal
        title={`Lịch hẹn ngày ${selectedDate?.format("DD-MM-YYYY")}`}
        isOpen={isOpen}
        selectedDate={selectedDate}
        data={data}
        onClose={() => setIsOpen(false)}
        getListData={getListData}
      />
    </ConfigProvider>
  );
};
