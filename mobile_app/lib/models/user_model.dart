class User {
  final String id;
  final String? accountId;
  final String? username;
  final String fullName;
  final String email;
  final String? phoneNumber;
  final DateTime? birth;
  final String? avatarUrl;
  final int? gender;
  final int role;

  User({
    required this.id,
    required this.accountId,
    this.username,
    required this.fullName,
    required this.email,
    required this.phoneNumber,
    this.birth,
    this.gender,
    this.avatarUrl,
    required this.role,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json["user_id"],
    accountId: json["account_id"],
    username: json["username"],
    fullName: json["username"],
    email: json["email"],
    phoneNumber: json["phone_number"],
    birth: DateTime.tryParse(json["birth"]),
    avatarUrl: json["image"],
    gender: json["gender"],
    role: json["role"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "account_id": accountId,
    "username": id,
    "full_name": id,
    "email": email,
    "phone_number": phoneNumber,
    "birth": birth,
    "gender": gender,
    "avatar_url": avatarUrl,
    "role": role,
  };
}
