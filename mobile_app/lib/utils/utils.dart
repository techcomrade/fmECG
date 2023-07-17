import 'dart:math';

import 'package:flutter/material.dart';

class Utils {
  static BuildContext? globalContext;

  static getGlobalContext() { 
    return globalContext; 
  }

  static setGlobalContext(context) { 
    globalContext = context; 
  }

  static getRandomString(int length){
    const _chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    Random _rnd = Random();
    return String.fromCharCodes(Iterable.generate(length, (_) => _chars.codeUnitAt(_rnd.nextInt(_chars.length))));
  }

  static getRandomNumber(length){
    const _chars = '1234567890';
    Random _rnd = Random();
    return String.fromCharCodes(Iterable.generate(length, (_) => _chars.codeUnitAt(_rnd.nextInt(_chars.length))));
  }

  static int getCurrentTimestamp() {
    final now = DateTime.now();
    final timestamp = now.millisecondsSinceEpoch;
    return timestamp;
  }

  static Future<void> showDialogLoginRequirement(context) async {
    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          title: Text("Có lỗi xảy ra"),
          content: Text("Bạn phải đăng nhập để thực hiện chức năng này!"),
          actions: [
            TextButton(
              child: Text('Trở về'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      }
    );
  }
}