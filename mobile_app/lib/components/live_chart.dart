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
  const LiveChartSample({Key? key, required this.fileToSave, this.callBackToPreview}) : super(key: key);
  final File fileToSave;
  final VoidCallback? callBackToPreview;

  @override
  State<LiveChartSample> createState() => _LiveChartSampleState();
}

class _LiveChartSampleState extends State<LiveChartSample> {

  Timer? timer;
  List<_ChartData> chartDataPPG = [];
  List<_ChartData> chartDataPCG = [];
  late int count;
  ChartSeriesController? _chartSeriesControllerPPG;
  ChartSeriesController? _chartSeriesControllerPCG;
  List samples = [];

  bool isButtonEndMeasurement = true;

  @override
  void initState() {
    super.initState();
    count = 0;
    _startUpdateData();
  }

  @override
  void dispose() {
    super.dispose();
    timer?.cancel();
    _clearChartData();
  }

  _clearChartData() {
    chartDataPPG.clear();
    chartDataPCG.clear();
    _chartSeriesControllerPPG = null;
    _chartSeriesControllerPCG = null;
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
    FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);
    Future.delayed(const Duration(milliseconds: 500), () {
      ECGRecordController.uploadFileToDB(fileUploadInformation);
    });

    setState(() {
      _clearChartData();
      isButtonEndMeasurement = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 220, // Đặt chiều cao nhỏ hơn cho biểu đồ thứ nhất
          width: 500, // Đặt chiều rộng nhỏ hơn cho biểu đồ thứ nhất
          child: _buildLiveLineChart(),
        ),
        Container(
          height: 220, // Đặt chiều cao nhỏ hơn cho biểu đồ thứ hai
          width: 500, // Đặt chiều rộng nhỏ hơn cho biểu đồ thứ hai
          child: _buildLiveLineChart1(),
        ),
        Align(
          alignment: Alignment.center,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              ElevatedButton(
                onPressed: () {
                  if (widget.callBackToPreview != null) {
                    widget.callBackToPreview!.call();
                  }
                }, 
                child: const Text('Back to Preview')
              ),
              ElevatedButton(
                onPressed: () async {
                  if (isButtonEndMeasurement) {
                    await _saveDataAndSendToServer();
                  } else {
                    setState(() {
                      _startUpdateData();
                      isButtonEndMeasurement = true;
                    });
                  }
              }, 
              child: Text(!isButtonEndMeasurement ? "Start Demo Chart" : "End Measurement")
        ),
            ],
          ),
      )]
    );
  }

  SfCartesianChart _buildLiveLineChart() {
    return SfCartesianChart(
      // title: ChartTitle(
      //   text: "BIỂU ĐỒ HUYẾT ÁP REAL-TIME",
      //   alignment: ChartAlignment.center,
      // ),
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
            _chartSeriesControllerPPG = controller;
          },
          legendItemText: "PPG",
          dataSource: chartDataPPG,
          color: Color(0XFF7BB4EA),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          // animationDuration: 0,
        ),
      ],
    );
  }
  SfCartesianChart _buildLiveLineChart1() {
    return SfCartesianChart(
      title: ChartTitle(
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
            _chartSeriesControllerPCG = controller;
          },
          legendItemText: "PCG",
          dataSource: chartDataPCG,
          color: Color(0xFFE11239),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          // animationDuration: 0,
        ),
      ],
    );
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(Timer timer) {
    /// DATA KIEU MOI
    /// 
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

    /// DATA KIỂU CŨ CỦA ANH TÀI
    /// 
    List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    List dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);

    _ChartData newDataPPG = _ChartData(count, dataChannelsToShowOnChart[0]);
    chartDataPPG.add(newDataPPG);

    _ChartData newDataPCG = _ChartData(count, dataChannelsToShowOnChart[1]);
    chartDataPCG.add(newDataPCG);

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

    if (chartDataPCG.length >= 20) {
      chartDataPCG.removeAt(0);
      _chartSeriesControllerPCG?.updateDataSource(
        addedDataIndexes: <int>[chartDataPCG.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesControllerPCG?.updateDataSource(
        addedDataIndexes: <int>[chartDataPCG.length - 1],
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