import 'dart:io';
import 'dart:async';
import 'dart:math' as math;
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class ChartScreenTest extends StatefulWidget {
  const ChartScreenTest({Key? key, required this.connectedDevice}) : super(key: key);

  final BluetoothDevice connectedDevice;

  @override
  State<ChartScreenTest> createState() => _ChartScreenTestState();
}

class _ChartScreenTestState extends State<ChartScreenTest> {
  static const String SERVICE_UUID_STETHOO1 = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  static const String CHARACTERISTIC_UUID_STETHO01 = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
  BluetoothCharacteristic? charac;
  bool isCreatedFile = false;
  File? fileToSave;

  @override
  void initState() {
    super.initState();
  }

  // checkServicesAndCharacteristic(BluetoothDevice connectedDevice) async {
  //   await connectedDevice.connect();
  //   print('go');
  //   final List<BluetoothService> services = await connectedDevice.discoverServices();
  //   if (services.isEmpty) {
  //     print('nothing to do');
  //     return null;
  //   }
  //   print('pass');
  //   final int indexServiceNeedConnecting = services.indexWhere((service) => service.uuid.toString() == SERVICE_UUID_STETHOO1);
  //   if (indexServiceNeedConnecting != -1) {
  //     final int indexCharacteristicNeedConnecting = services[indexServiceNeedConnecting].characteristics
  //                                                     .indexWhere((characteristic) => characteristic.uuid.toString() == CHARACTERISTIC_UUID_STETHO01);
  //     if (indexCharacteristicNeedConnecting != -1) {
  //       charac = services[indexServiceNeedConnecting].characteristics[indexCharacteristicNeedConnecting];
  //       print('characcc:$charac');
  //     }
  //     else {
  //       print('not found charac');
  //       return null;
  //     }
  //   } else {
  //       print('not found services');
  //     return null;
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.connectedDevice.name),
        actions: <Widget>[
          StreamBuilder<BluetoothDeviceState>(
            stream: widget.connectedDevice.state,
            initialData: BluetoothDeviceState.connecting,
            builder: (c, snapshot) {
              VoidCallback? onPressed;
              String text;
              switch (snapshot.data) {
                case BluetoothDeviceState.connected:
                  onPressed = () => widget.connectedDevice.disconnect();
                  text = 'DISCONNECT';
                  break;
                case BluetoothDeviceState.disconnected:
                  onPressed = () => widget.connectedDevice.connect();
                  text = 'CONNECT';
                  break;
                default:
                  onPressed = null;
                  text = snapshot.data.toString().substring(21).toUpperCase();
                  break;
              }
              return TextButton(
                  onPressed: onPressed,
                  child: Text(
                    text,
                    style: TextStyle(
                      color: Colors.red
                    ),
                  ));
            },
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[

            // status device
            StreamBuilder<BluetoothDeviceState>(
              stream: widget.connectedDevice.state,
              initialData: BluetoothDeviceState.connecting,
              builder: (c, snapshot) { 
                return ListTile(
                leading: (snapshot.data == BluetoothDeviceState.connected)
                    ? Icon(Icons.bluetooth_connected)
                    : Icon(Icons.bluetooth_disabled),
                title: Text(
                    'Device is ${snapshot.data.toString().split('.')[1]}.'),
                subtitle: Text('${widget.connectedDevice.id}'),
                trailing: StreamBuilder<bool>(
                  stream: widget.connectedDevice.isDiscoveringServices,
                  initialData: false,
                  builder: (c, snapshot) => IndexedStack(
                    index: snapshot.data! ? 1 : 0,
                    children: <Widget>[
                      IconButton(
                        // discover services => sang streambuilder khac
                        icon: Icon(Icons.refresh),
                        onPressed: () => widget.connectedDevice.discoverServices(),
                      ),
                      IconButton(
                        icon: SizedBox(
                          child: CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation(Colors.grey),
                          ),
                          width: 18.0,
                          height: 18.0,
                        ),
                        onPressed: null,
                      )
                    ],
                  ),
                ),
              );
              },
            ),

            StreamBuilder<List<BluetoothService>>(
              stream: widget.connectedDevice.services,
              initialData: [],
              builder: (c, snapshot) {
                final serviceNeed = snapshot.data!.firstWhere((service) => service.uuid.toString() == SERVICE_UUID_STETHOO1);
                final characteristicNeed = serviceNeed.characteristics.firstWhere((characteristic) => characteristic.uuid.toString() == CHARACTERISTIC_UUID_STETHO01);
                return LiveChartTest(bluetoothCharacteristic: characteristicNeed);
              },
            ),
          ],
        ),
      ),
    );
  }
}

class LiveChartTest extends StatefulWidget {
  const LiveChartTest({Key? key, required this.bluetoothCharacteristic}) : super(key: key);
  final BluetoothCharacteristic bluetoothCharacteristic;

  @override
  State<LiveChartTest> createState() => _LiveChartTestState();
}

class _LiveChartTestState extends State<LiveChartTest> {
  Timer? timer;
  List<_ChartData>? chartData;
  late int count;
  ChartSeriesController? _chartSeriesController;

  @override
  void dispose() {
    timer?.cancel();
    chartData!.clear();
    _chartSeriesController = null;
    super.dispose();
  }

  @override
  void initState() {
    count = 0;
    chartData = <_ChartData>[];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<int>>(
      stream: widget.bluetoothCharacteristic.value,
      initialData: widget.bluetoothCharacteristic.lastValue,
      builder: (c, snapshot) {
        final value = snapshot.data;
        _updateDataSource(value);
        return Column(                  
          children: [
            IconButton(
              icon: Icon(PhosphorIcons.bold.alarm),
              onPressed: () async {
                await widget.bluetoothCharacteristic.setNotifyValue(!widget.bluetoothCharacteristic.isNotifying);
                await widget.bluetoothCharacteristic.read();
                // if (!isCreatedFile) {
                //   FilesManagement.createDirectoryFirstTimeWithDevice();
                //   fileToSave = await FilesManagement.setUpFileToSaveDataMeasurement();
                //   isCreatedFile = true;
                // }
              },
            ),
            value != null ? _buildLiveLineChart() : Container()
          ]
        );
      },
    );
  }

  /// Returns the realtime Cartesian line chart.
  SfCartesianChart _buildLiveLineChart() {
    print('buildd');
    return SfCartesianChart(
        plotAreaBorderWidth: 0,
        primaryXAxis:
            NumericAxis(majorGridLines: const MajorGridLines(width: 0)),
        primaryYAxis: NumericAxis(
            axisLine: const AxisLine(width: 0),
            majorTickLines: const MajorTickLines(size: 0)),
        series: <LineSeries<_ChartData, int>>[
          LineSeries<_ChartData, int>(
            onRendererCreated: (ChartSeriesController controller) {
              _chartSeriesController = controller;
            },
            dataSource: chartData!,
            color: Color.fromARGB(255, 42, 25, 228),
            xValueMapper: (_ChartData sales, _) => sales.country,
            yValueMapper: (_ChartData sales, _) => sales.sales,
            animationDuration: 0,
          )
        ]);
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(bytes) {
    List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(bytes);
    print('1');
    List<double> dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    print('2gdskjgs:${dataChannelsToShowOnChart[0]}');
    _ChartData newData = _ChartData(count, dataChannelsToShowOnChart[0]);
    chartData!.add(newData);

    if (chartData!.length == 100) {
      chartData!.removeAt(0);
      _chartSeriesController?.updateDataSource(
        addedDataIndexes: <int>[chartData!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController?.updateDataSource(
        addedDataIndexes: <int>[chartData!.length - 1],
      );
    }
    count = count + 1;
  }

  ///Get the random data
  int _getRandomInt(int min, int max) {
    final math.Random random = math.Random();
    return min + random.nextInt(max - min);
  }
}

/// Private calss for storing the chart series data points.
class _ChartData {
  _ChartData(this.country, this.sales);
  final int country;
  final double sales;
}