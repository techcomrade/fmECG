import 'package:bluetooth_ecg/constants/theme.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/providers/bluetooth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/providers/news_provider.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/screens/main_screen.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:provider/provider.dart';
import 'screens/login1_screen.dart';

void main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  // SharedPreferences prefs = await SharedPreferences.getInstance();
  // var test = prefs.getString("userData");
  // print('test:$test');
  // if (Platform.isAndroid) {
  //   // WidgetsFlutterBinding.ensureInitialized();
  //     runApp(const FmECGApp());
  // } else {
  //     runApp(const FmECGApp());
  // }
  runApp(const FmECGApp());
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
      child: Consumer<AuthProvider>(
        builder: (ctx, auth, _) {
          Utils.globalContext = ctx;
          return GetMaterialApp(
            debugShowCheckedModeBanner: false,
            theme: (auth.theme == ThemeType.DARK
              ? ThemeECG.darkTheme
              : ThemeECG.lightTheme).copyWith(
                pageTransitionsTheme: const PageTransitionsTheme(
                  builders: <TargetPlatform, PageTransitionsBuilder>{
                    TargetPlatform.android: ZoomPageTransitionsBuilder(),
                  },
                )),
            darkTheme: ThemeECG.darkTheme,
            home: auth.isAuth ? MainScreen() :
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
                }),
            localizationsDelegates: const [
              S.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            getPages : AppRoutes.pages,
          );
      }),
    );
  }
}


