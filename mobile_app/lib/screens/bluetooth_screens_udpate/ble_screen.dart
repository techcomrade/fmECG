import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'dart:io' show Platform;

// This flutter app demonstrates an usage of the flutter_reactive_ble flutter plugin
// This app works only with BLE devices which advertise with a Nordic UART Service (NUS) UUID
Uuid _UART_UUID = Uuid.parse("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
Uuid _UART_RX   = Uuid.parse("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
Uuid _UART_TX   = Uuid.parse("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  final flutterReactiveBle = FlutterReactiveBle();
  late DiscoveredDevice _deviceNeedConnecting;
  late StreamSubscription<DiscoveredDevice> _scanStream;
  late Stream<ConnectionStateUpdate> _currentConnectionStream;
  late StreamSubscription<ConnectionStateUpdate> _connection;
  late QualifiedCharacteristic _txCharacteristic;
  // late QualifiedCharacteristic _rxCharacteristic;
  late Stream<List<int>> _receivedDataStream;

  bool _foundDeviceWaitingToConnect = false;
  bool _isScanning = false;
  bool _isConnected = false;
  String _logTexts = "";
  int _numberOfMessagesReceived = 0;

  @override
  void initState() {
    super.initState();
  }

  void refreshScreen() {
    setState(() {});
  }

  // void _sendData() async {
  //     await flutterReactiveBle.writeCharacteristicWithResponse(_rxCharacteristic, value: _dataToSendText.text.codeUnits);
  // }

  void onNewReceivedData(List<int> data) {
    _numberOfMessagesReceived += 1;
    // _receivedData.add( "$_numberOfMessagesReceived: $data");
    print('dataaaa:$_numberOfMessagesReceived :$data');
  }

  void _disconnect() async {
    await _connection.cancel();
    _isConnected = false;
    refreshScreen();
  }

  void _stopScan() async {
    await _scanStream.cancel();
    _isScanning = false;
  }

  void _startScan() async {
    _isScanning = true;
    _scanStream = flutterReactiveBle.scanForDevices(withServices: [_UART_UUID]).listen((DiscoveredDevice device) {
      print('devices:$device');
      if (device.serviceUuids.contains(_UART_UUID)) {
        setState(() {
        _deviceNeedConnecting = device;
        _foundDeviceWaitingToConnect = true;
        });
      }
      }, onError: (Object error) {
        _logTexts =
            "${_logTexts}ERROR while scanning:$error \n";
        refreshScreen();
      }
    );
  }

  void onConnectDevice() {
    _scanStream.cancel();
    _currentConnectionStream = flutterReactiveBle.connectToAdvertisingDevice(
      id: _deviceNeedConnecting.id,
      prescanDuration: Duration(seconds: 1),
      withServices: [_UART_UUID, _UART_TX],
    );

    _connection = _currentConnectionStream.listen((event) {
      var id = event.deviceId.toString();
      switch(event.connectionState) {
        case DeviceConnectionState.connecting:{
          _logTexts = "${_logTexts}Connecting to $id\n";
          break;
        }
        case DeviceConnectionState.connected: {
          setState(() {
            _isConnected = true;
            _foundDeviceWaitingToConnect = false;
          });
          _numberOfMessagesReceived = 0;
          _txCharacteristic = QualifiedCharacteristic(
            serviceId: _UART_UUID, 
            characteristicId: _UART_TX, 
            deviceId: event.deviceId
          );
          // _rxCharacteristic = QualifiedCharacteristic(serviceId: _UART_UUID, characteristicId: _UART_RX, deviceId: event.deviceId);
          break;
        }
        case DeviceConnectionState.disconnecting: {
          _isConnected = false;
          _logTexts = "${_logTexts}Disconnecting from $id\n";
          break;
        }
        case DeviceConnectionState.disconnected: {
          _logTexts = "${_logTexts}Disconnected from $id\n";
          break;
        }
      }
    });
  }

  void _partyTime() {
    _receivedDataStream = flutterReactiveBle.subscribeToCharacteristic(_txCharacteristic);
    _receivedDataStream.listen((data) {
      print('data:$data');
      onNewReceivedData(data);
    }, onError: (dynamic error) {
      // _logTexts = "${_logTexts}Error:$error$id\n";
      print('error while streaming data:$error');
    });
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
			backgroundColor: Colors.white,
			body: Container(),
			persistentFooterButtons: [
         _isScanning
            ? ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.grey, 
                  onPrimary: Colors.white, 
                ),
                onPressed: () {},
                child: const Icon(Icons.search),
              )
            // False condition
            : ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.blue, // background
                  onPrimary: Colors.white, // foreground
                ),
                onPressed: _startScan,
                child: const Icon(Icons.search),
              ),
        _foundDeviceWaitingToConnect
            // True condition
            ? ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.blue, // background
                  onPrimary: Colors.white, // foreground
                ),
                onPressed: onConnectDevice,
                child: const Icon(Icons.bluetooth),
              )
            // False condition
            : ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.grey, // background
                  onPrimary: Colors.white, // foreground
                ),
                onPressed: () {},
                child: const Icon(Icons.bluetooth),
              ),
        _isConnected
            // True condition
            ? ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.blue, // background
                  onPrimary: Colors.white, // foreground
                ),
                onPressed: _partyTime,
                child: const Icon(Icons.celebration_rounded),
              )
            // False condition
            : ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.grey, // background
                  onPrimary: Colors.white, // foreground
                ),
                onPressed: () {},
                child: const Icon(Icons.celebration_rounded),
              ),
      ],
		);
  }
}