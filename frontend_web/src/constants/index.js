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
    label: "Bác sĩ",
  },
  {
    value: 2,
    label: "Bệnh nhân",
  },
];

export const userRole = {
  admin: "0",
  doctor: "1",
  patient: "2",
};

export const UserStatus = [
  {
    value: 0,
    label: "Đang hoạt động",
  },
  {
    value: 1,
    label: "Đã nghỉ",
  },
];

export const DeviceStatus = [
  {
    value: 0,
    label: "Đang hoạt động",
  },
  {
    value: 1,
    label: "Đang trống",
  },
  {
    value: 2,
    label: "Đang bảo trì",
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
      return "Bác sĩ";
    default:
      return "Bệnh nhân";
  }
};

export const convertStringToRole = (gender) => {
  switch (gender) {
    case "Admin":
      return userRole.admin;
    case "Bác sĩ":
      return userRole.doctor;
    case "Bệnh nhân":
      return userRole.patient;
    default:
      return 4;
  }
};

export const convertStatusToString = (status) => {
  switch (status) {
    case 0:
      return "Đang hoạt đông";
    case 1:
      return "Đã nghỉ";
    default:
      return "Không xác định";
  }
};

export const convertDeviceStatusToString = (status) => {
  switch (status) {
    case 0:
      return "Đang hoạt đông";
    case 1:
      return "Đang trống";
    case 2:
      return "Đang bảo trì";
    default:
      return "Không xác định";
  }
};

export const convertDeviceStatusColor = (status) => {
  switch (status) {
    case 0:
      return "geekblue";
    case 1:
      return "green";
    case 2:
      return "volcano";
    default:
      return "red";
  }

}

export const colorChart = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)', 'rgba(153, 102, 255)']

};

export const convertDeviceTypeToString = (status) => {
  switch (status) {
    case 1:
      return "Đo điện tim";
    case 2:
      return "Đo chất lượng không khí";
    case 3:
      return "Đo âm thanh";
    default:
      return "Không xác định";
  }
};

export const convertDeviceTypeColor = (status) => {
  switch (status) {
    case 1:
      return "volcano";
    case 2:
      return "green";
    case 3:
      return "geekblue";
    default:
      return "red";
  }
};

