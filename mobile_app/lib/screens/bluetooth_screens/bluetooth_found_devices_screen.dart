import 'dart:async';
import 'dart:math';
import 'package:bluetooth_ecg/widgets.dart';
import 'dart:convert' show utf8;
import 'package:flutter/material.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class BluetoothFoundDevicesScreen extends StatefulWidget {
  const BluetoothFoundDevicesScreen({Key? key, required this.device}) : super(key: key);

  final BluetoothDevice device;

  @override
  State<BluetoothFoundDevicesScreen> createState() => _BluetoothFoundDevicesScreenState();
}

class _BluetoothFoundDevicesScreenState extends State<BluetoothFoundDevicesScreen> {
  List<int> _getRandomBytes() {
    final math = Random();
    return [
      math.nextInt(255),
      math.nextInt(255),
      math.nextInt(255),
      math.nextInt(255)
    ];
  }
  Stream<List<int>> stream = Stream.value([]);

  List<Widget> _buildServiceTiles(List<BluetoothService> services) {
    // BluetoothService service0 = services[0];
    // services.first.characteristics.forEach((characteristic) { 
    //   characteristic.setNotifyValue(!characteristic.isNotifying);
    //   stream = characteristic.value;
    // });
    return services.map(
          (s) => ServiceTile(
            service: s,
            characteristicTiles: s.characteristics.map((c) { 
                    print("charac:${c.uuid}");
                    return CharacteristicTile(
                      characteristic: c,
                      onReadPressed: () async {
                        await c.setNotifyValue(true);
                        c.value.listen((event) { 
                          print("test: ${event}");
                        });
                        c.read();
                      },
                      onWritePressed: () async {
                        await c.write(_getRandomBytes(), withoutResponse: true);
                        await c.read();
                      },
                      onNotificationPressed: () async {
                        await c.setNotifyValue(!c.isNotifying);
                        await c.read();
                      },
                      descriptorTiles: c.descriptors
                          .map(
                            (d) => DescriptorTile(
                              descriptor: d,
                              onReadPressed: () => d.read(),
                              onWritePressed: () => d.write(_getRandomBytes()),
                            ),
                          )
                          .toList(),
                  );},
                )
                .toList(),
          ),
        )
        .toList();
  }

  String _dataParser(List<int> dataFromDevice) {
    return utf8.decode(dataFromDevice);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.device.name),
        actions: <Widget>[
          StreamBuilder<BluetoothDeviceState>(
            stream: widget.device.state,
            initialData: BluetoothDeviceState.connecting,
            builder: (c, snapshot) {
              VoidCallback? onPressed;
              String text;
              switch (snapshot.data) {
                case BluetoothDeviceState.connected:
                  onPressed = () => widget.device.disconnect();
                  text = 'DISCONNECT';
                  break;
                case BluetoothDeviceState.disconnected:
                  onPressed = () => widget.device.connect();
                  text = 'CONNECT';
                  break;
                default:
                  onPressed = null;
                  text = snapshot.data.toString().substring(21).toUpperCase();
                  break;
              }
              return TextButton(
                  onPressed: onPressed,
                  child: Text(
                    text
                  ));
            },
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[

            // status device
            StreamBuilder<BluetoothDeviceState>(
              stream: widget.device.state,
              initialData: BluetoothDeviceState.connecting,
              builder: (c, snapshot) { 
                return ListTile(
                leading: (snapshot.data == BluetoothDeviceState.connected)
                    ? Icon(Icons.bluetooth_connected)
                    : Icon(Icons.bluetooth_disabled),
                title: Text(
                    'Device is ${snapshot.data.toString().split('.')[1]}.'),
                subtitle: Text('${widget.device.id}'),
                trailing: StreamBuilder<bool>(
                  stream: widget.device.isDiscoveringServices,
                  initialData: false,
                  builder: (c, snapshot) => IndexedStack(
                    index: snapshot.data! ? 1 : 0,
                    children: <Widget>[
                      IconButton(
                        // discover services => sang streambuilder khac
                        icon: Icon(Icons.refresh),
                        onPressed: () => widget.device.discoverServices(),
                      ),
                      IconButton(
                        icon: SizedBox(
                          child: CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation(Colors.grey),
                          ),
                          width: 18.0,
                          height: 18.0,
                        ),
                        onPressed: null,
                      )
                    ],
                  ),
                ),
              );
              },
            ),

            // MTU
            StreamBuilder<int>(
              stream: widget.device.mtu,
              initialData: 0,
              builder: (c, snapshot) => ListTile(
                title: Text('MTU Size'),
                subtitle: Text('${snapshot.data} bytes'),
                trailing: IconButton(
                  icon: Icon(Icons.edit),
                  onPressed: () => widget.device.requestMtu(223),
                ),
              ),
            ),
            StreamBuilder<List<BluetoothService>>(
              stream: widget.device.services,
              initialData: [],
              builder: (c, snapshot) {
                // services come here to continue moving
                return Column(
                  children: _buildServiceTiles(snapshot.data!),
                );
              },
            ),
            StreamBuilder<List<int>>(
                    stream: stream,
                    builder: (BuildContext context,
                        AsyncSnapshot<List<int>> snapshot) {
                      if (snapshot.hasError)
                        return Text('Error: ${snapshot.error}');
                      print('gfjkbgbjkdfbg:${snapshot.data}');
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
          ],
        ),
      ),
    );
  }
}