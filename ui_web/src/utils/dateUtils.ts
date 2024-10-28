import dayjs from "dayjs";

export const checkDateTypeKey = (key: string) => {
  const dateKeyGroups = [
    "birth",
    "start_date",
    "end_date",
    "start_time",
    "end_time",
    "schedule_start_time",
    "schedule_end_time",
  ];
  return dateKeyGroups.includes(key);
};

export const convertTimeToDate = (time: number) => {
  return new Date(time).toLocaleDateString("en-GB");
};

export const convertTimeToDateTime = (time: number) => {
  return dayjs(time).format('HH:mm DD/MM/YYYY');
};
