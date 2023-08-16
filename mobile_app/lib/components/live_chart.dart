import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class LiveChartSample extends StatefulWidget {
  const LiveChartSample({Key? key, required this.fileToSave}) : super(key: key);
  final File fileToSave;

  @override
  State<LiveChartSample> createState() => _LiveChartSampleState();
}

class _LiveChartSampleState extends State<LiveChartSample> {
  _LiveChartSampleState() {
    timer =
        Timer.periodic(const Duration(milliseconds: 50), _updateDataSource);
  }

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
              final DateTime stopTime = DateTime.now();            
              final SharedPreferences preferences = await SharedPreferences.getInstance();
              final Map userDataDecoded = json.decode((preferences.getString('userData') ?? ""));

              if (userDataDecoded["roleId"] == -1 || userDataDecoded["token"] == "") {
                return Utils.showDialogLoginRequirement(context);
              }

              final int userId = userDataDecoded["userId"] ?? 0;
              final int deviceId = 2;
              final String startTimeAsTimeStamp = widget.fileToSave.path.split("/").last.split('.').first;
              final DateTime startTime = DateTime.fromMillisecondsSinceEpoch(int.parse(startTimeAsTimeStamp));

              final Map fileUploadInformation = {
                "filePath": widget.fileToSave.path,
                "userId": userId.toString(),
                "deviceId": deviceId,
                "startTime": startTime,
                "stopTime": stopTime,
              };
              Future.delayed(Duration(milliseconds: 500), () {
                ECGRecordController.uploadFileToDB(fileUploadInformation);
              });
              print('gndf:$samples');
              FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);
            }, 
            child: Text('End measurement')
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
          color: Color(0XFF7BB4EA),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          // animationDuration: 0,
        ),
      ],
    );
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(Timer timer) {
    // List<int> fakeRows = List.generate(239, (_) => _getRandomInt(0, 255));
    // fakeRows[9] = 228;
    // final List packetHandled = ECGDataController.handlePacketData(fakeRows);
    // samples = samples + packetHandled;
    // List dataShowOnChart = [];

    // for (int i = 0; i < packetHandled.length; i ++) {
    //   List dataChannel = packetHandled[i].sublist(1, 5);
    //   dataShowOnChart = ECGDataController.calculateDataPointToShow(dataChannel);
    // }
    // chartData!.add(_ChartData(count, dataShowOnChart[0]));
    
     List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    List<dynamic> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    samples = samples + [dataChannelsToSave];
    List<dynamic> dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    _ChartData newData = _ChartData(count, dataChannelsToShowOnChart[0]);
    chartData!.add(newData);

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