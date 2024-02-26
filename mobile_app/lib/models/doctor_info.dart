
class DoctorDetail {
  int status;
  String msg;
  Data data;

  DoctorDetail({required this.status, required this.msg, required this.data});

  factory DoctorDetail.fromJson(Map<String, dynamic> json) => DoctorDetail(
    status : json['status'],
    msg : json['msg'],
    data :(json['data'] != null ? Data.fromJson(json['data']) : null)!
  );

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['status'] = status;
    data['msg'] = msg;
    data['data'] = this.data.toJson();
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
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['user_id'] = userId;
    data['department_id'] = departmentId;
    data['name'] = name;
    data['email'] = email;
    data['password'] = password;
    data['phone_no'] = phoneNo;
    data['working_hour'] = workingHour;
    data['about_us'] = aboutUs;
    data['service'] = service;
    data['image'] = image;
    data['facebook_id'] = facebookId;
    data['twitter_id'] = twitterId;
    data['google_id'] = googleId;
    data['instagram_id'] = instagramId;
    data['created_at'] = createdAt;
    data['updated_at'] = updatedAt;
    data['department_name'] = departmentName;
    data['ratting'] = ratting;
    data['time_tabledata'] =
        timeTabledata.map((v) => v.toJson()).toList();
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
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['doctor_id'] = doctorId;
    data['day'] = day;
    data['from'] = from;
    data['to'] = to;
    data['created_at'] = createdAt;
    data['updated_at'] = updatedAt;
    return data;
  }
}
