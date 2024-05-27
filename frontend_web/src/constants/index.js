export const GENDER = [
  {
    value: 0,
    label: "Nam",
  },
  {
    value: 1,
    label: "Nữ",
  },
];

export const ROLE = [
  {
    value: 0,
    label: "Admin",
  },
  {
    value: 1,
    label: "Doctor",
  },
  {
    value: 2,
    label: "Patient",
  },
];

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

export const convertRoleToString = (role) => {
  switch (role) {
    case 0:
      return "Admin";
    case 1:
      return "Doctor";
    default:
      return "Patient";
  }
};

export const convertStringToRole = (gender) => {
  switch (gender) {
    case "Admin":
      return 0;
    case "Doctor":
      return 1;
    default:
      return "Patient";
  }
};
