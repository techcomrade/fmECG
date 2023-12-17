import 'dart:async';
import 'dart:io';
import 'dart:math' as math;

import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class LiveChartSample extends StatefulWidget {
  const LiveChartSample({Key? key, required this.fileToSave}) : super(key: key);
  final File fileToSave;

  @override
  State<LiveChartSample> createState() => _LiveChartSampleState();
}

class _LiveChartSampleState extends State<LiveChartSample> {
  static const platform = MethodChannel("com.example.method_channel/java");

  Timer? timer;
  List<_ChartData>? chartData;
  late int count;
  ChartSeriesController? _chartSeriesController;
  List samples = [];

  @override
  void initState() {
    count = 0;
    chartData = <_ChartData>[];
    super.initState();
  }

  @override
  void dispose() {
    timer?.cancel();
    chartData!.clear();
    _chartSeriesController = null;
    super.dispose();
    samples = [];
    count = 0;
  }

  _startUpdateData() {
    timer = Timer.periodic(const Duration(milliseconds: 100), _updateDataSource);
  }

  _saveDataAndSendToServer() async {
    timer?.cancel();
    _chartSeriesControllerPCG = null;
    _chartSeriesControllerPPG = null;
    final DateTime stopTime = DateTime.now();            
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    final Map userDataDecoded = json.decode((preferences.getString('userData') ?? ""));

    if (userDataDecoded["roleId"] == -1 || userDataDecoded["token"] == "") {
      return Utils.showDialogLoginRequirement(context);
    }

    final int userId = userDataDecoded["userId"] ?? 0;
    const int deviceId = 2;
    final String startTimeAsTimeStamp = widget.fileToSave.path.split("/").last.split('.').first;
    final DateTime startTime = DateTime.fromMillisecondsSinceEpoch(int.parse(startTimeAsTimeStamp));

    final Map fileUploadInformation = {
      "filePath": widget.fileToSave.path,
      "userId": userId,
      "deviceId": deviceId,
      "startTime": startTime,
      "stopTime": stopTime,
    };

    // send files to db
    await FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);

    Future.delayed(const Duration(milliseconds: 500), () {
      ECGRecordController.uploadFileToDB(fileUploadInformation);
    });

    final bytesInFile = await widget.fileToSave.readAsBytes();
    print('zzz:$bytesInFile');
    final data = await platform.invokeMethod('helloWorldPython', {'bytes': bytesInFile});

    setState(() {
      _clearChartData();
      isButtonEndMeasurement = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildLiveLineChart(),
        Align(
          alignment: Alignment.center,
          child: ElevatedButton(
            onPressed: () async {
              timer?.cancel();
              _chartSeriesController = null;
              // final DateTime stopTime = DateTime.now();            
              // final SharedPreferences preferences = await SharedPreferences.getInstance();
              // final Map userDataDecoded = json.decode((preferences.getString('userData') ?? ""));

              // if (userDataDecoded["roleId"] == -1 || userDataDecoded["token"] == "") {
              //   return Utils.showDialogLoginRequirement(context);
              // }

              // final int userId = userDataDecoded["userId"] ?? 0;
              // final int deviceId = 2;
              // final String startTimeAsTimeStamp = widget.fileToSave.path.split("/").last.split('.').first;
              // final DateTime startTime = DateTime.fromMillisecondsSinceEpoch(int.parse(startTimeAsTimeStamp));

              // final Map fileUploadInformation = {
              //   "filePath": widget.fileToSave.path,
              //   "userId": userId,
              //   "deviceId": deviceId,
              //   "startTime": startTime,
              //   "stopTime": stopTime,
              // };
              // Future.delayed(Duration(milliseconds: 500), () {
              //   ECGRecordController.uploadFileToDB(fileUploadInformation);
              // });
              FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);
            }, 
            child: const Text('End measurement')
          ),
        )
      ]
    );
  }

  SfCartesianChart _buildLiveLineChart() {
    return SfCartesianChart(
      title: ChartTitle(
        text: "Biểu đồ nhịp tim thời gian thực",
        alignment: ChartAlignment.center,
      ),
      enableAxisAnimation: true,
      plotAreaBorderWidth: 0,
      primaryXAxis: NumericAxis(
        zoomPosition: 0.3,
        edgeLabelPlacement: EdgeLabelPlacement.shift
      ),
      primaryYAxis: NumericAxis(
        edgeLabelPlacement: EdgeLabelPlacement.shift,
        majorGridLines: const MajorGridLines(width: 1)),
      legend: Legend(
        isVisible: true,
        isResponsive: true,
        position: LegendPosition.top
      ),
      series:[
        LineSeries(
          onRendererCreated: (ChartSeriesController controller) {
            _chartSeriesController = controller;
          },
          legendItemText: "Người mẹ",
          dataSource: chartData!,
          color: const Color(0XFF7BB4EA),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          // animationDuration: 0,
        ),
      ],
    );
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(Timer timer) {
    List<int> fakeRows = List.generate(239, (_) => _getRandomInt(0, 255));
    fakeRows[9] = 228;
    final List packetHandled = ECGDataController.handlePacketData(fakeRows);
    samples = samples + packetHandled;
    List dataShowOnChart = [];

    // for (int i = 0; i < packetHandled.length; i ++) {
    //   List dataChannel = packetHandled[i].sublist(1, 5);
    //   dataShowOnChart = ECGDataController.calculateDataPointToShow(dataChannel);
    // }
    // chartData!.add(_ChartData(count, dataShowOnChart[0]));

    /// DATA KIỂU CŨ CỦA ANH TÀI
    /// 
    List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    print("Dữ liệu mẫu giả: $fakeRows");
    List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    print("Dữ liệu sau khi chia (test): $dataChannelsToSave");
    List dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    print("Dữ liệu sau khi xử lý (test): $dataChannelsToShowOnChart");
    _ChartData newDataPPG = _ChartData(count, (dataChannelsToShowOnChart[0]/10).round().toDouble());
    chartDataPPG.add(newDataPPG);
    print("Dữ liệu sau khi xử lý (test): ${dataChannelsToShowOnChart[0]}");
    _ChartData newDataPCG = _ChartData(count, (dataChannelsToShowOnChart[1]/10).round().toDouble());
    chartDataPCG.add(newDataPCG);
    print("Dữ liệu sau khi xử lý (test): ${dataChannelsToShowOnChart[1]}");
    // 0 is fake data
    samples.add([0,	0, 0, 0, 0, 0, ...dataChannelsToSave]);

    if (chartDataPPG.length >= 20) {
      chartDataPPG.removeAt(0);
      _chartSeriesControllerPPG?.updateDataSource(
        addedDataIndexes: <int>[chartDataPPG.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesControllerPPG?.updateDataSource(
        addedDataIndexes: <int>[chartDataPPG.length - 1],
      );
    }
    chartData!.add(_ChartData(count, dataShowOnChart[0]));
    // List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    // List<double> dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    // _ChartData newData = _ChartData(count, dataChannelsToShowOnChart[0]);
    // chartData!.add(newData);

    if (chartData!.length >= 20) {
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