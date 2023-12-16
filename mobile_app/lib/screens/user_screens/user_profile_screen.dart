import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:chaquopy/chaquopy.dart';


class UserProfileScreen extends StatefulWidget {
  @override
  _UserProfileScreenState createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  TextEditingController _nameController = TextEditingController();
  TextEditingController _emailController  = TextEditingController();
  TextEditingController _bioController = TextEditingController();
  TextEditingController _locationController = TextEditingController();

  static const platform = MethodChannel("com.example.method_channel/java");

  // Get battery level.
  String _batteryLevel = 'Unknown battery level.';
  String testDataPython = "";

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final result = await platform.invokeMethod<int>('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _batteryLevel = batteryLevel;
    });
  }

  _runPython() async {
    // "def method(): \n A = 10 \n B = 10 \n return A+B \n print(method())";
    // String text = "def method(): \n A = 10 \n B = 10 \n return A+B \n print(method())";
    String code = "def method():\n";
    code +=" A=10\nB=5\n";
    code +=" return A+B";
    print('code:$code');
    // code +="print(method())";
    final _result = await Chaquopy.executeCode(code);
    setState(() {
      testDataPython = _result["textOutputOrError"] ?? '';
    });

  }

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: 'User');
    _emailController = TextEditingController(text: 'user@gmail.com');
    _bioController = TextEditingController(text: 'MyBP is my life');
    _locationController = TextEditingController(text: 'Hanoi');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _bioController.dispose();
    _locationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Test native"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(testDataPython),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _runPython,
          tooltip: 'Increment',
          child: const Icon(Icons.battery_0_bar),
        ),
      ),
    );
    // return SingleChildScrollView(
    //   child: Padding(
    //     padding: EdgeInsets.all(16.0),
    //     child: Column(
    //       crossAxisAlignment: CrossAxisAlignment.center,
    //       children: [
    //         SizedBox(height: 20),
    //         CircleAvatar(
    //           radius: 60,
    //           backgroundImage: AssetImage('assets/images/fm_ecg.png'),
    //         ),
    //         SizedBox(height: 20),
    //         TextField(
    //           controller: _nameController,
    //           decoration: InputDecoration(
    //             labelText: 'Name',
    //             prefixIcon: Icon(Icons.person),
    //           ),
    //         ),
    //         SizedBox(height: 10),
    //         TextField(
    //           controller: _emailController,
    //           decoration: InputDecoration(
    //             labelText: 'Email',
    //             prefixIcon: Icon(Icons.email),
    //           ),
    //         ),
    //         SizedBox(height: 10),
    //         TextField(
    //           controller: _bioController,
    //           decoration: InputDecoration(
    //             labelText: 'Bio',
    //             prefixIcon: Icon(Icons.article),
    //           ),
    //         ),
    //         SizedBox(height: 10),
    //         TextField(
    //           controller: _locationController,
    //           decoration: InputDecoration(
    //             labelText: 'Location',
    //             prefixIcon: Icon(Icons.location_on),
    //           ),
    //         ),
    //         SizedBox(height: 20),
    //         ElevatedButton(
    //           onPressed: () async {
    //             // Save the updated user profile information
    //             // String name = _nameController.text;
    //             // String email = _emailController.text;
    //             // String bio = _bioController.text;
    //             // String location = _locationController.text;

    //             // await context.read()<AuthProvider>().logout();
    //             await Provider.of<AuthProvider>(context, listen: false).logoutUser();
    //             // Perform the necessary actions to save the updated information
    //           },
    //           child: Text('Logout'),
    //         ),
    //       ],
    //     ),
    //   ),
    // );
  }
}