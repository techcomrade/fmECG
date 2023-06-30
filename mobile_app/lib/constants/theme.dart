import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:flutter/material.dart';

class ThemeECG {
  static ThemeData lightTheme = ThemeData(
    primaryColor: ColorConstant.primary,
    scaffoldBackgroundColor: ColorConstant.quinary,
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: Colors.red,
    ),
    iconTheme: IconThemeData(
      color: Colors.red,
    ),
    colorScheme: ColorScheme.light(
    ),
    // appBarTheme: AppBarTheme(
    //   backgroundColor: ColorConstant.primary,
    //   elevation: 1
    // ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: Colors.black,
      selectedItemColor: ColorConstant.primary,
      unselectedItemColor: ColorConstant.quaternary
    ),
    fontFamily: "AvenirNext"
  );

  static ThemeData darkTheme = ThemeData(
    // brightness: Brightness.dark,
    scaffoldBackgroundColor: ColorConstant.quaternary,
    primaryColor: ColorConstant.quaternary,
    colorScheme: ColorScheme.dark(
      primary: ColorConstant.quaternary,
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      selectedItemColor: ColorConstant.primary,
      unselectedItemColor: Colors.white,
    ),
    buttonTheme: ButtonThemeData(
      buttonColor: Colors.red
    ),
    fontFamily: "AvenirNext"
  );
}