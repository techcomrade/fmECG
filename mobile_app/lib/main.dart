import 'dart:io';

import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/providers/bluetooth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/providers/socketchannel_provider.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/screens/main_screen.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
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
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  // Unified permission request block
  await _requestPermissions();

  runApp(const AppInitializer());
}

Future<void> _requestPermissions() async {
  if (Platform.isAndroid || Platform.isIOS) {
    final status = await [
      Permission.location,
      Permission.storage,
      if (Platform.isAndroid) Permission.bluetooth,
    ].request();
    print("Permission status: $status");
  }
}

class AppInitializer extends StatelessWidget {
  const AppInitializer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => NewsProvider()),
        ChangeNotifierProvider(create: (_) => BluetoothProvider()),
        ChangeNotifierProvider(create: (_) => ECGProvider()),
        ChangeNotifierProvider(create: (_) => SocketChannelProvider('example@email.com')),
      ],
      child: const FmECGApp(),
    );
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
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final socketChannel = Provider.of<SocketChannelProvider>(context, listen: false);
      socketChannel.connect();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(builder: (ctx, auth, _) {
      Utils.globalContext = ctx; // Use with caution
      return MaterialApp(
        locale: const Locale('en'),
        debugShowCheckedModeBanner: false,
        theme: ThemeData.light(),
        darkTheme: ThemeData.dark(),
        home: const MainScreen(),
        localizationsDelegates: const [
          S.delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        supportedLocales: const [
          Locale('en'), // English
          Locale('vi'), // Vietnamese
        ],
      );
    });
  }
}
