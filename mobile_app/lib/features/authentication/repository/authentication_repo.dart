import 'dart:convert';
import 'package:bluetooth_ecg/features/authentication/repository/shared_pref_repo.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:provider/provider.dart';

class AuthRepository {
  Future<Map?> loginUser(String email, String password) async {
    String url = apiConstant.apiUrl + '/auth/login';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url),
          headers: apiConstant.headers, body: bodyEncoded);
      final Map responseData = jsonDecode(response.body);
      return responseData;
    } catch (err) {
      debugPrint('error from login: $err');
      return null;
    }
  }

  Future<Map?> registerUser(String email, String password) async {
    String url = apiConstant.apiUrl + '/register';
    final bodyEncoded = jsonEncode({"email": email, "password": password});
    try {
      final response = await http.post(Uri.parse(url),
          headers: apiConstant.headers, body: bodyEncoded);
      final Map responseData = jsonDecode(response.body);
      return responseData;
    } catch (err) {
      debugPrint('error from register: $err');
      return null;
    }
  }
  
  Future<void> logoutUser() async {
    String url = apiConstant.apiUrl + '/logout';
    try {
      final String token = Provider.of<UserProvider>(Utils.globalContext!, listen: false).token;
      final response = await http.get(
        Uri.parse(url),
        headers: apiConstant.getHeadersWithAuth(token),
      );
      final responseData = jsonDecode(response.body);

      if (responseData["status"] == "success") {
        SharedPreprerencesRepo.removeDataUser();
      }
    } catch (err) {
      debugPrint('error from register: $err');
    }
  }
}
