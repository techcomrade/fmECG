import 'package:bluetooth_ecg/models/user_model.dart';
import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  User? user;
  void setDataUser(Map<String,dynamic> data) {
    user = User.fromJson(data);
  } 
}

