import 'dart:async';
import 'dart:io';
import 'dart:math' as math;

import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:flutter/material.dart';
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
        Timer.periodic(const Duration(milliseconds: 100), _updateDataSource);
  }

  Timer? timer;
  List<_ChartData>? chartData;
  List<_ChartData>? chartData2;
  List<_ChartData>? chartData3;
  late int count;
  ChartSeriesController? _chartSeriesController;
  ChartSeriesController? _chartSeriesController2;
  ChartSeriesController? _chartSeriesController3;

  @override
  void dispose() {
    timer?.cancel();
    chartData!.clear();
    chartData2!.clear();
    chartData3!.clear();
    _chartSeriesController = null;
    _chartSeriesController2 = null;
    _chartSeriesController3 = null;

    super.dispose();
  }

  @override
  void initState() {
    count = 19;
    chartData = <_ChartData>[
      _ChartData(0, 42),
      _ChartData(1, 47),
      _ChartData(2, 33),
      _ChartData(3, 49),
      _ChartData(4, 54),
      _ChartData(5, 41),
      _ChartData(6, 58),
      _ChartData(7, 51),
      _ChartData(8, 98),
      _ChartData(9, 41),
      _ChartData(10, 53),
      _ChartData(11, 72),
      _ChartData(12, 86),
      _ChartData(13, 52),
      _ChartData(14, 94),
      _ChartData(15, 92),
      _ChartData(16, 86),
      _ChartData(17, 72),
      _ChartData(18, 94),
    ];
    chartData2 = <_ChartData>[
      _ChartData(0, 42),
      _ChartData(1, 47),
      _ChartData(2, 33),
      _ChartData(3, 49),
      _ChartData(4, 54),
      _ChartData(5, 41),
      _ChartData(6, 58),
      _ChartData(7, 51),
      _ChartData(8, 98),
      _ChartData(9, 41),
      _ChartData(10, 53),
      _ChartData(11, 72),
      _ChartData(12, 86),
      _ChartData(13, 52),
      _ChartData(14, 94),
      _ChartData(15, 92),
      _ChartData(16, 86),
      _ChartData(17, 72),
      _ChartData(18, 94),
    ];
    chartData3 = <_ChartData>[
      _ChartData(0, 42),
      _ChartData(1, 47),
      _ChartData(2, 33),
      _ChartData(3, 49),
      _ChartData(4, 54),
      _ChartData(5, 41),
      _ChartData(6, 58),
      _ChartData(7, 51),
      _ChartData(8, 98),
      _ChartData(9, 41),
      _ChartData(10, 53),
      _ChartData(11, 72),
      _ChartData(12, 86),
      _ChartData(13, 52),
      _ChartData(14, 94),
      _ChartData(15, 92),
      _ChartData(16, 86),
      _ChartData(17, 72),
      _ChartData(18, 94),
    ];
    // _updateDataSource();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return _buildLiveLineChart();
  }

  /// Returns the realtime Cartesian line chart.
  SfCartesianChart _buildLiveLineChart() {
    return SfCartesianChart(
      title: ChartTitle(
        text: "Heart Rate Real-time",
        alignment: ChartAlignment.center,
      ),
      enableAxisAnimation: true,
      // plotAreaBackgroundColor: Color(0XFF006A89),
      plotAreaBorderWidth: 0,
      primaryXAxis: NumericAxis(
        zoomPosition: 0.3,
        // majorGridLines: MajorGridLines(
        //   color: Colors.red,
        // ),
        // minorGridLines: MinorGridLines(
        //   color: Colors.red,
        // ),
        edgeLabelPlacement: EdgeLabelPlacement.shift
      ),
      primaryYAxis: NumericAxis(
          // axisLine: const AxisLine(width: 0),
        edgeLabelPlacement: EdgeLabelPlacement.shift,
        majorGridLines: const MajorGridLines(width: 1)),
      legend: Legend(
        isVisible: true,
        isResponsive: true,
        position: LegendPosition.top
      ),
      series:[
        FastLineSeries(
          onRendererCreated: (ChartSeriesController controller) {
            _chartSeriesController = controller;
          },
          legendItemText: "Mother",
          dataSource: chartData!,
          color: Color(0XFF7BB4EA),
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          animationDuration: 0,
        ),
        LineSeries(
          onRendererCreated: (ChartSeriesController controller) {
            _chartSeriesController3 = controller;
          },
          dataSource: chartData3!,
          legendItemText: "Fetus",
          color: Colors.green,
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          animationDuration: 0,
        ),
        LineSeries(
          onRendererCreated: (ChartSeriesController controller) {
            _chartSeriesController2 = controller;
          },
          dataSource: chartData2!,
          color: Colors.red,
          legendItemText: "Combination",
          xValueMapper: (_ChartData sales, _) => sales.country,
          yValueMapper: (_ChartData sales, _) => sales.sales,
          animationDuration: 0,
          markerSettings: MarkerSettings(
            // isVisible: true,
          ),
        ),
        
      ],
    );
  }

  ///Continously updating the data source based on timer
  void _updateDataSource(Timer timer) {
    // List<int> fakeRows = List.generate(16, (_) => _getRandomInt(1, 244));
    // List<double> dataChannelsToSave = ECGDataController.handleDataRowFromBluetooth(fakeRows);
    // List<double> dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(dataChannelsToSave);
    _ChartData newData = _ChartData(count, _getRandomInt(2, 99));
    _ChartData newData2 = _ChartData(count, _getRandomInt(1,90));
    _ChartData newData3 = _ChartData(count, _getRandomInt(1, 99));
    chartData!.add(newData);
    chartData2!.add(newData2);
    chartData3!.add(newData3);
    if (chartData!.length >= 20) {
      // print('go heree');
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

    if (chartData2!.length == 20) {
      // print('go heree');
      chartData2!.removeAt(0);
      _chartSeriesController2?.updateDataSource(
        addedDataIndexes: <int>[chartData2!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController2?.updateDataSource(
        addedDataIndexes: <int>[chartData2!.length - 1],
      );
    }

    if (chartData3!.length == 20) {
      // print('go heree');
      chartData3!.removeAt(0);
      _chartSeriesController3?.updateDataSource(
        addedDataIndexes: <int>[chartData3!.length - 1],
        removedDataIndexes: <int>[0],
      );
    } else {
      _chartSeriesController3?.updateDataSource(
        addedDataIndexes: <int>[chartData3!.length - 1],
      );
    }
    count = count + 1;
    // FilesManagement.appendDataToFile(widget.fileToSave, dataChannelsToSave);
  }

  ///Get the random data
  int _getRandomInt(int min, int max) {
    final math.Random random = math.Random();
    return min + random.nextInt(max - min);
  }

  double _calculateSineValue(int x) {
    // Calculate the sine value for the given x value
    // You can adjust the frequency, amplitude, and other parameters as needed
    return 100 * (1 + math.sin(x / 10));
  }
}

/// Private calss for storing the chart series data points.
class _ChartData {
  _ChartData(this.country, this.sales);
  final int country;
  final int sales;
}