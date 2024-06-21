class Message {
  int id;
  int userId;
  int recipientId;
  String content;
  DateTime timeSent;

  Message({
    required this.id,
    required this.userId,
    required this.recipientId,
    required this.content,
    required this.timeSent,
  });

  factory Message.fromJson(Map<String, dynamic> json) => Message(
    id: json["id"],
    userId: json["user_id"],
    recipientId: json["recipient_id"],
    content: json["content"],
    timeSent: DateTime.parse(json["time_sent"]),
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "user_id": userId,
    "recipient_id": recipientId,
    "content": content,
    "time_sent": timeSent
  };
}
