import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math; 
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class BleLiveChartTest extends StatefulWidget {
  const BleLiveChartTest({
    Key? key, 
    required this.bluetoothCharacteristic, 
    required this.fileToSave
  }) : super(key: key);

  final QualifiedCharacteristic bluetoothCharacteristic;
  final File fileToSave;

  @override
  State<BleLiveChartTest> createState() => _BleLiveChartTestState();
}

class _BleLiveChartTestState extends State<BleLiveChartTest> {
  final flutterReactiveBle = FlutterReactiveBle();
  Timer? timer;
  List<_ChartData>? chartData;
  late int count;
  ChartSeriesController? _chartSeriesController;

  late StreamSubscription<List<int>> subscribeStream;
  late StreamController<List<int>> _dataStreamController;
  Stream<List<int>> get _dataStream => _dataStreamController.stream;

  @override
  void initState() {
    count = 0;
    chartData = <_ChartData>[];
    _dataStreamController = StreamController<List<int>>.broadcast();
    super.initState();
  }

  @override
  void dispose() {
    chartData!.clear();
    _chartSeriesController = null;
    subscribeStream.cancel();
    _dataStreamController.close();
    
    super.dispose();
  }

  subscribeCharacteristic() {
    subscribeStream =
      flutterReactiveBle.subscribeToCharacteristic(widget.bluetoothCharacteristic).listen((value) {
        _updateDataSource(value);
        FilesManagement.appendDataToFile(widget.fileToSave, value);
        print('dataaa:$value');
        _dataStreamController.add(value);
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
            onPressed: () => subscribeCharacteristic(),
            child: const Text('Subscribe'),
          ),
          StreamBuilder<List<int>>(
            stream: _dataStream,
            builder: (context, snapshot) {
              print('a:${snapshot.data}');
              return _buildLiveLineChart();
            }
          ),
          Align(
            alignment: Alignment.center,
            child: ElevatedButton(
              onPressed: () async {
                _chartSeriesController = null;
                subscribeStream.cancel();
                _dataStreamController.close();
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
                  "userId": userId,
                  "deviceId": deviceId,
                  "startTime": startTime,
                  "stopTime": stopTime,
                };
                // Future.delayed(Duration(milliseconds: 500), () {
                //   ECGFilesController.uploadFileToDB(fileUploadInformation);
                // });
              }, 
              child: Text('End measurement')
            ),
          )
        ],
      ),
    );
  }

  /// Returns the realtime Cartesian line chart.
  SfCartesianChart _buildLiveLineChart() => SfCartesianChart(
        title: ChartTitle(
        text: "Heart Rate Real-time",
        alignment: ChartAlignment.center,
      ),
      // enableAxisAnimation: true,
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
      enableAxisAnimation: true,
      series: [
        FastLineSeries<_ChartData, int>(
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

  ///Continously updating the data source based on timer
  void _updateDataSource(List<int> bytes) {
    // List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(bytes);
    List<double> dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    _ChartData newData = _ChartData(count, dataChannelsToShowOnChart[0]);
    chartData!.add(newData);

    if (chartData!.length >= 50) {
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