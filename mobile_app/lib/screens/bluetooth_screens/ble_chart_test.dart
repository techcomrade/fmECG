import 'dart:async';
import 'dart:io';
import 'package:bluetooth_ecg/controllers/ecg_data_controller.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_reactive_ble/flutter_reactive_ble.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:telephony/telephony.dart';
import 'package:geolocator/geolocator.dart' as geo;
import '../../constants/color_constant.dart';

import '../../constants/color_constant.dart';

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

  String _currentLocation = '';

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

  Future<void> _fetchAndSendLocation(String additionalMessage) async {
    bool serviceEnabled;
    geo.LocationPermission permission;

    serviceEnabled = await geo.Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      await geo.Geolocator.openLocationSettings();
      return;
    }

    permission = await geo.Geolocator.checkPermission();
    if (permission == geo.LocationPermission.deniedForever) {
      await geo.Geolocator.openAppSettings();
      return;
    }

    if (permission == geo.LocationPermission.denied) {
      permission = await geo.Geolocator.requestPermission();
      if (permission != geo.LocationPermission.whileInUse && permission != geo.LocationPermission.always) {
        return;
      }
    }

    geo.Position position = await geo.Geolocator.getCurrentPosition(desiredAccuracy: geo.LocationAccuracy.high);
    _currentLocation = 'https://www.google.com/maps/search/?api=1&query=${position.latitude},${position.longitude}';
    String message = additionalMessage + "\n Vị trí hiện tại: $_currentLocation";
    await sendSMSAutomatically(message);
  }

  Future<void> sendSMSAutomatically(String message) async {
    String phoneNumber = await _getPhoneNumberFromPrefs();
    if (phoneNumber.isNotEmpty) {
      final Telephony telephony = Telephony.instance;
      await telephony.sendSms(to: phoneNumber, message: message);
    } else {
      setState(() {
        isNotSetupPhoneNumber = true;
      });
    }
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

        int sbpNumber = double.parse(_textSBP).round();
        int dbpNumber = double.parse(_textDBP).round();
        int heartRateNumber = double.parse(_textHeartRate).round();
        int deviationNumber = double.parse(_textDeviation).round();
        double position = calculateIndicatorPosition(sbpNumber, dbpNumber);

        final bool isNormalPressure = sbpNumber < 120 && dbpNumber < 80;
        final bool isHighPressure =  sbpNumber >= 120 && sbpNumber < 130 && dbpNumber < 80;
        final bool isHighPressure1 =  sbpNumber >= 130 && sbpNumber < 140 && dbpNumber >= 80 && dbpNumber < 90;
        final bool isHighPressure2 = sbpNumber > 140 && dbpNumber > 90;
        final bool isHighPressure3 = sbpNumber > 180 && dbpNumber > 120;
        final bool isNormalHeartRate = heartRateNumber >= 60 && heartRateNumber <= 100;
        final bool isLowHeartRate = heartRateNumber < 60 ;
        final bool isHighHeartRate = heartRateNumber > 100 ;
        final bool isManyHeartRate = deviationNumber > 50 ;

        String smsMessage = "";
        if (isHighPressure || isHighPressure1 || isHighPressure2 || isHighPressure3 ||
            isLowHeartRate || isHighHeartRate || isManyHeartRate) {
          smsMessage = "Thông báo về tình trạng sức khỏe: ";
          if (isHighPressure) {
            smsMessage += "Huyết áp cao. ";
          } else if (isHighPressure1) {
            smsMessage += "Tăng huyết áp Độ 1. ";
          } else if (isHighPressure2) {
            smsMessage += "Tăng huyết áp Độ 2. ";
          } else if (isHighPressure3) {
            smsMessage += "Huyết áp cực kỳ cao! ";
          }

          if (isLowHeartRate) {
            smsMessage += "Nhịp tim thấp. ";
          } else if (isHighHeartRate) {
            smsMessage += "Nhịp tim cao. ";
          }

          if (isManyHeartRate) {
            smsMessage += "Sự chênh lệch lớn trong nhịp tim. ";
          }

          _fetchAndSendLocation(smsMessage);
        }

        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (BuildContext context) {
              return Scaffold(
                appBar: AppBar(
                  title: Text("Kết quả đo"),
                  centerTitle: true,
                ),
                body: Container(
                  padding: EdgeInsets.all(20),
                  child: SingleChildScrollView( // Sử dụng SingleChildScrollView để có thể cuộn nếu nội dung quá dài
                    child: Column(
                      children: [
                        Container(
                          alignment: Alignment.topLeft,
                          child: Text(
                            "Tổng quan",
                            style: TextStyle(
                                color: ColorConstant.primary,
                                fontWeight: FontWeight.bold,
                                fontSize: 22),
                          ),
                        ),
                        const SizedBox(height: 10),
                        BloodPressureIndicator(indicatorPosition: position),
                        const SizedBox(height: 40),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            NumberCard(number: sbpNumber, text: "Tâm thu", subText: "mmHg", color1: Colors.red, percentage: sbpNumber/250),
                            NumberCard(number: dbpNumber, text: "Tâm trương", subText: "mmHg", color1: Colors.blue, percentage: dbpNumber/200),
                          ],
                        ),
                        SizedBox(height: 30), // Khoảng cách giữa hai hàng
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            NumberCard(number: heartRateNumber, text: "Nhịp tim", subText: "bpm", color1: Colors.green, percentage: heartRateNumber/150),
                            NumberCard(number: deviationNumber, text: "Biến thiên", subText: "bpm", color1: Colors.purple, percentage: deviationNumber/150),
                          ],
                        ),
                        SizedBox(height: 10),
                        BloodPressureLegendTable(),
                      ],
                      mainAxisAlignment: MainAxisAlignment.center,
                    ),
                  ),
                ),
              );
            },
          ),
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

class _ChartData {
  _ChartData(this.country, this.sales);
  final int country;
  final sales;
}

class NumberCard extends StatelessWidget {
  final int number;
  final String text;
  final String subText;
  final Color color1;
  final double percentage;

  NumberCard({
    required this.number,
    required this.text,
    required this.subText,
    required this.color1,
    required this.percentage,
  });

  @override
  Widget build(BuildContext context) {
    // Tính toán góc cho phần tiến trình
    double progressAngle = 2 * 3.14 * percentage;
    return Center(
      child: CustomPaint(
        size: Size(130, 130), // Kích thước của CustomPaint
        painter: CircleProgressPainter(
          progressAngle: progressAngle,
          progressColor: color1,
          backgroundColor: Colors.grey[300]!,
        ),
        child: Container(
          width: 110.0,
          height: 110.0,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.white,
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  text,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 10.0,
                    color: Colors.black,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  '$number',
                  style: TextStyle(
                    fontSize: 19.0,
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  subText,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 10.0,
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class CircleProgressPainter extends CustomPainter {
  final double progressAngle;
  final Color progressColor;
  final Color backgroundColor;

  CircleProgressPainter({
    required this.progressAngle,
    required this.progressColor,
    required this.backgroundColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    Paint backgroundPaint = Paint()
      ..color = backgroundColor
      ..strokeWidth = 10
      ..style = PaintingStyle.stroke;

    Paint progressPaint = Paint()
      ..color = progressColor
      ..strokeWidth = 10
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    Offset center = Offset(size.width / 2, size.height / 2);
    double radius = size.width / 2;

    canvas.drawCircle(center, radius, backgroundPaint);

    canvas.drawArc(Rect.fromCircle(center: center, radius: radius), -3.14 / 2, progressAngle, false, progressPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}

class ImageCard extends StatelessWidget {
  final String imageAsset;
  final Function() functionScanBluetooth;
  final Function() temporaryNothing;

  ImageCard({
    required this.imageAsset,
    required this.functionScanBluetooth,
    required this.temporaryNothing,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: ColorConstant.quinary,
      elevation: 4.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Column(
        children: [
          Image.asset(
            imageAsset,
            width: double.infinity,
            height: 200.0,
            fit: BoxFit.cover,
          ),
          SizedBox(height: 12.0),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: functionScanBluetooth,
                child: Text("Thực hiện đo"),
              ),
              ElevatedButton(
                onPressed: temporaryNothing,
                child: Text("Thử đo"),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class BloodPressureIndicatorPainter extends CustomPainter {
  final double indicatorPosition; // Giá trị từ 0 (bắt đầu) đến 1 (kết thúc) của thanh

  BloodPressureIndicatorPainter({required this.indicatorPosition});

  @override
  void paint(Canvas canvas, Size size) {
    const List<Color> colors = [
      Colors.green, // Bình thường
      Colors.yellow, // Huyết áp cao
      Colors.orange, // Tăng huyết áp Độ 1
      Colors.redAccent, // Tăng huyết áp Độ 2
      Colors.purple, // Huyết áp cực kỳ cao
    ];

    double sectionWidth = size.width / colors.length;

    // Vẽ thanh ngang đa màu
    for (int i = 0; i < colors.length; i++) {
      Paint paint = Paint()..color = colors[i];
      canvas.drawRect(
        Rect.fromLTWH(i * sectionWidth, 0, sectionWidth, size.height),
        paint,
      );
    }

    // Vẽ vạch chỉ thị
    double indicatorX = indicatorPosition * size.width;
    Paint indicatorPaint = Paint()
      ..color = Colors.black54
      ..strokeWidth = 3;
    canvas.drawLine(
      Offset(indicatorX, 0),
      Offset(indicatorX, size.height),
      indicatorPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class BloodPressureIndicator extends StatelessWidget {
  final double indicatorPosition; // Value from 0 to 1 for blood pressure level

  const BloodPressureIndicator({Key? key, required this.indicatorPosition}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Calculate the icon's horizontal position based on the indicatorPosition
    // Assuming the total width is the screen width for simplicity
    double screenWidth = MediaQuery.of(context).size.width;
    double iconPosition = screenWidth * indicatorPosition; // Adjust for the icon's size

    return Stack(
      children: [
        SizedBox(
          width: double.infinity, // Full width
          height: 20, // Increased height to accommodate the icon
          child: CustomPaint(
            painter: BloodPressureIndicatorPainter(indicatorPosition: indicatorPosition),
          ),
        ),
        Transform.translate(
          offset: Offset(screenWidth * indicatorPosition - 40 * indicatorPosition - 11.5, 25), // Giả sử icon có kích thước là 24x24 pixels
          child: Icon(
            Icons.favorite,
            color: Colors.pink,
            size: 24, // Kích thước của icon
          ),
        ),
      ],
    );
  }
}

double calculateIndicatorPosition(int sbpNumber, int dbpNumber) {
  if (sbpNumber > 180 || dbpNumber > 120) {
    return 0.9; // Huyết áp cực kỳ cao
  } else if (sbpNumber >= 140 || dbpNumber >= 90) {
    return 0.7; // Tăng huyết áp Độ 2
  } else if (sbpNumber >= 130 || dbpNumber >= 80) {
    return 0.5; // Tăng huyết áp Độ 1
  } else if (sbpNumber >= 120) {
    return 0.3; // Huyết áp cao
  } else {
    return 0.1; // Bình thường
  }
}

class BloodPressureLegendTable extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Tùy chỉnh cỡ chữ ở đây
    TextStyle textStyle = TextStyle(fontSize: 10); // Giảm cỡ chữ xuống còn 14

    return DataTable(
      columns: const [
        DataColumn(label: Text('')),
        DataColumn(label: Text('Trạng thái')),
        DataColumn(label: Text('PPG/PCG')),
      ],
      rows: [
        DataRow(cells: [
          DataCell(CircleAvatar(backgroundColor: Colors.purple)),
          DataCell(Text('Huyết Áp Cực Kỳ Cao', style: textStyle)),
          DataCell(Text('> 180 hoặc > 120', style: textStyle)),
        ]),
        DataRow(cells: [
          DataCell(CircleAvatar(backgroundColor: Colors.redAccent)),
          DataCell(Text('Tăng Huyết Áp Độ 2', style: textStyle)),
          DataCell(Text('>= 140 hoặc >= 90', style: textStyle)),
        ]),
        DataRow(cells: [
          DataCell(CircleAvatar(backgroundColor: Colors.orange)),
          DataCell(Text('Tăng Huyết Áp Độ 1', style: textStyle)),
          DataCell(Text('>= 130 hoặc >= 80', style: textStyle)),
        ]),
        DataRow(cells: [
          DataCell(CircleAvatar(backgroundColor: Colors.yellow)),
          DataCell(Text('Huyết Áp Cao', style: textStyle)),
          DataCell(Text('>= 120', style: textStyle)),
        ]),
        DataRow(cells: [
          DataCell(CircleAvatar(backgroundColor: Colors.green)),
          DataCell(Text('Bình Thường', style: textStyle)),
          DataCell(Text('< 120', style: textStyle)),
        ]),
      ],
    );
  }
}