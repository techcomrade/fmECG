
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:bluetooth_ecg/screens/auth_screens/login1_screen.dart';
import 'package:bluetooth_ecg/screens/auth_screens/login_screen.dart';
import 'package:bluetooth_ecg/screens/main_screen.dart';
import 'package:bluetooth_ecg/screens/auth_screens/register_screen.dart';
import 'package:get/get.dart';

class AppRoutes {
  static const String allowPermissionBluetoothScreen =
      '/allow_permission_bluetooth_screen';

  static const String registerScreen = '/register_screen';

  static const String registerScreenOneScreen = '/register_screen_one_screen';

  static const String scanningBluetoothDeviceScreen =
      '/scanning_bluetooth_device_screen';

  static const String listingBluetoothDevicesScreen =
      '/listing_bluetooth_devices_screen';

  static const String moreDeviceAppearFoundingScreen =
      '/more_device_appear_founding_screen';

  static const String moreDeviceOneConnectScreen =
      '/more_device_one_connect_screen';

  static const String loginScreen = '/login_screen';

  static const String login1Screen = '/login1_screen';

  static const String appNavigationScreen = '/app_navigation_screen';

  static String initialRoute = '/initialRoute';
  static String homeScreen = '/home_screen';
  static String mainScreen = '/main_screen';

  static List<GetPage> pages = [
    // GetPage(
    //   name: allowPermissionBluetoothScreen,
    //   page: () => AllowPermissionBluetoothScreen(),
    //   bindings: [
    //     AllowPermissionBluetoothBinding(),
    //   ],
    // ),
    GetPage(
      name: registerScreen,
      page: () => RegisterScreen(),

    ),
    GetPage(
      name: homeScreen,
      page: () => HomeScreen(),
    ),
    GetPage(
      name: mainScreen,
      page: () => MainScreen(),
    ),
    // GetPage(
    //   name: scanningBluetoothDeviceScreen,
    //   page: () => ScanningBluetoothDeviceScreen(),
    //   bindings: [
    //     ScanningBluetoothDeviceBinding(),
    //   ],
    // ),
    // GetPage(
    //   name: listingBluetoothDevicesScreen,
    //   page: () => ListingBluetoothDevicesScreen(),
    //   bindings: [
    //     ListingBluetoothDevicesBinding(),
    //   ],
    // ),
    GetPage(
      name: loginScreen,
      page: () => LoginScreen(),

    ),
    GetPage(
      name: login1Screen,
      page: () => Login1Screen(),

    ),
    GetPage(
      name: initialRoute,
      page: () => LoginScreen(),

    )
  ];
}
