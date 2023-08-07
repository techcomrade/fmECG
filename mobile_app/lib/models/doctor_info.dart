import 'dart:convert';

class DoctorDetail {
  int status;
  String msg;
  Data data;

  DoctorDetail({required this.status, required this.msg, required this.data});

  factory DoctorDetail.fromJson(Map<String, dynamic> json) => DoctorDetail(
    status : json['status'],
    msg : json['msg'],
    data :(json['data'] != null ? new Data.fromJson(json['data']) : null)!
  );

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['status'] = this.status;
    data['msg'] = this.msg;
    if (this.data != null) {
      data['data'] = this.data.toJson();
    }
    return data;
  }
}

class Data {
  int id;
  int userId;
  int departmentId;
  String name;
  String email;
  String password;
  String phoneNo;
  String workingHour;
  String aboutUs;
  String service;
  String image;
  String facebookId;
  String twitterId;
  String googleId;
  String instagramId;
  String createdAt;
  String updatedAt;
  String departmentName;
  double ratting;
  List<TimeTabledata> timeTabledata;

  Data(
      {required this.id,
        required this.userId,
        required this.departmentId,
        required this.name,
        required this.email,
        required this.password,
        required this.phoneNo,
        required this.workingHour,
        required this.aboutUs,
        required this.service,
        required this.image,
        required this.facebookId,
        required this.twitterId,
        required this.googleId,
        required this.instagramId,
        required this.createdAt,
        required this.updatedAt,
        required this.departmentName,
        required this.ratting,
        required this.timeTabledata});

  factory Data.fromJson(Map<String, dynamic> json) => Data(
    id : json['id'],
    userId : json['user_id'],
    departmentId : json['department_id'],
    name : json['name'],
    email : json['email'],
    password : json['password'],
    phoneNo : json['phone_no'],
    workingHour : json['working_hour'],
    aboutUs : json['about_us'],
    service : json['service'],
    image : json['image'],
    facebookId : json['facebook_id'],
    twitterId : json['twitter_id'],
    googleId : json['google_id'],
    instagramId : json['instagram_id'],
    createdAt : json['created_at'],
    updatedAt : json['updated_at'],
    departmentName : json['department_name'],
    ratting : double.parse(json['ratting'] == null ? "0" : json['ratting'].toString()),
    timeTabledata: List<TimeTabledata>.from(json["time_tabledata"].map((x) => x)),
  );

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['user_id'] = this.userId;
    data['department_id'] = this.departmentId;
    data['name'] = this.name;
    data['email'] = this.email;
    data['password'] = this.password;
    data['phone_no'] = this.phoneNo;
    data['working_hour'] = this.workingHour;
    data['about_us'] = this.aboutUs;
    data['service'] = this.service;
    data['image'] = this.image;
    data['facebook_id'] = this.facebookId;
    data['twitter_id'] = this.twitterId;
    data['google_id'] = this.googleId;
    data['instagram_id'] = this.instagramId;
    data['created_at'] = this.createdAt;
    data['updated_at'] = this.updatedAt;
    data['department_name'] = this.departmentName;
    data['ratting'] = this.ratting;
    if (this.timeTabledata != null) {
      data['time_tabledata'] =
          this.timeTabledata.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class TimeTabledata {
  int id;
  int doctorId;
  int day;
  String from;
  String to;
  String createdAt;
  String updatedAt;

  TimeTabledata(
      {required this.id,
        required this.doctorId,
        required this.day,
        required this.from,
        required this.to,
        required this.createdAt,
        required this.updatedAt});

  factory TimeTabledata.fromJson(Map<String, dynamic> json) => TimeTabledata(
    id : json['id'],
    doctorId : json['doctor_id'],
    day : json['day'],
    from : json['from'],
    to : json['to'],
    createdAt : json['created_at'],
    updatedAt : json['updated_at']
  );

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['doctor_id'] = this.doctorId;
    data['day'] = this.day;
    data['from'] = this.from;
    data['to'] = this.to;
    data['created_at'] = this.createdAt;
    data['updated_at'] = this.updatedAt;
    return data;
  }
}
