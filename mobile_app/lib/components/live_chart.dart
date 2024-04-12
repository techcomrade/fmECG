import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
  static const platform = MethodChannel("com.example.method_channel/java");

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
    await FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);

    Future.delayed(const Duration(milliseconds: 500), () {
      ECGRecordController.uploadFileToDB(fileUploadInformation);
    });

    final bytesInFile = await widget.fileToSave.readAsBytes();
    print('zzz:$bytesInFile');
    // final data = await platform.invokeMethod('helloWorldPython', {'bytes': bytesInFile});

    setState(() {
      _clearChartData();
      isButtonEndMeasurement = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 220, // Đặt chiều cao nhỏ hơn cho biểu đồ thứ nhất
          width: 500, // Đặt chiều rộng nhỏ hơn cho biểu đồ thứ nhất
          child: _buildLiveLineChart(),
        ),
        SizedBox(
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
                child: const Text('Quay lại')
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
              child: Text(!isButtonEndMeasurement ? "Start Demo Chart" : "Kết thúc đo")
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
          color: const Color(0XFF7BB4EA),
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
          color: const Color(0xFFE11239),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          // animationDuration: 0,
        ),
      ],
    );
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(Timer timer) {

    List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    print("Dữ liệu mẫu giả: $fakeRows");
    List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    print("Dữ liệu sau khi chia (test): $dataChannelsToSave");
    List dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    print("Dữ liệu sau khi xử lý (test): $dataChannelsToShowOnChart");
    // chartDataPPG.add(newDataPPG);
    print("Dữ liệu sau khi xử lý (test): ${dataChannelsToShowOnChart[0]}");
    // chartDataPCG.add(newDataPCG);
    print("Dữ liệu sau khi xử lý (test): ${dataChannelsToShowOnChart[1]}");
    // 0 is fake data
    samples.add([0,	0, 0, 0, 0, 0, ...dataChannelsToSave]);

    _ChartData newDataPPG = _ChartData(count % 100, (dataChannelsToShowOnChart[0]).round().toDouble()); // Sử dụng % để bắt đầu lại từ 0 sau mỗi 20 điểm
    _ChartData newDataPCG = _ChartData(count % 100, (dataChannelsToShowOnChart[1]).round().toDouble());

    // Nếu đã có đủ 20 điểm dữ liệu, cập nhật điểm dữ liệu thay vì thêm mới
    if (chartDataPPG.length == 100) {
      chartDataPPG[count % 100] = newDataPPG; // Thay thế điểm dữ liệu cũ
      chartDataPCG[count % 100] = newDataPCG;

      _chartSeriesControllerPPG?.updateDataSource(
        updatedDataIndexes: <int>[count % 100], // Chỉ cập nhật điểm dữ liệu cụ thể
      );
      _chartSeriesControllerPCG?.updateDataSource(
        updatedDataIndexes: <int>[count % 100],
      );
    } else {
      chartDataPPG.add(newDataPPG);
      chartDataPCG.add(newDataPCG);

      _chartSeriesControllerPPG?.updateDataSource(
        addedDataIndexes: <int>[chartDataPPG.length - 1],
      );
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