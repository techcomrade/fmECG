export const gender = [
  {
    value: 0,
    label: "Nam",
  },
  {
    value: 1,
    label: "Nữ",
  },
];

export const convertGenderToString = (gender) => {
  switch (gender) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
    default:
      return "Unknown";
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
