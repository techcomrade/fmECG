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

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _scrollController = ScrollController();
  late File fileToSave;
  bool isShowChart = false;

  final TextEditingController _phoneController = TextEditingController();
  bool _isEditing = false;
  final FocusNode focusInputPhone = FocusNode();
  String phoneNumberWarning = "";

  Map allNews = {};
  @override
  void initState() {
    super.initState();
    _getInitPhoneNumber();
    // getDoctorAssigned();
    // NewsController.getAllNews();
  }

  // void getDoctorAssigned() async {
  //   int patientId = await Utils.getUserId();
  //   UserController.getDoctorAssigned(patientId);
  // }

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
    _phoneController.dispose();
    focusInputPhone.dispose();
  }

  _savePhoneNumberToSharedPrefs(String phoneNumber) async {
    const String keyToSave = "phone_number_warning";
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setString(keyToSave, phoneNumber);
  }

  _getInitPhoneNumber() async {
    const String keyInit = "phone_number_warning";
    final SharedPreferences preferences = await SharedPreferences.getInstance();

    final bool isExistPhoneNumber = preferences.containsKey(keyInit);
    if (isExistPhoneNumber) {
      _phoneController.text = preferences.getString(keyInit)!;
    }
  }

  @override
  Widget build(BuildContext context) {
    // final List allNews = context.watch<NewsProvider>().allNews;

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
                  Row(
                    children: [
                      CircularAvatar(imageAsset: 'assets/images/doctor.png', radius: 27),
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
                    ]
                  ),
                  Row(
                    children: [
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
                    child: Text(
                      "Tổng quan",
                      style: TextStyle(
                          color: ColorConstant.quaternary,
                          fontWeight: FontWeight.bold,
                          fontSize: 22),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 15,
                    runSpacing: 15,
                    alignment: WrapAlignment.spaceAround,
                    children: [
                      NumberCard(number: 150, text: "Huyết áp tâm thu", subText: "mmHg", color1: ColorConstant.primary, color2: ColorConstant.primary),
                      NumberCard(number: 100, text: "Huyết áp tâm trương", subText: "mmHg", color1: ColorConstant.primary, color2: ColorConstant.primary),
                      NumberCard(number: 101, text: "Nhịp tim", subText: "bpm", color1: ColorConstant.primary, color2: ColorConstant.quaternary),
                      // NumberCard(number: 86.0, text: "Biến thiên nhịp tim", subText: "bpm", color1: ColorConstant.primary, color2: ColorConstant.quaternary),
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Đo huyết áp",
                    style: TextStyle(
                        color: ColorConstant.quaternary,
                        fontWeight: FontWeight.bold,
                        fontSize: 22),
                  ),
                  const SizedBox(height: 10),
                  !isShowChart ? ImageCard(
                    imageAsset: 'assets/images/heart_rate_example.jpeg', 
                    functionScanBluetooth: () {
                      Navigator.push(context,
                        MaterialPageRoute(
                          builder: (context) => BleReactiveScreen(),
                        )
                      );
                    }, 
                    temporaryNothing: () async {
                      bool isAccessFiles = await _requestManageStorage();
                      if (isAccessFiles) {
                        FilesManagement.createDirectoryFirstTimeWithDevice();
                        fileToSave = await FilesManagement.setUpFileToSaveDataMeasurement();
                        setState(() {
                          isShowChart = true;
                        });
                      } else {
                        // show dialog need permission
                        print('phone does not grant permission');
                      }
                    }
                  ) 
                  : LiveChartSample(
                      fileToSave: fileToSave, 
                      callBackToPreview: () => setState(() {
                        isShowChart = false;
                      }),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 20),
              Container(
                alignment: Alignment.topLeft,
                padding: EdgeInsets.only(bottom: 10),
                child: Text(
                  "Số người thân",
                  style: TextStyle(
                    color: ColorConstant.quaternary,
                    fontWeight: FontWeight.bold,
                    fontSize: 22,
                  ),
                ),
              ),

              // Ô nhập liệu số điện thoại
              TextFormField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                enabled: _isEditing,
                focusNode: focusInputPhone,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderSide: BorderSide(
                      color: Colors.black
                    )
                  ),
                  hintText: 'Nhập số điện thoại',
                  labelText: 'Số điện thoại',
                ),
                onChanged: (text) => setState(() {
                  phoneNumberWarning = _phoneController.text;
                }),
              ),

              // Nút chỉnh sửa và lưu
              Row(
                mainAxisAlignment: MainAxisAlignment.center,  // Căn giữa các nút
                children: [
                  ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _isEditing = true;
                      });
                      focusInputPhone.requestFocus();
                    },
                    child: Text('Chỉnh sửa'),
                  ),
                  SizedBox(width: 20),  // Khoảng cách giữa các nút
                  ElevatedButton(
                    onPressed: phoneNumberWarning == "" ? null : () async {
                      await _savePhoneNumberToSharedPrefs(_phoneController.text);
                      setState(() {
                        _isEditing = false;
                        phoneNumberWarning = "";
                      });
                    },
                    child: Text('Lưu'),
                  ),
                ],
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

class SquareContainer extends StatelessWidget {
  final IconData icon;
  final String text;

  SquareContainer({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.0,
      height: 100.0,
      decoration: BoxDecoration(
        color: ColorConstant.description,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: ColorConstant.quaternary,
            size: 35.0,
          ),
          const SizedBox(height: 10.0),
          Text(
            text,
            style: TextStyle(
              color: ColorConstant.quaternary,
              fontSize: 15.0,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class NumberCard extends StatelessWidget {
  final int number;
  final String text;
  final String subText;
  final Color color1;
  final Color color2;

  NumberCard({
    required this.number,
    required this.text,
    required this.subText,
    required this.color1,
    required this.color2,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 110.0,
      height: 110.0,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.0),
        gradient: LinearGradient(
          colors: [color1, color2],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            text,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 15.0,
              color: ColorConstant.description,
            ),
          ),
          const SizedBox(height: 3.0),
          Text(
            subText,
            style: TextStyle(
              fontSize: 12.0,
              color: ColorConstant.description,
            ),
          ),
          const SizedBox(height: 5.0),
          Text(
            '$number',
            style: TextStyle(
              fontSize: 17.0,
              color: ColorConstant.description,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class ImageCard extends StatelessWidget {
  final String imageAsset;
  final Function() functionScanBluetooth;
  final Function() temporaryNothing;

  ImageCard({
    required this.imageAsset,
    required this.functionScanBluetooth,
    required this.temporaryNothing,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: ColorConstant.quinary,
      elevation: 4.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Column(
        children: [
          Image.asset(
            imageAsset,
            width: double.infinity,
            height: 200.0,
            fit: BoxFit.cover,
          ),
          SizedBox(height: 12.0),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: functionScanBluetooth,
                child: Text("Thực hiện đo"),
              ),
              ElevatedButton(
                 onPressed: temporaryNothing,
                 child: Text("Thử đo"),
               ),
            ],
          ),
        ],
      ),
    );
  }
}
