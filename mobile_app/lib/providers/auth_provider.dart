// auth provider

import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier {
  String _token = "";
  var _expiryDate;
  int _userId = 0;
  int _roleId = -1;
  String _locale = 'en';
  bool _isDarkTheme = false;

  String get locale => _locale;

  int get userId => _userId; 

  AuthProvider() {
    getLocale().then((value) {
      _locale = value;
      notifyListeners();
    });
  }

  // set locale(lc) => setLocale(lc);
  // void setLocale(lc) async {
  //   S.load(Locale(lc)); 
  //   SharedPreferences preferences = await SharedPreferences.getInstance();
  //   _locale = lc ?? "en";
  //   bool status = await preferences.setString('locale', _locale);

  //   if (status) notifyListeners();
  // }

  Future<String> getLocale() async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _locale = preferences.getString('locale') ?? "en";
    return _locale;
  }

  String get token {
    if (_expiryDate != null &&_expiryDate!.isAfter(DateTime.now()) && _token != "") {
      return _token;
    } else {
      return "";
    }
  }

  int get roleId => _roleId;

  bool get isAuth {
    // final isExpiryDate = _expiryDate != null && _expiryDate!.isBefore(DateTime.now()) && _token != "";
    final isExpiryDate = _roleId != -1 && _token !=  "";
    if (!isExpiryDate) {
      return false;
    } else {
      return true;
    }
  }

  Future<void> loginUser(String email, String password) async {
    // call API with email and password
    String url = APIConstant.apiUrl + 'login';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url), 
        headers: APIConstant.headers,
        body: bodyEncoded
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        // do something with data
        print('response:$responseData');
        _token = responseData["token"];
        _roleId = responseData["user"]["role"];

        notifyListeners();
      }
    } catch (err) {
      print('error from login: $err');
    }
  }

  Future<void> registerUser(String email, String password) async {
    // call API with email and password
    String url = APIConstant.apiUrl + 'register';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url), 
        headers: APIConstant.headers,
        body: bodyEncoded
      );
      final responseData = jsonDecode(response.body);
      print('res:$responseData');

      if (responseData["status"] == "success") {
        // do something with data
        // print('heheh donee:${responseData["token"]}');
      }
    } catch (err) {
      print('error from register: $err');
    }
  }

}