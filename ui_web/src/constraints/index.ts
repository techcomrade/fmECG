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

export const convertGenderToString = (gender: number) => {
  switch (gender) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
    default:
      return "Unknown";
  }
};

export const convertStringToGender = (gender: string) => {
  switch (gender) {
    case "Nam":
      return 0;
    case "Nữ":
      return 1;
    default:
      return 2;
  }
};

export const role = [
  {
    value: 1,
    label: "Admin",
  },
  {
    value: 2,
    label: "Bác sĩ",
  },
  {
    value: 3,
    label: "Bệnh nhân",
  },
];

export const convertRoleToString = (role: number) => {
  switch (role) {
    case 1:
      return "Admin";
    case 2:
      return "Bác sĩ";
    default:
      return "Bệnh nhân";
  }
};

export const convertStringToRole = (role: string) => {
  switch (role) {
    case "Admin":
      return 1;
    case "Doctor":
      return 2;
    default:
      return 3;
  }
};