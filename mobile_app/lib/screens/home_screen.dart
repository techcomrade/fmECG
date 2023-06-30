import 'dart:io';

import 'package:bluetooth_ecg/components/circular_avatar.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_main_screen.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
import 'package:bluetooth_ecg/components/live_chart.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  ScrollController _scrollController = ScrollController();
  late File fileToSave;
  bool isShowChart = false;
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // final bool isDarkTheme = Provider.of<AuthProvider>(context, listen: true).theme == ThemeType.DARK;
    // final Color backgroundColorApp = isDarkTheme ? ColorConstant.quaternary: Colors.white; 
    return Container(
      padding: const EdgeInsets.only(right: 20, left: 20, top: 40, bottom: 10),
      // color: backgroundColorApp,
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
                          Text("Welcome to fmECG"),
                          Text(
                            'Thai Dong',
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
            // const SizedBox(height: 30),
            // //quick action
            // SizedBox(
            //   child: Column(
            //     crossAxisAlignment: CrossAxisAlignment.start,
            //     children: [
            //       Text("Quick Action",
            //         style: TextStyle(
            //           color: ColorConstant.quaternary,
            //           fontWeight: FontWeight.bold,
            //           fontSize: 18
            //         ),
            //       ),
            //       const SizedBox(height: 10),
            //       Row(
            //         mainAxisAlignment: MainAxisAlignment.spaceAround,
            //         children: [
            //           SquareContainer(icon: PhosphorIcons.regular.lightning, text: "Power nap"),
            //           SquareContainer(icon: PhosphorIcons.regular.moon, text: "Deep sleep"),
            //           SquareContainer(icon: PhosphorIcons.regular.userSwitch, text: "Focus"),
            //         ],
            //       )
            //     ],
            //   ),
            // ),

            const SizedBox(height: 30),
            SizedBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    alignment: Alignment.topLeft,
                    child: Text("Overview",
                      style: TextStyle(
                        color: ColorConstant.quaternary,
                        fontWeight: FontWeight.bold,
                        fontSize: 22
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    alignment: WrapAlignment.spaceAround,
                    children: [
                      NumberCard(number: 82.0, text: "Heart Rate (BPM)", subText: "Mother", color1: ColorConstant.primary, color2: ColorConstant.primary),
                      NumberCard(number: 72.9, text: "Variability (BPM)", subText: "Mother", color1: ColorConstant.primary, color2: ColorConstant.quaternary),
                      NumberCard(number: 82.6, text: "Heart Rate (BPM)", subText: "Fetus", color1: ColorConstant.tertiary, color2: ColorConstant.primary),
                      NumberCard(number: 86.0, text: "Variability (BPM)", subText: "Fetus", color1: ColorConstant.secondary, color2: ColorConstant.primary),
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
                  Text("Signals",
                    style: TextStyle(
                      color: ColorConstant.quaternary,
                      fontWeight: FontWeight.bold,
                      fontSize: 22
                    ),
                  ),
                  const SizedBox(height: 10),
                  !isShowChart ? ImageCard(
                    imageAsset: 'assets/images/heart_rate_example.jpeg', 
                    functionScanBluetooth: () {
                      Navigator.push(context,
                        MaterialPageRoute(
                          builder: (context) => BluetoothMainScreen(),
                        )
                      );
                    }, 
                    temporaryNothing: () async {
                      FilesManagement.createDirectoryFirstTimeWithDevice();
                      fileToSave = await FilesManagement.setUpFileToSaveDataMeasurement();
                      setState(() {
                        isShowChart = true;
                      });
                    }
                  ) 
                  : LiveChartSample(fileToSave: fileToSave)
                  // : Container(),
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
        ThemeType theme = Provider.of<AuthProvider>(context, listen: false).theme;
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
  final double number;
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
      width: 165.0,
      height: 100.0,
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
        children: [
          Text(
            text,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18.0,
              color: ColorConstant.description,
            ),
          ),
          const SizedBox(height: 5.0),
          Text(
            subText,
            style: TextStyle(
              fontSize: 16.0,
              color: ColorConstant.description,
            ),
          ),
          const SizedBox(height: 12.0),
          Text(
            '$number',
            style: TextStyle(
              fontSize: 30.0,
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
                child: Text("Scan bluetooth"),
              ),
              ElevatedButton(
                onPressed: temporaryNothing,
                child: Text("Test live chart"),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
