import * as React from "react";
import type { BadgeProps, CalendarProps } from "antd";
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
  }, [dataState.loadDataStatus, dataState.data]);

  const handleData = (data: any) => {
    let scheduleData = { ...data };
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        const dateObj = dayjs.unix(data[key]);
        scheduleData[key] = dateObj.format("HH:mm DD/MM/YYYY");
        scheduleData.date = dateObj.date();
        scheduleData.month = dateObj.month();
        scheduleData.year = dateObj.year();
      }
    });
    return scheduleData;
  };

  const getListData = (value: Dayjs) => {
    return data
      .filter(
        (item) =>
          item.date === value.date() &&
          item.month === value.month() &&
          item.year === value.year()
      )
      .map((schedule) => ({
        type: schedule.status_id === 1 ? "error" : "success",
        time: `Thời gian ca khám: Từ ${dayjs(
          schedule.schedule_start_time
        ).format("HH:mm")} đến ${dayjs(schedule.schedule_end_time).format(
          "HH:mm"
        )}`,
        patient: `Bệnh nhân: ${schedule.patient_name}`,
      }));
  };

  const onDateSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setIsOpen(true);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    console.log(listData)
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.patient}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <ConfigProvider locale={viVN}>
      <Calendar cellRender={cellRender} onSelect={onDateSelect} />
      <ScheduleModal
        title={`Lịch khám ngày ${selectedDate?.format("DD-MM-YYYY")}`}
        isOpen={isOpen}
        selectedDate={selectedDate}
        data={data}
        onClose={() => {
          setIsOpen(false);
        }}
        getListData={getListData}
      />
    </ConfigProvider>
  );
};
