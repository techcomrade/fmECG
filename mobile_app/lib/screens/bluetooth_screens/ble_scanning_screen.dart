import 'dart:async';
import 'dart:io';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/ble_chart_test.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:permission_handler/permission_handler.dart';

Uuid uartUUID = Uuid.parse("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
Uuid uartRX   = Uuid.parse("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
Uuid uartTX   = Uuid.parse("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

class BleScanningAndConnectingScreen extends StatefulWidget {
  const BleScanningAndConnectingScreen({Key? key}) : super(key: key);

  @override
  State<BleScanningAndConnectingScreen> createState() => _BleScanningAndConnectingScreenState();
}

class _BleScanningAndConnectingScreenState extends State<BleScanningAndConnectingScreen> {
  final flutterReactiveBle = FlutterReactiveBle();
  List<DiscoveredDevice> devices = [];
  DiscoveredDevice? deviceConnected;
  StreamSubscription<DiscoveredDevice>? _scanStream;
  late StreamController<DiscoveredDevice> _deviceScanningController;
  Stream<DiscoveredDevice> get deviceScanningStream => _deviceScanningController.stream;

  StreamSubscription<ConnectionStateUpdate>? _connectionStream;
  late StreamController<ConnectionStateUpdate> _deviceConnectionController;
  Stream<ConnectionStateUpdate> get deviceConnectionStream  => _deviceConnectionController.stream;
  
  late QualifiedCharacteristic characteristicToReceiveData;
  bool _isScanning = false;

  @override
  void initState() {
    _deviceScanningController = StreamController<DiscoveredDevice>.broadcast();
    _deviceConnectionController = StreamController<ConnectionStateUpdate>.broadcast();
    _startScanning();
    super.initState();
  }

  void _startScanning() {
    // _startTimerScanningBluetooth();
    setState(() {
      _isScanning = true;
    });
    devices.clear();
    _scanStream?.cancel();

    _scanStream = flutterReactiveBle.scanForDevices(withServices: []).listen((DiscoveredDevice device) {
      final knownDeviceIndex = devices.indexWhere((d) => d.id == device.id);
      if (knownDeviceIndex >= 0) {
        devices[knownDeviceIndex] = device;
      } else {
        if (device.rssi > -90 && device.name.isNotEmpty) {
          devices.add(device);
        }
      }
      _deviceScanningController.add(device);
      setState(() {});
    });
  }

  // void _startTimerScanningBluetooth() {
  //   _timerScanning = Timer.periodic(const Duration(seconds: 1), (timer) {
  //     setState(() {
  //       if (_timerScanningLength > 0) {
  //         _timerScanningLength --;
  //       } else {
  //         _stopScanning();
  //         _timerScanning?.cancel();
  //       }
  //     });
  //   });
  // }

  void _stopScanning() {
    _scanStream?.cancel();
    setState(() {
      _isScanning = false; 
    });
    // _timerScanning?.cancel();
  }

  void _connectDeviceAndNavigate(String deviceId) async {
    _connectionStream = flutterReactiveBle.connectToDevice(id: deviceId).listen((ConnectionStateUpdate state) {
        _deviceConnectionController.add(state);
        if (state.connectionState == DeviceConnectionState.connected) {
          characteristicToReceiveData = QualifiedCharacteristic(
            serviceId: uartUUID, 
            characteristicId: uartTX, 
            deviceId: deviceId
          );
          deviceConnected = devices.firstWhere((device) => device.id == deviceId);
          showDialogStateConnectionBluetooth(state);
          _stopScanning();
        } else {
          print("not connected");
        }
      },
      onError: (Object e) =>
        print('Connecting to device $deviceId resulted in error $e'),
    );
  }

  void _disconnectDevice(String deviceId) async {
    try {
      await _connectionStream?.cancel();
    } on Exception catch (e, _) {
      print("Error disconnecting from a device: $e");
    } finally {
      _deviceConnectionController.add(
        ConnectionStateUpdate(
          deviceId: deviceId,
          connectionState: DeviceConnectionState.disconnected,
          failure: null,
        ),
      );
      setState(() {
        deviceConnected = null;
      });
    }
  }

  showDialogStateConnectionBluetooth(ConnectionStateUpdate state) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          title: const Center(child: Text("fmECG thông báo")),
          content: state.connectionState == DeviceConnectionState.connected ? 
            const Text("Bạn đã kết nối thành công!", textAlign: TextAlign.center) : const Text("Bạn đã kết nối chưa thành công!"),
          actions: [
            Center(
              child: ElevatedButton(
                child: const Text('Tiến hành đo'),
                onPressed: () async {
                  Navigator.pop(context);
                  await _navigateToChart();
                },
              ),
            ),
          ],
        );
      }
    );
  }

  _navigateToChart() async {
    bool isAccessFiles = await _requestManageStorage();
    _scanStream?.cancel();
    if (isAccessFiles) {
      FilesManagement.createDirectoryFirstTimeWithDevice();
      final File fileToSave = await FilesManagement.setUpFileToSaveDataMeasurement();
      Navigator.push(context, MaterialPageRoute(
        builder:(context) => BleLiveChartTest(
          deviceConnected: deviceConnected!,
          fileToSave: fileToSave,
          bluetoothCharacteristic: characteristicToReceiveData,
        )
      ));
    } else {
      print('phone does not grant permission');
    }
  }

  Future<bool> _requestManageStorage() async {
    final PermissionStatus status = await Permission.manageExternalStorage.request();  
    if (status == PermissionStatus.granted) {
      return true;
    } else {
      return false;
    }
  }

  @override
  void dispose() {
    _scanStream?.cancel();
    _deviceScanningController.close();
    _deviceConnectionController.close();
    // _timerScanning?.cancel();
    super.dispose();
  }

  Widget rowDeviceBluetooth(DiscoveredDevice device) {
    return StreamBuilder<ConnectionStateUpdate>(
      stream: deviceConnectionStream,
      builder: (context, snapshot) {
        bool isDeviceConnected = snapshot.hasData && 
          snapshot.data?.connectionState == DeviceConnectionState.connected && 
          device.id == deviceConnected?.id;
        return Container(
          margin: const EdgeInsets.only(bottom: 8),
          child: Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(6), 
                      bottomLeft: Radius.circular(6)
                    ),
                    color: ColorConstant.primary
                  ),
                  child: Text(
                    device.name.isNotEmpty ? device.name : device.id,
                    maxLines: 1,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      overflow: TextOverflow.ellipsis
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: InkWell(
                  onTap: () {
                    _connectDeviceAndNavigate(device.id); 
                  },
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.only(
                        topRight: Radius.circular(6), 
                        bottomRight: Radius.circular(6)
                      ),
                      color: ColorConstant.quaternary
                    ),
                    child: isDeviceConnected ? const Text(
                      "Đã kết nối",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    ): const Text(
                      "Kết nối",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    )
                  )
                )
              ),
              if (isDeviceConnected)
              InkWell(
                onTap: () async {
                  await _navigateToChart();
                },
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topRight: Radius.circular(6), 
                      bottomRight: Radius.circular(6)
                    ),
                    color: Colors.green
                  ),
                  child: const Text(
                    "Đo",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  )
                ),
              )
            ],
          ),
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Text('fmECG', 
              style: TextStyle(
                fontSize: 28,
                color: ColorConstant.quaternary,
                fontWeight: FontWeight.w500
              )
            ),
            const SizedBox(height: 5),
            Text('Hãy kết nối điện thoại của bạn',
              style: TextStyle(
                fontSize: 15,
                color: Colors.grey[700]
              )
            ),
            Text('với thiết bị thông qua Bluetooth',
              style: TextStyle(
                fontSize: 15,
                color: Colors.grey[700]
              )
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
              ElevatedButton(onPressed: _startScanning, child: const Text('Tìm kiếm')),
              ElevatedButton(onPressed: _stopScanning, child: const Text('Dừng')),
              ElevatedButton(onPressed: deviceConnected != null ? () => _disconnectDevice(deviceConnected!.id) : null, 
                child: const Text('Ngắt kết nối')
              ),
            ]),

            const SizedBox(height: 10),

            Container(
              height: screenHeight - 270,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
                color: ColorConstant.description
              ),
              child: Align(
                alignment: Alignment.bottomCenter,
                child: Column(
                  children: [
                    Text('Các thiết bị khả dụng',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: ColorConstant.quaternary
                      )
                    ),
                    if(devices.isNotEmpty)
                    Expanded(
                      child: StreamBuilder(
                        stream: deviceScanningStream,
                        builder: (contextDeviceStream, snapshot) {
                          return ListView.builder(
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            shrinkWrap: true,
                            itemCount: devices.length,
                            itemBuilder: (contextListView, index) {
                              return rowDeviceBluetooth(devices[index]);
                            }
                          );
                        },
                      ),
                    )
                  ],
                ),
              ),
            ),

            Container(
              height: screenHeight * 0.1,
              alignment: Alignment.center,
              child: _isScanning ? const Column(children: [
                Text("Đang quét để tìm kiếm thiết bị"),
                CircularProgressIndicator(),
              ]) : 
              Text("Bên trên là các thiết bị được tìm thấy",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  color: ColorConstant.quaternary
                )
              )
            )
          ],
        ),
      )
    );
  }
}