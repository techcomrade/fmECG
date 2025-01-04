// import 'dart:async';

// import 'package:bluetooth_ecg/constants/color_constant.dart';
// import 'package:bluetooth_ecg/generated/l10n.dart';
// import 'package:bluetooth_ecg/screens/chat_screens/chat_screen.dart';
// import 'package:bluetooth_ecg/screens/history_screens/bluetooth_classic_screen.dart';
// import 'package:bluetooth_ecg/screens/home_screen.dart';
// import 'package:bluetooth_ecg/screens/user_screens/user_profile_screen.dart';
// import 'package:connectivity_plus/connectivity_plus.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:phosphor_flutter/phosphor_flutter.dart';

// class MainScreen extends StatefulWidget {
//   const MainScreen({Key? key}) : super(key: key);

//   @override
//   _MainScreenState createState() => _MainScreenState();
// }

// class _MainScreenState extends State<MainScreen> {
//   final Connectivity _connectivity = Connectivity();
//   List<ConnectivityResult> _connectionStatus = [ConnectivityResult.none];
//   late StreamSubscription<List<ConnectivityResult>> _connectivitySubscription;
//   int _currentIndex = 0;

//   final List<Widget> _screens = [
//     const HomeScreen(),
//     const BluetoothClassicScreen(),
//     // const ChartsResultPythonScreen(),
//     const ChatScreen(),
//     const UserProfileScreen()
//   ];

//   @override
//   void initState() {
//     super.initState();
//     initConnectivity();

//     _connectivitySubscription = _connectivity.onConnectivityChanged.listen(_updateConnectionStatus);
//   }

//   @override
//   void dispose() {
//     _connectivitySubscription.cancel();
//     super.dispose();
//   }

//   Future<void> initConnectivity() async {
//     late List<ConnectivityResult> result;
//     try {
//       result = await _connectivity.checkConnectivity();
//     } on PlatformException catch (e) {
//       debugPrint("something went wrong with internet: $e");
//     }

//     // If the widget was removed from the tree while the asynchronous platform
//     // message was in flight, we want to discard the reply rather than calling
//     // setState to update our non-existent appearance.
//     if (!mounted) {
//       return Future.value(null);
//     }

//     return _updateConnectionStatus(result);
//   }

//   Future<void> _updateConnectionStatus(List<ConnectivityResult> result) async {
//     setState(() {
//       _connectionStatus = result;
//     });
//     print('Connectivity changed: $_connectionStatus');
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       resizeToAvoidBottomInset: true,
//       body: _screens[_currentIndex],
//       bottomNavigationBar: BottomNavigationBar(
//         type: BottomNavigationBarType.shifting,
//         currentIndex: _currentIndex,
//         onTap: (int index) {
//           setState(() {
//             _currentIndex = index;
//           });
//         },
//         items: [
//           BottomNavigationBarItem(
//             backgroundColor: ColorConstant.primary,
//             icon: PhosphorIcon(PhosphorIcons.regular.house),
//             label: S.current.home,
//           ),
//           BottomNavigationBarItem(
//             backgroundColor: ColorConstant.primary,
//             icon: PhosphorIcon(PhosphorIcons.regular.chartLine),
//             label: S.current.history,
//           ),
//           BottomNavigationBarItem(
//             backgroundColor: ColorConstant.primary,
//             icon: PhosphorIcon(PhosphorIcons.regular.chatCircle),
//             label: S.current.chat,
//           ),
//           BottomNavigationBarItem(
//             backgroundColor: ColorConstant.primary,
//             icon: PhosphorIcon(PhosphorIcons.regular.userCircle),
//             label: S.current.profile,
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'dart:async';

import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/ble_screen.dart';
import 'package:bluetooth_ecg/screens/chat_screens/chat_screen.dart';
import 'package:bluetooth_ecg/screens/history_screens/bluetooth_classic_screen.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/login_screen/log_in_screen.dart';
import 'package:bluetooth_ecg/screens/new_screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/new_screens/schedule_screen.dart';
import 'package:bluetooth_ecg/screens/new_screens/search_screen.dart';
import 'package:bluetooth_ecg/screens/new_screens/setting_screen.dart';
import 'package:bluetooth_ecg/screens/personal_infor_screens/personal_infor_screens.dart';
import 'package:bluetooth_ecg/screens/schedule_appointments_screens/schedule_appointments.dart';
import 'package:bluetooth_ecg/screens/user_screens/user_profile_screen.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

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
  final PageController _pageController = PageController();

  static const List<Widget> _screens = <Widget>[
    NewHomeScreen(),
    HeartRateScreen(),
    ScheduleScreen(),
    ChatScreen(),
    PersonalInfor(),
    ScheduleAppointmentScreen()
  ];

  @override
  void initState() {
    super.initState();
    initConnectivity();

    _connectivitySubscription =
        _connectivity.onConnectivityChanged.listen(_updateConnectionStatus);
  }

  @override
  void dispose() {
    _connectivitySubscription.cancel();
    _pageController.dispose();
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
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        children: _screens,
        physics: const BouncingScrollPhysics(),
      ),
      bottomNavigationBar: SalomonBottomBar(
          currentIndex: _currentIndex,
          onTap: (int index) {
            setState(() {
              _currentIndex = index;
            });
            _pageController.animateToPage(
              index,
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
            );
          },
          items: [
            SalomonBottomBarItem(
                icon: const Icon(Icons.home),
                title: const Text('Home'),
                selectedColor: Colors.blue),
            SalomonBottomBarItem(
                icon: const Icon(Icons.search),
                title: const Text('Measurement'),
                selectedColor: Colors.blue),
            SalomonBottomBarItem(
              icon: Icon(PhosphorIcons.regular.calendar),
              title: const Text('Calendar'),
              selectedColor: Colors.purple,
            ),
            SalomonBottomBarItem(
                icon: Icon(PhosphorIcons.regular.chatCircle),
                title: const Text('Chat'),
                selectedColor: Colors.blue),
            SalomonBottomBarItem(
                icon: const Icon(Icons.settings),
                title: const Text('Settings'),
                selectedColor: Colors.blue),
          ]),
    );
  }
}
