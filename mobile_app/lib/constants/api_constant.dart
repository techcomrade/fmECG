import 'package:flutter/foundation.dart';

class APIConstant {
  static APIConstant instance = APIConstant._privateConstructor();
  APIConstant._privateConstructor();
  factory APIConstant() => instance;

  String apiUrl = "";
  String socketUrl = "";
    Map<String, String> headers = <String, String> {
    'Content-Type': 'application/json;charset=UTF-8'
  };

  getMode() {
    if (kDebugMode || kProfileMode) {
      apiUrl = "http://192.168.0.9/api";
      socketUrl = 'ws://192.168.0.9:80/socket/websocket';
    } else {}
  }

  void addValueHeader(Map<String, String> item) {
    headers.addAll(item);
  }
}

final APIConstant apiConstant = APIConstant.instance;
