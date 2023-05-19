import 'dart:convert';

User userFromJson(String str) => User.fromJson(json.decode(str));

String userToJson(User data) => json.encode(data.toJson());

class User {
    int id;
    String email;
    String phoneNumber;
    String name;
    String password;
    DateTime? doB;
    String? avatarUrl;
    int role;

    User({
        required this.id,
        required this.email,
        required this.phoneNumber,
        required this.name,
        required this.password,
        this.doB,
        this.avatarUrl,
        required this.role,
    });

    factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        email: json["email"],
        phoneNumber: json["phone_number"],
        name: json["name"],
        password: json["password"],
        doB: DateTime.parse(json["doB"]),
        avatarUrl: json["avatar_url"],
        role: json["role"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "email": email,
        "phone_number": phoneNumber,
        "name": name,
        "password": password,
        "doB": doB,
        "avatar_url": avatarUrl,
        "role": role,
    };
}