import 'dart:async';
import 'dart:io';
import 'dart:math';

import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_main_screen.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_scanning_screen.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_test_screen.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/main_screen.dart';
import 'package:bluetooth_ecg/screens/select_account_type_screen.dart';
import 'package:bluetooth_ecg/screens/user_profile_screen.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:bluetooth_ecg/screens/login_screen.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:get/get.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'screens/login1_screen.dart';

void main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  // SharedPreferences prefs = await SharedPreferences.getInstance();
  // var test = prefs.getString("userData");
  // print('test:$test');
  if (Platform.isAndroid) {
    WidgetsFlutterBinding.ensureInitialized();
    [
      Permission.location,
      Permission.storage,
      Permission.bluetooth,
      Permission.bluetoothConnect,
      Permission.bluetoothScan
    ].request().then((status) {
      runApp(const FmECGApp());
    });
  } else {
      runApp(const FmECGApp());
  }
}

class FmECGApp extends StatefulWidget {
  const FmECGApp({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return FmECGAppState();
  }
}

class FmECGAppState extends State<FmECGApp> {
  // Future<void> requestPermission(Permission permission) async {
  //   final status = await permission.request();

  //   setState(() {
  //     print(status);
  //     _permissionStatus = status;
  //     print(_permissionStatus);
  //   });
  // }

  @override
  void initState() {
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: Consumer<AuthProvider>(
        builder: (ctx, auth, _) {
          print('isAuthAfterUpdate:${auth.isAuth}');
          return GetMaterialApp(
            theme: ThemeData(fontFamily: "AvenirNext"),
            home: MainScreen(),
              // FutureBuilder(
              //   future: auth.tryAutoLogin(),
              //   builder: (ctx, authResultSnapshot) {
              //     print('auth:${authResultSnapshot.data}');
              //       if (authResultSnapshot.connectionState == ConnectionState.waiting) {
              //         return const CircularProgressIndicator();
              //       } else if (authResultSnapshot.hasError) {
              //         return Text('Error: ${authResultSnapshot.error}');
              //       } else {
              //         if (authResultSnapshot.data == true) {
              //           // login succesfully
              //           return MainScreen();
              //         } else {
              //           return Login1Screen();
              //         }
              //       }
              //   }),
            localizationsDelegates: const [
              S.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            getPages : AppRoutes.pages,
          );
      }),
    );
  }
}


