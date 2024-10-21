export const checkDateTypeKey = (key: string) => {
  const dateKeyGroups = [
    "birth",
    "start_date",
    "start_time",
    "end_time",
    "end_date",
  ];
  return dateKeyGroups.includes(key);
};

export const convertTimeToDate = (time: number) => {
  return new Date(time).toLocaleDateString("en-GB");
};
