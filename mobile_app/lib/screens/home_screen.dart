import 'dart:io';

import 'package:bluetooth_ecg/components/circular_avatar.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/news_controller.dart';
import 'package:bluetooth_ecg/controllers/user_controller.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
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

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final height = size.height;
    final width = size.width;
    //final List allNews = context.watch<NewsProvider>().allNews;

    return Container(
      padding: const EdgeInsets.only(right: 20, left: 20, top: 40, bottom: 10),
      child: SingleChildScrollView(
        controller: _scrollController,
        physics: const ClampingScrollPhysics(),
        child:
            Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          // header
          SizedBox(
            height: 50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Row(children: [
                //   const SizedBox(width: 8),
                //   Column(
                //     mainAxisAlignment: MainAxisAlignment.spaceAround,
                //     crossAxisAlignment: CrossAxisAlignment.start,
                //     children: [
                //       const Text("Chào mừng đến với fmECG"),
                //       Text(
                //         "Thai Dong",
                //         style: TextStyle(
                //           color: ColorConstant.primary,
                //           fontWeight: FontWeight.bold,
                //         ),
                //       )
                //     ],
                //   ),
                // ]),
                const IconButton(
                  icon: Icon(
                    Icons.menu,
                    size: 35,
                  ),
                  onPressed: null,
                ),
                Row(children: [
                  // const DarkLightSwitch(),

                  InkWell(
                    child: Icon(PhosphorIcons.regular.bell),
                  ),
                  SizedBox(
                    width: width * 0.05,
                  ),
                  const CircularAvatar(
                      imageAsset: 'assets/images/doctor.png', radius: 27),
                ])
              ],
            ),
          ),

          SizedBox(height: height * 0.02),
          SizedBox(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Chào mừng tới fmEcg,\nThai Dong.",
                    style: TextStyle(
                        color: ColorConstant.black900,
                        fontWeight: FontWeight.bold,
                        fontSize: 22),
                  ),
                ),
                SizedBox(height: height * 0.05),
                Wrap(
                  spacing: 15,
                  runSpacing: 15,
                  alignment: WrapAlignment.spaceAround,
                  children: [
                    NumberCard(
                      leadingIcon: Icon(PhosphorIcons.fill.heartbeat),
                      number: 82.0,
                      text: "Nhịp tim",
                      subText: "Mẹ",
                      unit: "bpm",
                      // color1: Colors.grey,
                      // color2: Colors.grey,
                      centerImage: Image.asset("assets/images/hearthrate.jpg"),
                    ),
                    NumberCard(
                      leadingIcon: Icon(PhosphorIcons.fill.stethoscope),
                      number: 72.9,
                      text: "Huyết áp",
                      subText: "Mẹ",
                      unit: "mmHg",
                      // color1: Colors.grey,
                      // color2: Colors.grey,
                      centerImage:
                          Image.asset("assets/images/blood_pressurer.jpg"),
                    ),
                    NumberCard(
                      leadingIcon: Icon(PhosphorIcons.fill.heartbeat),
                      number: 82.6,
                      text: "Nhịp tim ",
                      subText: "Thai nhi",
                      unit: "bpm",
                      // color1: ColorConstant.primary,
                      // color1: Colors.grey,
                      // color2: Colors.grey,
                      //  color2: ColorConstant.primary,
                      centerImage: Image.asset("assets/images/hearthrate.jpg"),
                    ),
                    NumberCard(
                      leadingIcon: Icon(PhosphorIcons.fill.stethoscope),
                      number: 86.0,
                      text: "Huyết áp",
                      subText: "Thai nhi",
                      unit: "mmHg",
                      //color1: ColorConstant.primary,
                      // color1: ColorConstant.teal,
                      // color2: ColorConstant.teal,
                      centerImage:
                          Image.asset("assets/images/blood_pressurer.jpg"),
                    ),
                  ],
                )
              ],
            ),
          ),
          const SizedBox(height: 30),
        ]),
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
      activeToggleColor: const Color(0xFF6E40C9),
      inactiveToggleColor: const Color(0xFF2F363D),
      activeSwitchBorder: Border.all(
        color: const Color(0xFF3C1E70),
        width: 3.0,
      ),
      inactiveSwitchBorder: Border.all(
        color: const Color(0xFFD1D5DA),
        width: 3.0,
      ),
      activeColor: const Color(0xFF271052),
      inactiveColor: Colors.white,
      activeIcon: const Icon(
        Icons.nightlight_round,
        color: Color(0xFFF8E3A1),
      ),
      inactiveIcon: const Icon(
        Icons.wb_sunny,
        color: Color(0xFFFFDF5D),
      ),
      onToggle: (val) {
        Provider.of<AuthProvider>(context, listen: false).isAutoTheme = false;
        final auth = Provider.of<AuthProvider>(context, listen: false);
        setState(() {
          isDarkSwitch = val;
        });
        if (isDarkSwitch) {
          auth.setTheme(ThemeType.dark, false);
        } else {
          auth.setTheme(ThemeType.light, false);
        }
      },
    );
  }
}

class SquareContainer extends StatelessWidget {
  final IconData icon;
  final String text;

  const SquareContainer({Key? key, required this.icon, required this.text})
      : super(key: key);

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

class NumberCard extends StatefulWidget {
  final double number;
  final String text;
  final String subText;
  final String unit;
  final Icon leadingIcon;
  final Image centerImage;

  const NumberCard({
    Key? key,
    required this.number,
    required this.text,
    required this.subText,
    required this.unit,
    required this.leadingIcon,
    required this.centerImage,
  }) : super(key: key);

  @override
  State<NumberCard> createState() => _NumberCardState();
}

class _NumberCardState extends State<NumberCard> {
  bool _isClicked = false;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final height = size.height;
    final width = size.width;
    return GestureDetector(
      onTap: () {
        setState(() {
          _isClicked = !_isClicked;
        });
      },
      child: Container(
        width: width * 0.4,
        height: height * 0.3,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.0),
          gradient: LinearGradient(
            colors: _isClicked
                ? [Colors.teal, Colors.teal]
                : [Colors.grey, Colors.grey],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            ListTile(
              leading: widget.leadingIcon,
              title: Text(
                widget.text,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: _isClicked
                      ? ColorConstant.black900
                      : ColorConstant.description,
                ),
              ),
            ),
            const SizedBox(height: 3.0),
            Text(
              widget.subText,
              style: TextStyle(
                fontSize: 16.0,
                color: _isClicked
                    ? ColorConstant.black900
                    : ColorConstant.description,
              ),
            ),
            const SizedBox(height: 10.0),
            widget.centerImage,
            const SizedBox(height: 5.0),
            Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
              Text(
                '${widget.number}',
                style: TextStyle(
                  fontSize: 30.0,
                  color: _isClicked
                      ? ColorConstant.black900
                      : ColorConstant.description,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                widget.unit,
                style: TextStyle(
                  color: _isClicked
                      ? ColorConstant.black900
                      : ColorConstant.description,
                  fontSize: 15,
                ),
              ),
            ]),
          ],
        ),
      ),
    );
  }
}

class ImageCard extends StatelessWidget {
  final String imageAsset;
  final Function() functionScanBluetooth;
  final Function() temporaryNothing;

  const ImageCard({
    Key? key,
    required this.imageAsset,
    required this.functionScanBluetooth,
    required this.temporaryNothing,
  }) : super(key: key);

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
          const SizedBox(height: 12.0),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: functionScanBluetooth,
                child: const Text("Scan bluetooth"),
              ),
              ElevatedButton(
                onPressed: temporaryNothing,
                child: const Text("Test live chart"),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
