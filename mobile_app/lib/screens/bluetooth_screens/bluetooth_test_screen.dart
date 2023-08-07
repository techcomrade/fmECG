import 'dart:async';
import 'dart:convert' show utf8;

import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class BluetoothTestScreen extends StatefulWidget {
  const BluetoothTestScreen({Key? key, required this.device}) : super(key: key);
  final BluetoothDevice device;

  @override
  _BluetoothTestScreenState createState() => _BluetoothTestScreenState();
}

class _BluetoothTestScreenState extends State<BluetoothTestScreen> {
  static const String SERVICE_UUID = "00001800-0000-1000-8000-00805f9b34fb";
  final String CHARACTERISTIC_UUID = "00002a04-0000-1000-8000-00805f9b34fb";

  final List<String> characteristicUuids = [
      "00002a00-0000-1000-8000-00805f9b34fb",
      "00002a01-0000-1000-8000-00805f9b34fb",
      "00002a04-0000-1000-8000-00805f9b34fb",
      "00002aa6-0000-1000-8000-00805f9b34fb",
      "00002a05-0000-1000-8000-00805f9b34fb",
      "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
      "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
    ];
  bool isReady = false;
  late Stream<List<int>> stream;
  // List<double> traceDust = List();

  @override
  void initState() {
    super.initState();
    print('devicesssssss:${widget.device}');
    connectToDevice();
  }

  connectToDevice() async {
    if (widget.device == null) {
      // _Pop();
      return;
    }

    Timer(const Duration(seconds: 15), () {
      if (!isReady) {
        disconnectFromDevice();
        // _Pop();
      }
    });

    await widget.device.connect();
    print('widget:${widget.device.state}');
    discoverServices();
  }

  disconnectFromDevice() {
    if (widget.device == null) {
      // _Pop();
      return;
    }

    widget.device.disconnect();
  }

  discoverServices() async {

    List<BluetoothService> services = await widget.device.discoverServices();
    services.forEach((service) {
      if (service.uuid.toString() == SERVICE_UUID) {
        service.characteristics.forEach((characteristic) {
          if (characteristic.uuid.toString() == CHARACTERISTIC_UUID) {
            print('go here');
            characteristic.setNotifyValue(!characteristic.isNotifying);
            stream = characteristic.value;
            setState(() {
              isReady = true;
            });
          }
        });
      }
    });

    if (!isReady) {
      // _Pop();
      print('not send data');
    }
  }

  // Future<bool> _onWillPop() {
  //   return showDialog(
  //       context: context,
  //       builder: (context) =>
  //           new AlertDialog(
  //             title: Text('Are you sure?'),
  //             content: Text('Do you want to disconnect device and go back?'),
  //             actions: <Widget>[
  //               new FlatButton(
  //                   onPressed: () => Navigator.of(context).pop(false),
  //                   child: new Text('No')),
  //               new FlatButton(
  //                   onPressed: () {
  //                     disconnectFromDevice();
  //                     Navigator.of(context).pop(true);
  //                   },
  //                   child: new Text('Yes')),
  //             ],
  //           ) ??
  //           false);
  // }

  String _dataParser(List<int> dataFromDevice) {
    return utf8.decode(dataFromDevice);
  }

  @override
  Widget build(BuildContext context) {
    // Oscilloscope oscilloscope = Oscilloscope(
    //   showYAxis: true,
    //   padding: 0.0,
    //   backgroundColor: Colors.black,
    //   traceColor: Colors.white,
    //   yAxisMax: 3000.0,
    //   yAxisMin: 0.0,
    //   dataSet: traceDust,
    // );

    return Scaffold(
      appBar: AppBar(
        title: Text('Optical Dust Sensor'),
      ),
      body: Container(
          child: !isReady
              ? Center(
                  child: Text(
                    "Waiting...",
                    style: TextStyle(fontSize: 24, color: Colors.red),
                  ),
                )
              : Container(
                  child: StreamBuilder<List<int>>(
                    stream: stream,
                    builder: (BuildContext context,
                        AsyncSnapshot<List<int>> snapshot) {
                      if (snapshot.hasError)
                        return Text('Error: ${snapshot.error}');

                      if (snapshot.connectionState ==
                          ConnectionState.active) {
                        var currentValue = _dataParser(snapshot.data!);
                        // traceDust.add(double.tryParse(currentValue) ?? 0);

                        return Center(
                            child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Expanded(
                              flex: 1,
                              child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    Text('Current value from Sensor',
                                        style: TextStyle(fontSize: 14)),
                                    Text('${currentValue} ug/m3',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 24))
                                  ]),
                            ),
                            Expanded(
                              flex: 1,
                              // child: oscilloscope,
                              child: Container(
                                decoration: BoxDecoration(color: Colors.red),
                              )
                            )
                          ],
                        ));
                      } else {
                        return Text('Check the stream');
                      }
                    },
                  ),
                )),
    );
  }
}