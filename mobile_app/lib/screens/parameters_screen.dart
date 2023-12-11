import 'dart:io';

import 'package:bluetooth_ecg/components/circular_avatar.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/controllers/news_controller.dart';
import 'package:bluetooth_ecg/controllers/user_controller.dart';
import 'package:bluetooth_ecg/models/user_model.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/ble_screen.dart';
import 'package:bluetooth_ecg/screens/news_screens/news_all_screens.dart';
import 'package:bluetooth_ecg/screens/news_screens/news_detail_screen.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:bluetooth_ecg/components/live_chart.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

class ParametersScreen extends StatefulWidget {
  @override
  _ParametersScreenState createState() => _ParametersScreenState();
}

class _ParametersScreenState extends State<ParametersScreen> {
  final ScrollController _scrollController = ScrollController();
  late File fileToSave;
  bool isShowChart = false;

  Map allNews = {};
  @override
  void initState() {
    super.initState();
    getDoctorAssigned();
    NewsController.getAllNews();
  }

  void getDoctorAssigned() async {
    int patientId = await Utils.getUserId();
    UserController.getDoctorAssigned(patientId);
  }

  Future<bool> _requestManageStorage() async {
    final PermissionStatus status =
    await Permission.manageExternalStorage.request();
    if (status == PermissionStatus.granted) {
      return true;
    } else {
      return false;
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final List allNews = context.watch<NewsProvider>().allNews;

    return Container(
      padding: const EdgeInsets.only(right: 20, left: 20, top: 40, bottom: 10),
      child: SingleChildScrollView(
        controller: _scrollController,
        physics: const ClampingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // header
            SizedBox(
              height: 50,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(children: [
                    CircularAvatar(
                        imageAsset: 'assets/images/doctor.png', radius: 27),
                    const SizedBox(width: 8),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Chào mừng đến với MyBP"),
                        Text(
                          "User",
                          style: TextStyle(
                            color: ColorConstant.primary,
                            fontWeight: FontWeight.bold,
                          ),
                        )
                      ],
                    ),
                  ]),
                  Row(children: [
                    const DarkLightSwitch(),
                    const SizedBox(width: 8),
                    InkWell(
                      child: Icon(PhosphorIcons.regular.bell),
                    )
                  ])
                ],
              ),
            ),

            const SizedBox(height: 30),
            SizedBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    alignment: Alignment.topLeft,
                    child: Text("Tổng quan",
                      style: TextStyle(
                        color: ColorConstant.quaternary,
                        fontWeight: FontWeight.bold,
                        fontSize: 22
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 15,
                    runSpacing: 15,
                    alignment: WrapAlignment.spaceAround,
                    children: [
                      NumberCard(
                          number: 180,
                          text: "Huyết áp tâm thu",
                          subText: "mmHg",
                          color1: ColorConstant.primary,
                          color2: ColorConstant.primary),
                      NumberCard(
                          number: 110,
                          text: "Huyết áp tâm trương",
                          subText: "mmHg",
                          color1: ColorConstant.primary,
                          color2: ColorConstant.primary),
                      NumberCard(
                          number: 70,
                          text: "Nhịp tim",
                          subText: "bpm",
                          color1: ColorConstant.primary,
                          color2: ColorConstant.primary),
                      // NumberCard(number: 86.0, text: "Biến thiên nhịp tim", subText: "bpm", color1: ColorConstant.primary, color2: ColorConstant.quaternary),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
        // child: LiveChartSample()
      ),
    );
  }
}

class DarkLightSwitch extends StatefulWidget {
  const DarkLightSwitch({
    Key? key,
  }) : super(key: key);

  @override
  State<DarkLightSwitch> createState() => _DarkLightSwitchState();
}

class _DarkLightSwitchState extends State<DarkLightSwitch> {
  bool isDarkSwitch = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FlutterSwitch(
      width: 60,
      height: 35.0,
      toggleSize: 25.0,
      value: isDarkSwitch,
      borderRadius: 20.0,
      padding: 1.5,
      activeToggleColor: Color(0xFF6E40C9),
      inactiveToggleColor: Color(0xFF2F363D),
      activeSwitchBorder: Border.all(
        color: Color(0xFF3C1E70),
        width: 3.0,
      ),
      inactiveSwitchBorder: Border.all(
        color: Color(0xFFD1D5DA),
        width: 3.0,
      ),
      activeColor: Color(0xFF271052),
      inactiveColor: Colors.white,
      activeIcon: Icon(
        Icons.nightlight_round,
        color: Color(0xFFF8E3A1),
      ),
      inactiveIcon: Icon(
        Icons.wb_sunny,
        color: Color(0xFFFFDF5D),
      ),
      onToggle: (val) {
        Provider.of<AuthProvider>(context, listen: false).isAutoTheme = false;
        ThemeType theme =
            Provider.of<AuthProvider>(context, listen: false).theme;
        final auth = Provider.of<AuthProvider>(context, listen: false);
        setState(() {
          isDarkSwitch = val;
        });
        if (isDarkSwitch) {
          auth.setTheme(ThemeType.DARK, false);
        } else {
          auth.setTheme(ThemeType.LIGHT, false);
        }
      },
    );
  }
}



class NumberCard extends StatelessWidget {
  final double number;
  final String text;
  final String subText;
  final Color color1;
  final Color color2;
  final bool isWarning;
  final bool isCritical;

  NumberCard({
    required this.number,
    required this.text,
    required this.subText,
    required this.color1,
    required this.color2,
    this.isWarning = false,
    this.isCritical = false,
  });

  @override
  Widget build(BuildContext context) {
    Color iconColor = Colors.red; // Màu mặc định cho icon
    IconData icon = Icons.error; // Biểu tượng mặc định

    if (isWarning) {
      iconColor = Colors.yellow;
      icon = Icons.warning; // Biểu tượng cảnh báo
    }

    if (isCritical) {
      iconColor = Colors.red;
      icon = Icons.error; // Biểu tượng nguy cấp
    }

    return Container(
      width: 150.0,
      height: 150.0,
      padding: EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15.0),
        gradient: LinearGradient(
          colors: [Colors.redAccent, Colors.pinkAccent],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 4,
            offset: Offset(0, 3), // changes position of shadow
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: iconColor,
            size: 24.0,
          ),
          const SizedBox(height: 3.0),
          Text(
            text,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 15.0,
              color: Colors.white, // Màu sắc cho text giữ nguyên
            ),
          ),
          const SizedBox(height: 5.0),
          Text(
            '$number',
            style: TextStyle(
              fontSize: 20.0,
              color: Colors.white, // Màu sắc cho số liệu giữ nguyên
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 3.0),
          Text(
            subText,
            style: TextStyle(
              fontSize: 10.0,
              color: Colors.white, // Màu sắc cho subtext giữ nguyên
            ),
          ),
        ],
      ),
    );
  }
}




