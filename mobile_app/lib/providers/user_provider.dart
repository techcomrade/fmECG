import 'package:bluetooth_ecg/models/user_model.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  User? user;
  bool isPatient = true;

  //if user is a patient => user can see doctor who is assigned for him/her
  Map doctorAssignedInfo = {};

  //if user is a doctor => doctor can see all patients who are assigned for him/her
  List patientAssingedInfo = [];
  String _token = "";
  String get token => _token;

  void setDataUser(Map<String,dynamic> data) {
    user = User.fromJson(data);
  }

  void setToken(String? apiToken) {
    if (apiToken == null) _token = "";
    _token = apiToken!;
  }
  
  void setDoctorAssignedInfo (Map info) {
    doctorAssignedInfo = info;
  }
}

