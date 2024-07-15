import 'dart:async';

import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/screens/chat_screens/chat_screen.dart';
import 'package:bluetooth_ecg/screens/history_screens/bluetooth_classic_screen.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/user_screens/user_profile_screen.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final Connectivity _connectivity = Connectivity();
  List<ConnectivityResult> _connectionStatus = [ConnectivityResult.none];
  late StreamSubscription<List<ConnectivityResult>> _connectivitySubscription;
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const BluetoothClassicScreen(),
    // const ChartsResultPythonScreen(),
    const ChatScreen(),
    const UserProfileScreen()
  ];

  @override
  void initState() {
    super.initState();
    initConnectivity();

    _connectivitySubscription = _connectivity.onConnectivityChanged.listen(_updateConnectionStatus);
  }

  @override
  void dispose() {
    _connectivitySubscription.cancel();
    super.dispose();
  }

  Future<void> initConnectivity() async {
    late List<ConnectivityResult> result;
    try {
      result = await _connectivity.checkConnectivity();
    } on PlatformException catch (e) {
      debugPrint("something went wrong with internet: $e");
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) {
      return Future.value(null);
    }

    return _updateConnectionStatus(result);
  }

  Future<void> _updateConnectionStatus(List<ConnectivityResult> result) async {
    setState(() {
      _connectionStatus = result;
    });
    print('Connectivity changed: $_connectionStatus');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.shifting,
        currentIndex: _currentIndex,
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            backgroundColor: ColorConstant.primary,
            icon: PhosphorIcon(PhosphorIcons.regular.house),
            label: S.current.home,
          ),
          BottomNavigationBarItem(
            backgroundColor: ColorConstant.primary,
            icon: PhosphorIcon(PhosphorIcons.regular.chartLine),
            label: S.current.history,
          ),
          BottomNavigationBarItem(
            backgroundColor: ColorConstant.primary,
            icon: PhosphorIcon(PhosphorIcons.regular.chatCircle),
            label: S.current.chat,
          ),
          BottomNavigationBarItem(
            backgroundColor: ColorConstant.primary,
            icon: PhosphorIcon(PhosphorIcons.regular.userCircle),
            label: S.current.profile,
          ),
        ],
      ),
    );
  }
}
