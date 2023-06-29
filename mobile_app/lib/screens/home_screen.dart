import 'dart:io';

import 'package:bluetooth_ecg/components/circular_avatar.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_main_screen.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
import 'package:bluetooth_ecg/components/live_chart.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

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
    return Container(
      padding: const EdgeInsets.only(right: 20, left: 20, top: 40, bottom: 10),
      child: SingleChildScrollView(
        controller: _scrollController,
        physics: const ClampingScrollPhysics(),
        child: Column(
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
            const SizedBox(height: 30),
            //quick action
            SizedBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Quick Action",
                    style: TextStyle(
                      color: ColorConstant.quaternary,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      SquareContainer(icon: PhosphorIcons.regular.lightning, text: "Power nap"),
                      SquareContainer(icon: PhosphorIcons.regular.moon, text: "Deep sleep"),
                      SquareContainer(icon: PhosphorIcons.regular.userSwitch, text: "Focus"),
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
                  Text("Overview",
                    style: TextStyle(
                      color: ColorConstant.quaternary,
                      fontWeight: FontWeight.bold,
                      fontSize: 18
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      NumberCard(number: 80.0, text: "Heart Rate", color1: ColorConstant.primary, color2: ColorConstant.primary),
                      NumberCard(number: 36.7, text: "Temperature", color1: ColorConstant.primary, color2: ColorConstant.quaternary),
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
                      fontSize: 18
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
        setState(() {
          isDarkSwitch = val;
        });
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
  final Color color1;
  final Color color2;

  NumberCard({
    required this.number,
    required this.text,
    required this.color1,
    required this.color2,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150.0,
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
              fontSize: 18.0,
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
