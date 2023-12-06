import 'dart:io';
import 'package:bluetooth_ecg/constants/theme.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/bluetooth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/screens/bluetooth_screens/bl_screen.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:get/get.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';
import 'providers/auth_provider.dart';

//import 'package:flutter/services.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  // If you're going to use other Firebase services in the background, such as Firestore,
  // make sure you call `initializeApp` before using other Firebase services.
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  print("Handling a background message: ${message.notification?.body}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await FirebaseMessaging.instance.getInitialMessage();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  if (Platform.isAndroid) {
    WidgetsFlutterBinding.ensureInitialized();
    [
      Permission.location,
      Permission.storage,
      Permission.bluetooth,
      Permission.bluetoothConnect,
      Permission.bluetoothScan
    ].request().then((status) {
      runApp(const FmECGApp());
    });
  } else {
    runApp(const FmECGApp());
  }
}

class FmECGApp extends StatefulWidget {
  const FmECGApp({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return FmECGAppState();
  }
}

class FmECGAppState extends State<FmECGApp> {
  /*static const platform = MethodChannel("fmecg/java");

  // Get battery level.
  String _status = 'Bluetooth required';

  Future<void> _enableBluetooth() async {
    String status;
    try {
      final result = await platform.invokeMethod<bool>('enableBluetooth');
      status = "Bluetooth status: " + (result == true ? "enabled" : "disabled");
    } on PlatformException catch (e) {
      status = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _status = status;
    });
  }
*/
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return /* MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Test native"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(_status),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _enableBluetooth,
          tooltip: 'Increment',
          child: const Icon(Icons.battery_0_bar),
        ),
      ),
    ); 
    */
        MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => NewsProvider()),
        ChangeNotifierProvider(create: (_) => BluetoothProvider()),
        ChangeNotifierProvider(create: (_) => ECGProvider()),
      ],
      child: Consumer<AuthProvider>(builder: (ctx, auth, _) {
        Utils.globalContext = ctx;
        return GetMaterialApp(
          debugShowCheckedModeBanner: false,
          theme: (auth.theme == ThemeType.DARK
                  ? ThemeECG.darkTheme
                  : ThemeECG.lightTheme)
              .copyWith(
                  pageTransitionsTheme: const PageTransitionsTheme(
            builders: <TargetPlatform, PageTransitionsBuilder>{
              TargetPlatform.android: ZoomPageTransitionsBuilder(),
            },
          )),
          //darkTheme: ThemeECG.darkTheme,
          home: /*auth.isAuth ? MainScreen() :
              FutureBuilder(
                future: auth.checkAutoLogin(),
                builder: (ctx, authResultSnapshot) {
                  if (authResultSnapshot.connectionState == ConnectionState.waiting) {
                    return const CircularProgressIndicator();
                  } else if (authResultSnapshot.hasError) {
                    return Text('Error: ${authResultSnapshot.error}');
                  } else {
                    return Login1Screen();
                  }
                }),*/
              BluetoothScreen(),
          localizationsDelegates: const [
            S.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          getPages: AppRoutes.pages,
        );
      }),
    );
  }
}
