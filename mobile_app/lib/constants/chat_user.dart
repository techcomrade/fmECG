class ChatUsers {
  final String name;
  final String message;
  final String imageUrl;
  final String time;

  ChatUsers(
      {required this.name,
      required this.message,
      required this.imageUrl,
      required this.time});
  static List<ChatUsers> chatUsers = [
    ChatUsers(
        name: "Nguyễn Văn A",
        message: "ok",
        imageUrl: "https://picsum.photos/250?image=661",
        time: "8:00"),
    ChatUsers(
        name: "Nguyễn Văn B",
        message: "ok",
        imageUrl: "https://picsum.photos/250?image=665",
        time: "Thứ Bảy"),
    ChatUsers(
        name: "Nguyễn Văn C",
        message: "ok",
        imageUrl: "https://picsum.photos/250?image=669",
        time: "Thứ Tư"),
    ChatUsers(
        name: "Nguyễn Văn D",
        message: "Bạn: Ok",
        imageUrl: "https://picsum.photos/250?image=64",
        time: "1/3/2024")
  ];
}
