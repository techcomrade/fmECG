// auth provider

import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum ThemeType { DARK, LIGHT }

class AuthProvider extends ChangeNotifier {
  String _token = "";
  var _expiryDate;
  int _userId = 0;
  int _roleId = -1;
  String _locale = 'en';
  bool _isDarkTheme = false;
  bool _isAutoTheme = false;

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

  ThemeType get theme => _isDarkTheme ? ThemeType.DARK : ThemeType.LIGHT;
  set theme(ThemeType type) => setTheme(type, false);


  void setTheme(ThemeType type, bool isAuto) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isDarkTheme = type == ThemeType.DARK;
    await preferences.setBool('isAutoTheme', isAuto);
    bool status = await preferences.setBool('isDark', _isDarkTheme);

    if (status) notifyListeners();
  }

  Future<bool> getAutoTheme() async{
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isAutoTheme = preferences.getBool('isAutoTheme') ?? false;
    return _isAutoTheme;
  }

  Future<ThemeType> getTheme() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    var theme = preferences.getBool('isDark');
    _isDarkTheme = theme ?? true ;
    return _isDarkTheme ? ThemeType.DARK : ThemeType.LIGHT;
  }

  bool get isAutoTheme => _isAutoTheme;
  set isAutoTheme(bool isAuto) => setIsAutoTheme(isAuto);

  void setIsAutoTheme(bool isAuto) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isAutoTheme = isAuto;
    bool status = await preferences.setBool('isAutoTheme', _isAutoTheme);
    await preferences.setBool('isDark', false);

    if(status) notifyListeners();
  }

  void setDataLogin() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    final userData = json.encode(
      {
        'token': _token,
        'userId': _userId,
        'role': _roleId
      },
    );
    preferences.setString('userData', userData);
  }

  Future<bool> tryAutoLogin() async {
    final preferences = await SharedPreferences.getInstance();
    if (!preferences.containsKey('userData')) {
      return false;
    }

    final userDataDecoded = json.decode((preferences.getString('userData') ?? ""));
    // final expiryDate = DateTime.parse(extractedUserData['expiryDate'].toString());
    // if (expiryDate.isBefore(DateTime.now())) {
    //   return false;
    // }
    _token = userDataDecoded['token'].toString();
    _userId = userDataDecoded['userId'];
    // _expiryDate = expiryDate;
    notifyListeners();
    return true;
  }

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
    String url = APIConstant.apiUrlProduction + 'login';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url), 
        headers: APIConstant.headers,
        body: bodyEncoded
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        // do something with data
        _token = responseData["token"];
        _roleId = responseData["user"]["role"];
        
        notifyListeners();
      }
    } catch (err) {
      debugPrint('error from login: $err');
    }
  }

  Future<void> registerUser(String email, String password) async {
    // call API with email and password
    String url = APIConstant.apiUrlProduction + 'register';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url), 
        headers: APIConstant.headers,
        body: bodyEncoded
      );
      final responseData = jsonDecode(response.body);
      if (responseData["status"] == "success") {
        // do something with data
        // print('heheh donee:${responseData["token"]}');
      }
    } catch (err) {
      debugPrint('error from register: $err');
    }
  }

  Future<void> logoutUser() async {
    // call API with email and password
    String url = APIConstant.apiUrlProduction + 'logout';
    try {
      final response = await http.get(Uri.parse(url), 
        headers: {...APIConstant.headers, 'Cookie': 'token=$_token'},
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        // do something with data
        _token = "";
        print('heheh donee:${responseData}');
        notifyListeners();
      }
    } catch (err) {
      debugPrint('error from register: $err');
    }
  }

}