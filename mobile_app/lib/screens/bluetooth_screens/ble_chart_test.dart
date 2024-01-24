import 'dart:async';
import 'dart:io';
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
// import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
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

    await FilesManagement.handleSaveDataToFileV2(widget.fileToSave, samples);

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
        showDialog(
          context: context,
          builder: (ctxx) {
            int sbpNumber = double.parse(_textSBP).round();
            int dbpNumber = double.parse(_textDBP).round();
            int heartRateNumber = double.parse(_textHeartRate).round();
            int deviationNumber = double.parse(_textDeviation).round();

            final bool isNormalPressure = sbpNumber < 120 && dbpNumber < 80;
            final bool isHighPressure =  sbpNumber >= 120 && sbpNumber < 130 && dbpNumber < 80;
            final bool isHighPressure1 =  sbpNumber >= 130 && sbpNumber < 140 && dbpNumber >= 80 && dbpNumber < 90;
            final bool isHighPressure2 = sbpNumber > 140 && dbpNumber > 90;
            final bool isHighPressure3 = sbpNumber > 180 && dbpNumber > 120;
            final bool isNormalHeartRate = heartRateNumber >= 60 && heartRateNumber <= 100;
            final bool isLowHeartRate = heartRateNumber < 60 ;
            final bool isHighHeartRate = heartRateNumber > 100 ;
            final bool isManyHeartRate = deviationNumber > 50 ;

            String message = "";

            if (isHighPressure) {
              message = "Cảnh báo: Huyết áp cao. Hãy theo dõi và chăm sóc sức khỏe!";
            } else if (isHighPressure1) {
              message = "Cảnh báo: Tăng huyết áp Độ 1. Hãy theo dõi và chăm sóc sức khỏe!";
            } else if (isHighPressure2) {
              message = "Cảnh báo khẩn: Tăng huyết áp Độ 2. Hãy theo dõi và chăm sóc sức khỏe!";
            } else if (isHighPressure3) {
              message = "Cảnh báo nguy cấp: Huyết áp cực kỳ cao! Đây có thể là tình huống khẩn cấp. Liên hệ bác sĩ ngay!";
            } else if (isLowHeartRate) {
              message = "Thông báo: Nhịp tim thấp. Nếu cảm thấy không khỏe, hãy liên hệ bác sĩ.";
            } else if (isHighHeartRate) {
              message = "Cảnh báo: Nhịp tim cao. Cần theo dõi và có thể cần tư vấn y tế.";
            } else if (isManyHeartRate) {
              message = "Chú ý: Sự chênh lệch lớn trong nhịp tim được ghi nhận. Nên kiểm tra sức khỏe.";
            }

            return Dialog(
              child: Container(
                height: 205,
                child: Column(
                  children: [
                    const Align(
                      alignment: Alignment.center,
                      child: Text('Dữ liệu sau khi được xử lý: ', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600)),
                    ),
                    const SizedBox(height: 5),
                    Text("SBP: $sbpNumber"),
                    Text("DBP: $dbpNumber"),
                    Text("Heart Rate: $heartRateNumber"),
                    Text("Deviation: $deviationNumber"),
                    const SizedBox(height: 5),

                    // Display the warning message if any condition is met
                    if (message.isNotEmpty)
                      Text(message, 
                        style: const TextStyle(
                          color: Colors.red, 
                          fontWeight: FontWeight.w500
                        )
                      ),
                    if (isNotSetupPhoneNumber)
                      const Text("Vui lòng setup số điện thoại người thân ở trang chủ!"),
                    const SizedBox(height: 5),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        if (message.isNotEmpty)
                          ElevatedButton(
                            onPressed: () async {
                              String phoneNumber = await _getPhoneNumberFromPrefs();
                              if (phoneNumber != "") {
                                final Telephony telephony = Telephony.instance;
                                await telephony.sendSms(to: phoneNumber, message: message);
                              } else {
                                setState(() {
                                  isNotSetupPhoneNumber = true;
                                });
                              }
                            },
                            child: const Text("Send SMS",
                                style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
                          ),

                        if (message.isNotEmpty)
                          const SizedBox(width: 8),

                        ElevatedButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: const Text("Close",
                              style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
                        ),
                      ],
                    )
                  ],
                  mainAxisAlignment: MainAxisAlignment.center,
                ),
              ),
            );
          },
        );
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


  SfCartesianChart _buildLiveLineChart() => SfCartesianChart(
    // title: ChartTitle(
    //   text: "Biểu đồ đo điện tim thời gian thực",
    //   alignment: ChartAlignment.center,
    // ),
    // plotAreaBackgroundColor: Color(0XFF006A89),
    plotAreaBorderWidth: 0,
    primaryXAxis: NumericAxis(zoomPosition: 0.2, interval: 50, edgeLabelPlacement: EdgeLabelPlacement.shift),
    primaryYAxis:
        NumericAxis(edgeLabelPlacement: EdgeLabelPlacement.shift, majorGridLines: const MajorGridLines(width: 1)),
    legend: Legend(isVisible: true, isResponsive: true, position: LegendPosition.top),
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
    ]
  );

  SfCartesianChart _buildLiveLineChart1() => SfCartesianChart(
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
    ]
  );

  void _updateChartData(List dataChannelsToShowOnChart) {
    _ChartData newData = _ChartData(
        count, dataChannelsToShowOnChart[0]);
    _ChartData newData2 = _ChartData(
        count, dataChannelsToShowOnChart[1]);
    _ChartData newData3 = _ChartData(
        count, dataChannelsToShowOnChart[2]);
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