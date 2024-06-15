import 'dart:convert';
import 'dart:io';

import 'package:bluetooth_ecg/app.dart';
import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/networks/socket_channel.dart';
import 'package:bluetooth_ecg/providers/bluetooth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';
import 'providers/auth_provider.dart';
import 'package:http/http.dart' as http;

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

  apiConstant.getMode();
  // try {
  //   final String url = "${apiConstant.apiUrl}/record";
  //   print('aaa:${url}');
  //   final Map<String, String> headers = {...apiConstant.headers, 
  //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiODM1NzM0MjEtOTk0My00YTI1LTlmZTEtMDBmMDQ3N2FhYmE0Iiwicm9sZSI6MiwiZXhwIjoyNDk1OTYxNzc5LCJpYXQiOjE3MTgzNjE3Nzl9.JIhIavutTEQBEJp_H03TN2TudCQBhfKfUP5lbBjQFvg'
  //   };

  //   final res = await http.get(Uri.parse(url), headers: headers);
  //   print('aaaa:${jsonDecode(res.body)}');
  // } catch (e) {
  //   print('sdgndjfkg:$e');
  // }
  final SocketChannel socketChannel = SocketChannel();
  await socketChannel.connect();

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
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => NewsProvider()),
        ChangeNotifierProvider(create: (_) => BluetoothProvider()),
        ChangeNotifierProvider(create: (_) => ECGProvider()),
      ],
      child: Consumer<AuthProvider>(builder: (ctx, auth, _) {
        Utils.globalContext = ctx;
        return const MaterialApp(
          locale: Locale('en'),
          debugShowCheckedModeBanner: false,
          // theme: (auth.theme == ThemeType.dark
          //         ? ThemeECG.darkTheme
          //         : ThemeECG.lightTheme)
          //     .copyWith(
          //         pageTransitionsTheme: const PageTransitionsTheme(
          //   builders: <TargetPlatform, PageTransitionsBuilder>{
          //     TargetPlatform.android: ZoomPageTransitionsBuilder(),
          //   },
          // )),
          // darkTheme: ThemeECG.darkTheme,
          //home: const MainScreen(),
          home: App(),
          //const Login1Screen(),
          // auth.isAuth
          //     ? const MainScreen()
          //     :
          // FutureBuilder(
          //     future: auth.isAuth,
          //     builder: (context, snapshot) {
          //       if (snapshot.connectionState == ConnectionState.waiting) {
          //         return const CircularProgressIndicator();
          //       }

          // return FutureBuilder(
          //     future: auth.checkAutoLogin(),
          //     builder: (ctx, authResultSnapshot) {
          //       if (authResultSnapshot.connectionState ==
          //           ConnectionState.waiting) {
          //         return const CircularProgressIndicator();
          //       } else if (authResultSnapshot.hasError) {
          //         return Text('Error: ${authResultSnapshot.error}');
          //       } else {
          //         return const Login1Screen();
          //       }
          //     });
          //   else if (snapshot.hasError) {
          //     return Text('Error: ${snapshot.error}');
          //   } else if (snapshot.hasData && snapshot.data == true) {
          //     return const MainScreen();
          //   } else {
          //     return const Login1Screen();
          //   }
          // }),
          localizationsDelegates: [
            S.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: [
            Locale('en'), // English
            Locale('vi'),
          ],
        );
      }),
    );
  }
}
