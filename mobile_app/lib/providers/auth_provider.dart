// auth provider

import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier {
  String _token = "";
  var _expiryDate;
  int _userId = 0;
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

  bool get isAuth {
    final isExpiryDate = _expiryDate != null && _expiryDate!.isBefore(DateTime.now()) && _token != "";

    if (token == "" || isExpiryDate) {
      return false;
    } else {
      return true;
    }
  }

}