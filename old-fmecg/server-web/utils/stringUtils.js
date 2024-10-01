const actionWebType = [
  { path: "/user", text: "người dùng" },
  { path: "/device", text: "thiết bị" },
  { path: "/record", text: "bản ghi" },
  { path: "/pda", text: "phân công bác sĩ" },
  { path: "/register", text: "đăng ký" },
  { path: "/chat", text: "chat" },
];

const filterUserAnswer = (str) => {
  // Loại bỏ các dấu đặc biệt
  var cleanedStr = str.replace(/[!@#$%^&*(),.?":{}|<>]/g, "");
  // Chuyển thành chữ thường
  cleanedStr = cleanedStr.toLowerCase();
  return cleanedStr;
};

const filterActionWeb = (answer) => {
  console.log(answer);
  const text = "mở";
  if (answer?.includes(text)) {
    for (const item of actionWebType) {
      if (answer?.includes(item.text)) {

        return item;
      }
    }
    return undefined;
  }
  return undefined;
};

const clearCache = (message) => {
  return message?.includes("clear bộ nhớ") ? true : false;
};
module.exports = {
  filterUserAnswer,
  filterActionWeb,
  clearCache,
};
