import 'package:flutter/services.dart';
import 'package:flutter/material.dart';

class BluetoothScreen extends StatefulWidget {
  @override
  State<BluetoothScreen> createState() => _BluetoothScreenState();
}

class _BluetoothScreenState extends State<BluetoothScreen> {
  static const platform = MethodChannel("fmecg/java");
  String _status = 'Bluetooth required';
  List<String> _pairedDevicesName = [];
  List<String> _foundDevicesName = [];

  Future<void> _enableBluetooth() async {
    String status;
    try {
      final result = await platform.invokeMethod<bool>("enableBluetooth");
      status = "Bluetooth status: " + (result == true ? "enabled" : "disabled");
    } on PlatformException catch (e) {
      status = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _status = status;
    });
  }

  Future<void> _getPairedDevices() async {
    List<String> pairedDevicesName;
    try {
      final result =
          await platform.invokeListMethod<String>("getPairedDevices");
      print(result);
      pairedDevicesName = result!;
      print(pairedDevicesName[0]);
    } on PlatformException {
      pairedDevicesName = ["Failed to get paired devices"];
    }
    setState(() {
      _pairedDevicesName = pairedDevicesName;
    });
  }

  Future<void> _getFoundDevices() async {
    List<String> foundDevicesName;
    try {
      final result = await platform.invokeListMethod<String>("getFoundDevices");
      print(result);
      foundDevicesName = result!;
    } on PlatformException {
      foundDevicesName = ["Failed to get paired devices"];
    }
    setState(() {
      _foundDevicesName = foundDevicesName;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ElevatedButton(
                  onPressed: _enableBluetooth,
                  child: const Text("Enable Bluetooth")),
              Text(_status),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ElevatedButton(
                  onPressed: _getPairedDevices,
                  child: const Text("Get Paired Devices")),
              ElevatedButton(
                  onPressed: _getFoundDevices,
                  child: const Text("Get Found Devices")),
            ],
          ),
          Row(
            children: [
              Expanded(
                child: _pairedDevicesName.isEmpty
                    ? const Text("None")
                    : ListView.builder(
                        itemCount: _pairedDevicesName.length,
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Text(_pairedDevicesName[index]);
                        },
                      ),
              ),
              Expanded(
                child: _foundDevicesName.isEmpty
                    ? const Text("None")
                    : ListView.builder(
                        itemCount: _foundDevicesName.length,
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Text(_foundDevicesName[index]);
                        },
                      ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
