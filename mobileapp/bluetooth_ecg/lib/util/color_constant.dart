import 'dart:ui';
import 'package:flutter/material.dart';

class ColorConstant {
  static Color black9007e = fromHex('#7e000000');

  static Color blueGray100 = fromHex('#cfcfcf');

  static Color gray500 = fromHex('#979797');

  static Color blueGray10066 = fromHex('#66d9d9d9');

  static Color blueGray10001 = fromHex('#d9d9d9');

  static Color gray900 = fromHex('#191919');

  static Color gray90001 = fromHex('#2c2929');

  static Color black9000f = fromHex('#0f000000');

  static Color gray80014 = fromHex('#14444444');

  static Color blueA200 = fromHex('#4285f4');

  static Color gray50 = fromHex('#fafbfd');

  static Color black900 = fromHex('#000000');

  static Color gray9007e = fromHex('#7e2c2929');

  static Color bluegray400 = fromHex('#888888');

  static Color gray50033 = fromHex('#33979797');

  static Color deepPurpleA200 = fromHex('#7041ee');

  static Color gray90063 = fromHex('#632c2929');

  static Color whiteA700 = fromHex('#ffffff');

  static Color black90016 = fromHex('#16000000');

  static Color fromHex(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }
}
