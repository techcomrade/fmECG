import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_off_screen.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bluetooth_scanning_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class BluetoothMainScreen extends StatelessWidget {
  const BluetoothMainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      color: ColorConstant.primary,
      home: StreamBuilder<BluetoothState>(
          stream: FlutterBluePlus.instance.state,
          initialData: BluetoothState.off,
          builder: (c, snapshot) {
            final state = snapshot.data;
            if (state == BluetoothState.on) {
              return BluetoothScanningScreen();
            }
            return BluetoothOffScreen(state: state);
          }),
    );
  }
}