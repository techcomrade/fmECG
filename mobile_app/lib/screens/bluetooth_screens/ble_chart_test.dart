import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:telephony/telephony.dart';

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
  static const platform = MethodChannel("com.example.method_channel/java");
  
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

  final ScrollController _scrollController = ScrollController();

  Stream<List> get _dataStream => _dataStreamController.stream;
  List samples = [];
  bool isMeasuring = false;
  bool isUploaded = false;
  bool isCalculated = false;

  String _textSBP = '';
  String _textDBP = '';
  String _textHeartRate = '';
  String _textDeviation = '';

  bool isNotSetupPhoneNumber = false;

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


  _resetMeasuring() {
    // subscribeStream.cancel();
    // _dataStreamController.close();
    _clearDataInChart();
    samples.clear();
    FilesManagement.deleteFileRecord(widget.fileToSave);
    setState(() {
      isMeasuring = false;
      isCalculated = true;
    });
  }

  _handleSaveRecordInFile() async {
    subscribeStream.cancel();
    _dataStreamController.close();
    _clearDataInChart();
    // final DateTime stopTime = DateTime.now();
    // final SharedPreferences preferences = await SharedPreferences
    //     .getInstance();
    // final Map userDataDecoded = json.decode(
    //     (preferences.getString('userData') ?? ""));

    // if (userDataDecoded["roleId"] == -1 || userDataDecoded["token"] == "") {
    //   return Utils.showDialogLoginRequirement(context);
    // }

    // final int userId = userDataDecoded["userId"] ?? 0;
    // final String deviceId = widget.deviceConnected.id;
    // final String startTimeAsTimeStamp = widget.fileToSave.path
    //     .split("/")
    //     .last
    //     .split('.')
    //     .first;
    // final DateTime startTime = DateTime.fromMillisecondsSinceEpoch(
    //     int.parse(startTimeAsTimeStamp));

    // final Map fileUploadInformation = {
    //   "filePath": widget.fileToSave.path,
    //   "userId": userId,
    //   "deviceId": deviceId,
    //   "startTime": startTime,
    //   "stopTime": stopTime,
    // };
    await FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);

    // Future.delayed(const Duration(milliseconds: 500), () {
    //   ECGRecordController.uploadFileToDB(fileUploadInformation);
    // });

    setState(() {
      samples.clear();
    });

    try {
      final bytesInFile = await widget.fileToSave.readAsBytes();
      showDialog(context: context, builder: (ctxx) {
        return Dialog(
          child: Container(
            height: 90,
            child: Column(
              children: [
                const SizedBox(height: 5),
                Text('Số liệu đang được xử lý bằng Python'),
                const SizedBox(height: 10),
                CircularProgressIndicator()
              ],
            ),
          ),
        );
        });
      final data = await platform.invokeMethod('helloWorldPython', {'bytes': bytesInFile});
      Navigator.pop(context);
      if (data != null) {
        setState(() {
          isCalculated = true;
          _textSBP = data!["sbp"].toString();
          _textDBP = data!["dbp"].toString();
          _textHeartRate = data!["heart_rate"].toString();
          _textDeviation = data!["standard_deviation"].toString();
        });
        showDialog(context: context, builder: (ctxx) {
          return Dialog(
            child: Container(
              height: 200,
              child: Column(
                children: [
                  const Align(
                    alignment: Alignment.center,
                    child: Text('Dữ liệu sau khi được xử lý: ', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),)),
                  const SizedBox(height: 5),
                  Text("SBP: ${double.parse(_textSBP).round()}"),
                  Text("DBP: ${double.parse(_textDBP).round()}"),
                  Text("Heart Rate: ${double.parse(_textHeartRate).round()}"),
                  Text("Deviation: ${double.parse(_textDeviation).round()}"),
                  const SizedBox(height: 5),

                  if (int.parse(_textSBP) > 140 && int.parse(_textDBP) < 90)
                  const Text('Cần cảnh báo tới người thân!'),
                  if (isNotSetupPhoneNumber)
                  const Text("Vui lòng setup số điện thoại người thân ở trang chủ!"),
                  const SizedBox(height: 5),

                  Row(children: [
                    if (int.parse(_textSBP) > 140 && int.parse(_textDBP) < 90)
                    ElevatedButton(
                      onPressed: () async {
                        String phoneNumber = await _getPhoneNumberFromPrefs();
                        if (phoneNumber != "") {
                          final Telephony telephony = Telephony.instance;
                          String warningEmoji = "⚠️"; // Emoji cảnh báo, chỉ hoạt động nếu điện thoại hỗ trợ emoji
                          String message = "Cảnh báo $warningEmoji\nHuyết áp người thân cao:\n$_textSBP/$_textDBP so với ngưỡng 140/90";
                          await telephony.sendSms(to:phoneNumber, message: message);
                        } else {
                          setState(() {
                            isNotSetupPhoneNumber = true;
                          });
                        }
                      },
                      child: const Text("Send SMS", 
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
                    ),

                    if (int.parse(_textSBP) > 140 && int.parse(_textDBP) < 90)
                    const SizedBox(width: 8),

                    ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text("Close", 
                        style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
                    ),
                  ],)
                ],
                mainAxisAlignment: MainAxisAlignment.center,
              ),
            ),
          );
        });
      }
    } catch (e) {
      Navigator.pop(context);
      Utils.showDialogWarningError(context, false, "Lỗi khi xử lý dữ liệu với Python");
    }
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

  _getPhoneNumberFromPrefs() async {
    const String keyInit = "phone_number_warning";
    final SharedPreferences preferences = await SharedPreferences.getInstance();

    final bool isExistPhoneNumber = preferences.containsKey(keyInit);
    if (isExistPhoneNumber) {
      String phoneNumber = preferences.getString(keyInit)!;
      return phoneNumber;
    } else {
      return "";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              icon: Icon(PhosphorIcons.regular.arrowLeft),
              onPressed: () => Navigator.pop(context)
          ),
          title: const Text("Trang đo dữ liệu"),
        ),
        body: SingleChildScrollView(
          controller: _scrollController,
          physics: const ClampingScrollPhysics(),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('BIỂU ĐỒ DỮ LIỆU HUYẾT ÁP CỦA BẠN'),
              // Text('RSSI: ${widget.deviceConnected.rssi}'),
              StreamBuilder<List>(
                  stream: _dataStream,
                  builder: (context, snapshot) {
                    return _buildLiveLineChart();
                  }
              ),
              StreamBuilder<List>(
                  stream: _dataStream,
                  builder: (context, snapshot) {
                    return _buildLiveLineChart1();
                  }
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  ElevatedButton(
                      onPressed: () async {
                        if (isMeasuring) {
                          _resetMeasuring();
                        } else {
                          setState(() {
                            isMeasuring = true;
                          });
                          subscribeCharacteristic();
                        }
                      },
                      child: Text(isMeasuring ? 'Reset biểu đồ' : 'Bắt đầu đo')
                  ),
                  ElevatedButton(
                      onPressed: isMeasuring == false ? null : () async {

                        await _handleSaveRecordInFile();
        
                        const snackBar = SnackBar(
                          content: Text('Đã lưu kết quả đo vào bộ nhớ!'),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      },
                      child: const Text("Lưu kết quả đo")
                  )
                ],
              ),
              const SizedBox(height: 20),
              if (isCalculated)
              Column(
                children: [
                  Text('Dữ liệu sau khi được xử lý: '),
                  const SizedBox(height: 5),
                  Text("SBP: ${_textSBP}"),
                  Text("DBP: ${_textDBP}"),
                  Text("Heart Rate: ${_textHeartRate}"),
                  Text("Deviation: ${_textDeviation}"),
                ],
                mainAxisAlignment: MainAxisAlignment.center,
              ),
            ],
          ),
        )
    );
  }

  /// Returns the realtime Cartesian line chart.
  // SfCartesianChart _buildLiveLineChart() =>
  //     SfCartesianChart(
  //         // title: ChartTitle(
  //         //   text: "Biểu đồ đo điện tim thời gian thực",
  //         //   alignment: ChartAlignment.center,
  //         // ),
  //         // plotAreaBackgroundColor: Color(0XFF006A89),
  //         plotAreaBorderWidth: 0,
  //         primaryXAxis: NumericAxis(
  //             zoomPosition: 0.2,
  //             // maximum: 400,
  //             interval: 50,
  //             // majorGridLines: MajorGridLines(
  //             //   color: Colors.red,
  //             // ),
  //             // minorGridLines: MinorGridLines(
  //             //   color: Colors.red,
  //             // ),
  //             edgeLabelPlacement: EdgeLabelPlacement.shift
  //         ),
  //         primaryYAxis: NumericAxis(
  //             edgeLabelPlacement: EdgeLabelPlacement.shift,
  //             majorGridLines: const MajorGridLines(width: 1)),
  //         legend: Legend(
  //             isVisible: true,
  //             isResponsive: true,
  //             position: LegendPosition.top
  //         ),
  //         enableAxisAnimation: true,
  //         series: [
  //           FastLineSeries<_ChartData, int>(
  //               onRendererCreated: (ChartSeriesController controller) {
  //                 _chartSeriesController = controller;
  //               },
  //               dataSource: chartDataChannel!,
  //               color: Color.fromARGB(255, 42, 25, 228),
  //               xValueMapper: (_ChartData sales, _) => sales.country,
  //               yValueMapper: (_ChartData sales, _) => sales.sales,
  //               animationDuration: 0,
  //               legendItemText: "Kênh 1"
  //           ),
  //           FastLineSeries<_ChartData, int>(
  //               onRendererCreated: (ChartSeriesController controller) {
  //                 _chartSeriesController2 = controller;
  //               },
  //               dataSource: chartDataChannel2!,
  //               color: Color.fromARGB(255, 228, 25, 25),
  //               xValueMapper: (_ChartData sales, _) => sales.country,
  //               yValueMapper: (_ChartData sales, _) => sales.sales,
  //               animationDuration: 0,
  //               legendItemText: "Kênh 2"
  //           ),
  //           FastLineSeries<_ChartData, int>(
  //               onRendererCreated: (ChartSeriesController controller) {
  //                 _chartSeriesController3 = controller;
  //               },
  //               dataSource: chartDataChannel3!,
  //               color: Color.fromARGB(255, 25, 228, 45),
  //               xValueMapper: (_ChartData sales, _) => sales.country,
  //               yValueMapper: (_ChartData sales, _) => sales.sales,
  //               animationDuration: 0,
  //               legendItemText: "Kênh 3"
  //           ),
  //           FastLineSeries<_ChartData, int>(
  //               onRendererCreated: (ChartSeriesController controller) {
  //                 _chartSeriesController4 = controller;
  //               },
  //               dataSource: chartDataChannel4!,
  //               color: Color.fromARGB(255, 214, 228, 25),
  //               xValueMapper: (_ChartData sales, _) => sales.country,
  //               yValueMapper: (_ChartData sales, _) => sales.sales,
  //               animationDuration: 0,
  //               legendItemText: "Kênh 4"
  //           )
  //         ]);
  SfCartesianChart _buildLiveLineChart() =>
      SfCartesianChart(
        // title: ChartTitle(
        //   text: "Biểu đồ đo điện tim thời gian thực",
        //   alignment: ChartAlignment.center,
        // ),
        // plotAreaBackgroundColor: Color(0XFF006A89),
          plotAreaBorderWidth: 0,
          primaryXAxis: NumericAxis(
              zoomPosition: 0.2,
              interval: 50,

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
                dataSource: chartDataChannel!,
                color: Color.fromARGB(255, 42, 25, 228),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "PPG"
            ),
          ]);

          SfCartesianChart _buildLiveLineChart1() =>
            SfCartesianChart(
        // title: ChartTitle(
        //   text: "Biểu đồ đo điện tim thời gian thực",
        //   alignment: ChartAlignment.center,
        // ),
        // plotAreaBackgroundColor: Color(0XFF006A89),
          plotAreaBorderWidth: 0,
          primaryXAxis: NumericAxis(
              zoomPosition: 0.2,
              interval: 50,

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
                  _chartSeriesController3 = controller;
                },
                dataSource: chartDataChannel3!,
                color: Color.fromARGB(255, 228, 25, 25),
                xValueMapper: (_ChartData sales, _) => sales.country,
                yValueMapper: (_ChartData sales, _) => sales.sales,
                animationDuration: 0,
                legendItemText: "PCG"
            ),
          ]);
  ///Continously updating the data source based on timer
  ///
  ///
  void _updateChartData(List dataChannelsToShowOnChart) {
    _ChartData newData = _ChartData(
        count, dataChannelsToShowOnChart[0]);
    _ChartData newData2 = _ChartData(
        count, dataChannelsToShowOnChart[1]);
    _ChartData newData3 = _ChartData(
        count, dataChannelsToShowOnChart[2]);
    // _ChartData newData4 = _ChartData(count, row[3]);
    // print("Channel 1 Data: ${newData.sales}");
    // print("Channel 2 Data: ${newData2.sales}");
    // print("Channel 3 Data: ${newData3.sales}");
    // print("Channel 1 Data cột: ${newData.country}");
    // print("Channel 2 Data cột: ${newData2.country}");
    // print("Channel 3 Data cột: ${newData3.country}");
    chartDataChannel!.add(newData);
    chartDataChannel2!.add(newData2);
    chartDataChannel3!.add(newData3);
    // chartDataChannel4!.add(newData4);

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

    // if (chartDataChannel4!.length >= 50) {
    //   chartDataChannel4!.removeAt(0);
    //   _chartSeriesController4?.updateDataSource(
    //     addedDataIndexes: <int>[chartDataChannel4!.length - 1],
    //     removedDataIndexes: <int>[0],
    //   );
    // } else {
    //   _chartSeriesController4?.updateDataSource(
    //     addedDataIndexes: <int>[chartDataChannel4!.length - 1],
    //   );
    // }
  }

  subscribeCharacteristic() {
    subscribeStream =
        flutterReactiveBle.subscribeToCharacteristic(
            widget.bluetoothCharacteristic).listen((value) {
          // print("Received Data: $value");
            List<double> packetHandled = ECGDataController.handleDataRowFromBluetooth(value);
          // print("Processed Data: ${packetHandled.length}"); // In dữ liệu đã xử lý
          // print("Processed Data dữ liệu sau khi chia: $packetHandled");
          List dataChannelsToShowOnChart = ECGDataController.calculateDataPointToShow(packetHandled);
          samples.add([0,	0, 0, 0, 0, 0, ...packetHandled]);

          if (samples.length == 50000) {
            FilesManagement.handleSaveDataToFileV2(
                widget.fileToSave, samples);
            samples.clear();
          }
          if (count % 4 == 0) { // Cập nhật sau mỗi 15 bước
            _updateChartData(dataChannelsToShowOnChart);
          }
          count++;
        });

  }

}
/// Private calss for storing the chart series data points.
class _ChartData {
  _ChartData(this.country, this.sales);
  final int country;
  final sales;
}