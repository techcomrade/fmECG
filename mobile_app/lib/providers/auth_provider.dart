// auth provider

import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum ThemeType { dark, light }

UserProvider userProvider = Provider.of<UserProvider>(Utils.globalContext!, listen: false);

class AuthProvider extends ChangeNotifier {
  String _token = "";
  final String _firebaseToken = "";
  DateTime? _expiryDate;
  final int _userId = 0;
  final int _roleId = -1;
  String _locale = 'en';
  bool _isDarkTheme = false;
  bool _isAutoTheme = false;

  String _email = "";

  String get email => _email;

  String get locale => _locale;
  int get userId => _userId;
  int get roleId => _roleId;

  String get token {
    if (_expiryDate != null &&
        _expiryDate!.isAfter(DateTime.now()) &&
        _token != "") {
      return _token;
    } else {
      return "";
    }
  }

  Future<bool> get isAuth async {
    // final isExpiryDate = _roleId != -1 && _token != "";
    // if (!isExpiryDate) {
    //   return false;
    // } else {
    //   return true;
    // }

    SharedPreferences preferences = await SharedPreferences.getInstance();
    _email = preferences.getString("userName") ?? "";

    return (_email != "");
  }

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

  ThemeType get theme => _isDarkTheme ? ThemeType.dark : ThemeType.light;
  set theme(ThemeType type) => setTheme(type, false);

  void setTheme(ThemeType type, bool isAuto) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isDarkTheme = type == ThemeType.dark;
    await preferences.setBool('isAutoTheme', isAuto);
    bool status = await preferences.setBool('isDark', _isDarkTheme);

    if (status) notifyListeners();
  }

  Future<bool> getAutoTheme() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isAutoTheme = preferences.getBool('isAutoTheme') ?? false;
    return _isAutoTheme;
  }

  Future<ThemeType> getTheme() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    var theme = preferences.getBool('isDark');
    _isDarkTheme = theme ?? true;
    return _isDarkTheme ? ThemeType.dark : ThemeType.light;
  }

  bool get isAutoTheme => _isAutoTheme;
  set isAutoTheme(bool isAuto) => setIsAutoTheme(isAuto);

  void setIsAutoTheme(bool isAuto) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isAutoTheme = isAuto;
    bool status = await preferences.setBool('isAutoTheme', _isAutoTheme);
    await preferences.setBool('isDark', false);

    if (status) notifyListeners();
  }

  Future<String> getLocale() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _locale = preferences.getString('locale') ?? "en";
    return _locale;
  }

  void _checkAndSaveFirebaseToken() async {
    // bool isFirebaseTokenExisted =
    //     await FmECGFirebaseMessage().checkFirebaseTokenExist(_firebaseToken);
    // if (!isFirebaseTokenExisted) {
    //   await FmECGFirebaseMessage().saveTokenToFirestore(_userId, _firebaseToken);
    // }
  }

  Future<void> registerUser(String email, String password) async {
    // call API with email and password
    String url = apiConstant.apiUrl + 'register';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url),
          headers: apiConstant.headers, body: bodyEncoded);
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
    String url = apiConstant.apiUrl + 'logout';
    try {
      final response = await http.get(
        Uri.parse(url),
        headers: {...apiConstant.headers, 'Cookie': 'token=$_token'},
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        // do something with data
        _token = "";
        notifyListeners();
      }
    } catch (err) {
      debugPrint('error from logout: $err');
    }
  }

}
