import 'package:bluetooth_ecg/contants/color_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:flutter/material.dart';

class AppDecoration {
  static BoxDecoration get fillGray50 => BoxDecoration(
        color: ColorConstant.gray50,
      );
  static BoxDecoration get fillDeeppurpleA200 => BoxDecoration(
        color: ColorConstant.deepPurpleA200,
      );
  static BoxDecoration get txtFillDeeppurpleA200 => BoxDecoration(
        color: ColorConstant.deepPurpleA200,
      );
  static BoxDecoration get fillBlack900 => BoxDecoration(
        color: ColorConstant.black900,
      );
  static BoxDecoration get fillBlack90016 => BoxDecoration(
        color: ColorConstant.black90016,
      );
  static BoxDecoration get outlineBlack9000f => BoxDecoration(
        color: ColorConstant.whiteA700,
        boxShadow: [
          BoxShadow(
            color: ColorConstant.black9000f,
            spreadRadius: getHorizontalSize(
              2.00,
            ),
            blurRadius: getHorizontalSize(
              2.00,
            ),
            offset: Offset(
              0,
              -20,
            ),
          ),
        ],
      );
  static BoxDecoration get fillWhiteA700 => BoxDecoration(
        color: ColorConstant.whiteA700,
      );
  static BoxDecoration get fillBluegray10001 => BoxDecoration(
        color: ColorConstant.blueGray10001,
      );
  static BoxDecoration get fillGray80014 => BoxDecoration(
        color: ColorConstant.gray80014,
      );
}

class BorderRadiusStyle {
  static BorderRadius roundedBorder8 = BorderRadius.circular(
    getHorizontalSize(
      8.00,
    ),
  );

  static BorderRadius customBorderTL50 = BorderRadius.only(
    topLeft: Radius.circular(
      getHorizontalSize(
        50.00,
      ),
    ),
    topRight: Radius.circular(
      getHorizontalSize(
        50.00,
      ),
    ),
  );

  static BorderRadius txtRoundedBorder24 = BorderRadius.circular(
    getHorizontalSize(
      24.00,
    ),
  );

  static BorderRadius customBorderLR8 = BorderRadius.only(
    topRight: Radius.circular(
      getHorizontalSize(
        8.00,
      ),
    ),
    bottomRight: Radius.circular(
      getHorizontalSize(
        8.00,
      ),
    ),
  );

  static BorderRadius customBorderBR29 = BorderRadius.only(
    topLeft: Radius.circular(
      getHorizontalSize(
        18.00,
      ),
    ),
    topRight: Radius.circular(
      getHorizontalSize(
        18.00,
      ),
    ),
    bottomLeft: Radius.circular(
      getHorizontalSize(
        27.00,
      ),
    ),
    bottomRight: Radius.circular(
      getHorizontalSize(
        29.00,
      ),
    ),
  );
}
