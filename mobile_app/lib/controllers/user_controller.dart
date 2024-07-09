import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

UserProvider userProvider = Utils.globalContext!.read<UserProvider>();

class UserController {

  // for patient
  static Future<void> getDoctorAssigned(int patientId) async {
    try {
      final url = APIConstant().apiUrl + 'patient/$patientId/doctor';
      final response = await http.get(Uri.parse(url));
      final responseBody = jsonDecode(response.body);
      if (responseBody["status"] == "success") {
        userProvider.setDoctorAssignedInfo(responseBody["data"]);
      }
    } catch (e) {
      debugPrint('error from getDoctorAssign: $e');
      rethrow;
    }
  }
}