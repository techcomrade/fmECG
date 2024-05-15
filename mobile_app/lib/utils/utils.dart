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

  static getRandomString(int length) {
    const _chars =
        'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    Random _rnd = Random();
    return String.fromCharCodes(Iterable.generate(
        length, (_) => _chars.codeUnitAt(_rnd.nextInt(_chars.length))));
  }

  static getRandomNumber(length) {
    const _chars = '1234567890';
    Random _rnd = Random();
    return String.fromCharCodes(Iterable.generate(
        length, (_) => _chars.codeUnitAt(_rnd.nextInt(_chars.length))));
  }

  static int getCurrentTimestamp() {
    final now = DateTime.now();
    final timestamp = now.millisecondsSinceEpoch;
    return timestamp;
  }

  static Future<int> getUserId() async {
    // final User? user = context.read<UserProvider>().user;
    // final SharedPreferences preferences = await SharedPreferences.getInstance();
    // final Map userDataDecoded = json.decode((preferences.getString('userData') ?? ""));
    // final int? userId = userDataDecoded["userId"];
    // if (userId != null) {
    //   return userId;
    // } else {
    //   return -1;
    // }
    return 1;
  }

  static Future<dynamic> showDialogWarningError(BuildContext context, bool isDark, String warningContent) {
    final Color colorInput = isDark ? const Color(0xFF25282A) : const Color(0xFFF2F4F7);
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Dialog(
              backgroundColor: colorInput,
              shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(4))),
              child: Container(
                width: 230,
                height: 130,
                alignment: Alignment.center,
                child: Column(
                  children: [
                    const SizedBox(height: 20),
                    Text(warningContent,
                      style: TextStyle(
                        color: isDark ? const Color(0xFFF6F6F7) : const Color(0xFF101828),
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: FontWeight.w700,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text("Close", 
                        style: TextStyle(color: Color(0xff05AABD), fontSize: 14, fontWeight: FontWeight.w500),),
                    ),
                  ],
                )
              )
            );
          }
        );
      }
    );
  }

  static Future<void> showDialogLoginRequirement(context) async {
    await showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) {
          return AlertDialog(
            title: const Text("Có lỗi xảy ra"),
            content:
                const Text("Bạn phải đăng nhập để thực hiện chức năng này!"),
            actions: [
              TextButton(
                child: const Text('Trở về'),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ],
          );
        });
  }
}
