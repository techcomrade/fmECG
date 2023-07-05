import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/screens/chat_screen.dart';
import 'package:bluetooth_ecg/screens/history_measurement_screen.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/user_profile_screen.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}
Color LIME = Color(0xFF094D55);

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    HomeScreen(),
    HistoryMeasurementScreen(),
    ChatScreen(),
    UserProfileScreen()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (int index) {
          setState(() {
            _currentIndex = index;
          });
        },
        // backgroundColor: backgroundColorApp,
        // selectedItemColor: ColorConstant.primary,
        // unselectedItemColor: ColorConstant.quaternary,
        items: [
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIcons.regular.house),
            label: S.current.home,
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIcons.regular.chartLine),
            label: S.current.history,
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIcons.regular.chatCircle),
            label: S.current.chat,
          ),
          BottomNavigationBarItem(
            icon: PhosphorIcon(PhosphorIcons.regular.userCircle),
            label: S.current.profile,
          ),
        ],
      ),
    );
  }
}