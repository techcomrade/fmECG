// auth provider

import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/controllers/firebase_messages_controller.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum ThemeType { DARK, LIGHT }

UserProvider userProvider =
    Provider.of<UserProvider>(Utils.globalContext!, listen: false);

class AuthProvider extends ChangeNotifier {
  String _token = "";
  final String _firebaseToken = "";
  var _expiryDate;
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

  ThemeType get theme => _isDarkTheme ? ThemeType.DARK : ThemeType.LIGHT;
  set theme(ThemeType type) => setTheme(type, false);

  void setTheme(ThemeType type, bool isAuto) async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    _isDarkTheme = type == ThemeType.DARK;
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
    return _isDarkTheme ? ThemeType.DARK : ThemeType.LIGHT;
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

  Future<void> loginUser(String email, String password) async {
    // call API with email and password
    // String url = APIConstant.apiUrlProduction + 'login';
    // final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      // final response = await http.post(Uri.parse(url),
      //     headers: APIConstant.headers, body: bodyEncoded);
      // final responseData = jsonDecode(response.body);

      // if (responseData["status"] == "success") {
      //   // do something with data
      //   _token = responseData["token"];
      //   _roleId = responseData["user"]["role"];
      //   _userId = responseData["user"]["user_id"];
      //   userProvider.setDataUser(responseData["user"]);

      //   // firebase token sẽ đi theo thiết bị di động không phải theo phiên đăng nhập
      //   _firebaseToken = await FmECGFirebaseMessage().getDeviceToken();
      //   _checkAndSaveFirebaseToken();
      //   setDataLogin();

      //   notifyListeners();
      // }

      _email = email;
      setDataLogin();
      notifyListeners();
    } catch (err) {
      debugPrint('error from login: $err');
    }
  }

  void _checkAndSaveFirebaseToken() async {
    bool isFirebaseTokenExisted =
        await FmECGFirebaseMessage().checkFirebaseTokenExist(_firebaseToken);
    if (!isFirebaseTokenExisted) {
      await FmECGFirebaseMessage()
          .saveTokenToFirestore(_userId, _firebaseToken);
    }
  }

  Future<void> registerUser(String email, String password) async {
    // call API with email and password
    String url = APIConstant.apiUrlProduction + 'register';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url),
          headers: APIConstant.headers, body: bodyEncoded);
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
      final response = await http.get(
        Uri.parse(url),
        headers: {...APIConstant.headers, 'Cookie': 'token=$_token'},
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        // do something with data
        _token = "";
        removeDataLogin();
        notifyListeners();
      }
    } catch (err) {
      debugPrint('error from register: $err');
    }
  }

  void setDataLogin() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    // final userData = json.encode(
    //   {
    //     'token': _token,
    //     'userId': _userId,
    //     'roleId': _roleId,
    //     'firebaseToken': _firebaseToken
    //   },
    // );
    // preferences.setString('userData', _email);
    preferences.setString('userName', _email);
  }

  void removeDataLogin() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    //preferences.remove("userData");
    preferences.remove("userName");
  }

  Future<bool> checkAutoLogin() async {
    final preferences = await SharedPreferences.getInstance();
    // if (!preferences.containsKey('userData')) {
    //   return false;
    // }
    if (!preferences.containsKey('userName')) {
      return false;
    }

    // final userDataDecoded =
    //     json.decode((preferences.getString('userData') ?? ""));
    // _token = userDataDecoded['token'].toString();
    // _userId = userDataDecoded['userId'];
    // _roleId = userDataDecoded['roleId'];
    // _firebaseToken = userDataDecoded['firebaseToken'];
    //final _emailUser = preferences.getString('userData');
    final _emailUser = preferences.getString('userName');
    notifyListeners();
    if (_emailUser != "") {
      return true;
    } else {
      return false;
    }
  }
}
