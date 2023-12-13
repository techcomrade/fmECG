import 'dart:async';

import 'package:bluetooth_ecg/controllers/firebase_messages_controller.dart';
import 'package:bluetooth_ecg/screens/chat_screens/chat_screen.dart';
import 'package:bluetooth_ecg/screens/history_screens/history_screen.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/user_screens/user_profile_screen.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

import 'package:flutter/services.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

Color LIME = const Color(0xFF094D55);

class _MainScreenState extends State<MainScreen> {
  static const platform = MethodChannel("com.example.method_channel/java");

  final int _currentIndex = 0;

  final List<Widget> _screens = [
    HomeScreen(),
    HistoryScreen(),
    const ChatScreen(),
    UserProfileScreen()
  ];

  String _textSBP = '';
  String _textDBP = '';
  String _textHeartRate = '';
  String _textDeviation = '';
  Future<void> _getText() async {
    String text;
    try {
      final result = await platform.invokeMethod('helloWorldPython');
      setState(() {
        _textSBP = result != null ? result!["sbp"].toString() : "";
        _textDBP = result != null ? result!["dbp"].toString() : "";
        _textHeartRate = result != null ? result!["heart_rate"].toString() : "";
        _textDeviation = result != null ? result!["standard_deviation"].toString() : "";
      });
    } on PlatformException catch (e) {
      text = "Failed to get text: '${e.message}'.";
    }
  }

  @override
  void initState() {
    super.initState();
    requestPermissionFirebase();
    Timer.run(() async {
      // de o phan dang nhap => luu token ngay sau khi dang nhap tren firebase
      final String firebaseToken =
          await FmECGFirebaseMessage().getDeviceToken();
      // await FmECGFirebaseMessage().saveTokenToFirestore(firebaseToken, 3010);
    });
  }

  void requestPermissionFirebase() async {
    FirebaseMessaging messaging = FirebaseMessaging.instance;
    NotificationSettings settings = await messaging.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        sound: true,
        criticalAlert: false,
        provisional: false);

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('permis');
    } else if (settings.authorizationStatus ==
        AuthorizationStatus.provisional) {
      print('provisional ');
    } else {
      print('declined');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: true,
        body: Center(
          child: Column(
            children: [
              Text("SBP: ${_textSBP}"),
              Text("DBP: ${_textDBP}"),
              Text("Heart Rate: ${_textHeartRate}"),
              Text("Deviation: ${_textDeviation}"),
              ElevatedButton(
                onPressed: _getText,
                child: const Text("Call python "),
              )
            ],
            mainAxisAlignment: MainAxisAlignment.center,
          ),
        )
        // _screens[_currentIndex],
        // bottomNavigationBar: BottomNavigationBar(
        //   currentIndex: _currentIndex,
        //   onTap: (int index) {
        //     setState(() {
        //       _currentIndex = index;
        //     });
        //   },
        //   items: [
        //     BottomNavigationBarItem(
        //       icon: PhosphorIcon(PhosphorIcons.regular.house),
        //       label: S.current.home,
        //     ),
        //     BottomNavigationBarItem(
        //       icon: PhosphorIcon(PhosphorIcons.regular.chartLine),
        //       label: S.current.history,
        //     ),
        //     BottomNavigationBarItem(
        //       icon: PhosphorIcon(PhosphorIcons.regular.chatCircle),
        //       label: S.current.chat,
        //     ),
        //     BottomNavigationBarItem(
        //       icon: PhosphorIcon(PhosphorIcons.regular.userCircle),
        //       label: S.current.profile,
        //     ),
        //   ],
        // ),
        );
  }
}
