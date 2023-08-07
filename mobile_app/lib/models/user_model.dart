class User {
    int id;
    String email;
    String phoneNumber;
    String name;
    DateTime? doB;
    String? avatarUrl;
    int role;

    User({
        required this.id,
        required this.email,
        required this.phoneNumber,
        required this.name,
        this.doB,
        this.avatarUrl,
        required this.role,
    });

    factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["user_id"],
        email: json["email"],
        phoneNumber: json["phone_number"],
        name: json["name"],
        doB: DateTime.parse(json["doB"]),
        avatarUrl: "",
        role: json["role"],
    );

    Map<String, dynamic> toJson() => {
        "user_id": id,
        "email": email,
        "phone_number": phoneNumber,
        "name": name,
        "doB": doB,
        "avatar_url": avatarUrl,
        "role": role,
    };
}
