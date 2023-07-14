import 'dart:io';

import 'package:app_settings/app_settings.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';

class BluetoothOffScreen extends StatelessWidget {
  const BluetoothOffScreen({Key? key, this.state}) : super(key: key);

  final BleStatus? state;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorConstant.quaternary,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Icon(
              Icons.bluetooth_disabled,
              size: 200.0,
              color: Colors.white54,
            ),
            Text(
              'Bluetooth hiện đang ở chế độ ${state != null ? state.toString().substring(10) : 'not available'}.',
              style: Theme.of(context)
                  .primaryTextTheme
                  .subtitle2
                  ?.copyWith(color: Colors.white),
            ),
            // Text('Vui lòng bật Bluetooth để tiếp tục'),
            ElevatedButton(
              child: const Text('Bật Bluetooth'),
              onPressed: Platform.isAndroid
                  ? () => AppSettings.openBluetoothSettings()
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}