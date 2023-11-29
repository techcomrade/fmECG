import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class BleLiveChartTest extends StatefulWidget {
  const BleLiveChartTest({
    Key? key,
    required this.bluetoothCharacteristic,
    required this.fileToSave,
    required this.deviceConnected,
  }) : super(key: key);

  final QualifiedCharacteristic bluetoothCharacteristic;
  final DiscoveredDevice deviceConnected;
  final File fileToSave;

  @override
  State<BleLiveChartTest> createState() => _BleLiveChartTestState();
}

class _BleLiveChartTestState extends State<BleLiveChartTest> {
  final flutterReactiveBle = FlutterReactiveBle();
  List<_ChartData>? chartDataChannel;
  List<_ChartData>? chartDataChannel2;
  List<_ChartData>? chartDataChannel3;
  List<_ChartData>? chartDataChannel4;
  late int count;
  ChartSeriesController? _chartSeriesController;
  ChartSeriesController? _chartSeriesController2;
  ChartSeriesController? _chartSeriesController3;
  ChartSeriesController? _chartSeriesController4;

  late StreamSubscription<List<int>> subscribeStream;
  late StreamController<List> _dataStreamController;
  Stream<List> get _dataStream => _dataStreamController.stream;
  List samples = [];
  bool isMeasuring = false;
  bool isUploaded = false;

  @override
  void initState() {
    count = 0;
    chartDataChannel = <_ChartData>[];
    chartDataChannel2 = <_ChartData>[];
    chartDataChannel3 = <_ChartData>[];
    chartDataChannel4 = <_ChartData>[];
    _dataStreamController = StreamController<List<double>>.broadcast();
    super.initState();
  }

  @override
  void dispose() {
    _clearDataInChart();
    subscribeStream.cancel();
    _dataStreamController.close();

    super.dispose();
  }

  subscribeCharacteristic() {
    subscribeStream = flutterReactiveBle
        .subscribeToCharacteristic(widget.bluetoothCharacteristic)
        .listen((value) {
      final List packetHandled = ECGDataController.handlePacketData(value);
      samples = samples + packetHandled;

      if (samples.length == 50000) {
        FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);
        samples.clear();
      }

      for (int i = 0; i < packetHandled.length; i++) {
        List dataChannel = packetHandled[i].sublist(1, 5);
        List dataShowOnChart = [];
        if (i % 10 == 0) {
          dataShowOnChart =
              ECGDataController.calculateDataPointToShow(dataChannel);
          _updateDataSource(dataShowOnChart);
        }
        _dataStreamController.add(dataShowOnChart);
      }
    });
  }

  _resetMeasuring() {
    // subscribeStream.cancel();
    // _dataStreamController.close();
    _clearDataInChart();
    samples.clear();
    FilesManagement.deleteFileRecord(widget.fileToSave);
    setState(() {
      isMeasuring = false;
    });
  }

  _handleSaveRecordInFile() async {
    final DateTime stopTime = DateTime.now();
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    final Map userDataDecoded =
        json.decode((preferences.getString('userData') ?? ""));

    if (userDataDecoded["roleId"] == -1 || userDataDecoded["token"] == "") {
      return Utils.showDialogLoginRequirement(context);
    }

    final int userId = userDataDecoded["userId"] ?? 0;
    final String deviceId = widget.deviceConnected.id;
    final String startTimeAsTimeStamp =
        widget.fileToSave.path.split("/").last.split('.').first;
    final DateTime startTime =
        DateTime.fromMillisecondsSinceEpoch(int.parse(startTimeAsTimeStamp));

    final Map fileUploadInformation = {
      "filePath": widget.fileToSave.path,
      "userId": userId,
      "deviceId": deviceId,
      "startTime": startTime,
      "stopTime": stopTime,
    };
    await FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);

    Future.delayed(const Duration(milliseconds: 500), () {
      ECGRecordController.uploadFileToDB(fileUploadInformation);
    });
  }

  _clearDataInChart() {
    chartDataChannel!.clear();
    chartDataChannel2!.clear();
    chartDataChannel3!.clear();
    chartDataChannel4!.clear();
    _chartSeriesController = null;
    _chartSeriesController2 = null;
    _chartSeriesController3 = null;
    _chartSeriesController4 = null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              icon: Icon(PhosphorIcons.regular.arrowLeft),
              onPressed: () => Navigator.pop(context)),
          title: const Text("Trang đo dữ liệu"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('RSSI: ${widget.deviceConnected.rssi}'),
            StreamBuilder<List>(
                stream: _dataStream,
                builder: (context, snapshot) {
                  return _buildLiveLineChart();
                }),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                    onPressed: () async {
                      if (isMeasuring) {
                        _resetMeasuring();
                      } else {
                        subscribeCharacteristic();
                        setState(() {
                          isMeasuring = true;
                        });
                      }
                    },
                    child: Text(isMeasuring ? 'Reset biểu đồ' : 'Bắt đầu đo')),
                ElevatedButton(
                    onPressed: samples.isEmpty
                        ? null
                        : () async {
                            await _handleSaveRecordInFile();

                            const snackBar = SnackBar(
                              content: Text('Đã lưu kết quả đo vào bộ nhớ!'),
                            );
                            ScaffoldMessenger.of(context)
                                .showSnackBar(snackBar);
                          },
                    child: const Text("Lưu kết quả đo"))
              ],
            )
          ],
        ));
  }

  /// Returns the realtime Cartesian line chart.
  SfCartesianChart _buildLiveLineChart() => SfCartesianChart(
          title: ChartTitle(
            text: "Biểu đồ đo điện tim thời gian thực",
            alignment: ChartAlignment.center,
          ),
          // plotAreaBackgroundColor: Color(0XFF006A89),
          plotAreaBorderWidth: 0,
          primaryXAxis: NumericAxis(
              zoomPosition: 0.2,
              // maximum: 400,
              interval: 50,
              // majorGridLines: MajorGridLines(
              //   color: Colors.red,
              // ),
              // minorGridLines: MinorGridLines(
              //   color: Colors.red,
              // ),
              edgeLabelPlacement: EdgeLabelPlacement.shift),
          primaryYAxis: NumericAxis(
              edgeLabelPlacement: EdgeLabelPlacement.shift,
              majorGridLines: const MajorGridLines(width: 1)),
          legend: Legend(
              isVisible: true,
              isResponsive: true,
              position: LegendPosition.top),
          enableAxisAnimation: true,
          series: [
            FastLineSeries<_ChartData, int>(
                onRendererCreated: (ChartSeriesController controller) {
                  _chartSeriesController = controller;
                },
                dataSource: chartDataChannel!,
                color: Color.fromARGB(255, 42, 25, 228),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "Kênh 1"),
            FastLineSeries<_ChartData, int>(
                onRendererCreated: (ChartSeriesController controller) {
                  _chartSeriesController2 = controller;
                },
                dataSource: chartDataChannel2!,
                color: Color.fromARGB(255, 228, 25, 25),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "Kênh 2"),
            FastLineSeries<_ChartData, int>(
                onRendererCreated: (ChartSeriesController controller) {
                  _chartSeriesController3 = controller;
                },
                dataSource: chartDataChannel3!,
                color: Color.fromARGB(255, 25, 228, 45),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "Kênh 3"),
            FastLineSeries<_ChartData, int>(
                onRendererCreated: (ChartSeriesController controller) {
                  _chartSeriesController4 = controller;
                },
                dataSource: chartDataChannel4!,
                color: Color.fromARGB(255, 214, 228, 25),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "Kênh 4")
          ]);

  ///Continously updating the data source based on timer
  void _updateDataSource(List row) {
    _ChartData newData = _ChartData(count, row[0]);
    _ChartData newData2 = _ChartData(count, row[1]);
    _ChartData newData3 = _ChartData(count, row[2]);
    _ChartData newData4 = _ChartData(count, row[3]);
    chartDataChannel!.add(newData);
    chartDataChannel2!.add(newData2);
    chartDataChannel3!.add(newData3);
    chartDataChannel4!.add(newData4);

    if (chartDataChannel!.length >= 50) {
      chartDataChannel!.removeAt(0);
      _chartSeriesController?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel!.length - 1],
      );
    }

    if (chartDataChannel2!.length >= 50) {
      chartDataChannel2!.removeAt(0);
      _chartSeriesController2?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel2!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController2?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel2!.length - 1],
      );
    }

    if (chartDataChannel3!.length >= 50) {
      chartDataChannel3!.removeAt(0);
      _chartSeriesController3?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel3!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController3?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel3!.length - 1],
      );
    }

    if (chartDataChannel4!.length >= 50) {
      chartDataChannel4!.removeAt(0);
      _chartSeriesController4?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel4!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController4?.updateDataSource(
        addedDataIndexes: <int>[chartDataChannel4!.length - 1],
      );
    }
    count = count + 1;
  }
}

/// Private calss for storing the chart series data points.
class _ChartData {
  _ChartData(this.country, this.sales);
  final int country;
  final sales;
}
