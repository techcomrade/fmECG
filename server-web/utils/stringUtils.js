const actionWebType = [
  { path: "/user", text: "người dùng" },
  { path: "/device", text: "thiết bị" },
  { path: "/record", text: "bản ghi" },
  { path: "/pda", text: "phân quyền" },
  { path: "/register", text: "đăng ký" },
  { path: "/chat", text: "chat" },
];

const filterUserAnswer = (answer) => {
  return answer;
};

const filterActionWeb = (answer) => {

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

module.exports = {
  filterUserAnswer,
  filterActionWeb,
};
