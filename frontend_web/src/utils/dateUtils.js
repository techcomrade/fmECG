export const convertTimeToDate = (time) => {
  return new Date(time).toLocaleDateString("en-GB");
};
export const convertTimeToDateTime = (time) => {
  const date = new Date(time);
  return (
    ("0" + date.getUTCHours()).slice(-2) +
    ":" +
    ("0" + date.getUTCMinutes()).slice(-2) +
    " " +
    ("0" + date.getUTCDate()).slice(-2) +
    "/" +
    ("0" + date.getUTCMonth()).slice(-2) +
    "/" +
    date.getUTCFullYear()
  );
};
export const convertDateToTime = (date) => {
  const [day, month, year] = date.split("/");
  return new Date(year, month - 1, day, 0).getTime();
};

export const getCurrentTimeToString = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months start at 0!
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const convertGenderToString = (gender) => {
  switch (gender) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
    default:
      return "Không rõ";
  }
};
export const convertStringToGender = (gender) => {
  switch (gender) {
    case "Nam":
      return 0;
    case "Nữ":
      return 1;
    default:
      return 2;
  }
};
