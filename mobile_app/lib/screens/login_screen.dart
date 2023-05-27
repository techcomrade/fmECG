import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/utils/image_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/components/custom_button.dart';
import 'package:bluetooth_ecg/components/custom_image_view.dart';
import 'package:bluetooth_ecg/utils/utils.dart';

import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Utils.setGlobalContext(context);
    return SafeArea(
        child: Scaffold(
            backgroundColor: ColorConstant.quinary,
            body: Container(
                width: size.width,
                padding: getPadding(left: 23, right: 23),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                          height: getVerticalSize(319.00),
                          width: getHorizontalSize(327.00),
                          margin: getMargin(top: 25),
                          child: Stack(
                              alignment: Alignment.bottomCenter,
                              children: [
                                Align(
                                    alignment: Alignment.topCenter,
                                    child: Container(
                                        height: getVerticalSize(265.00),
                                        width: getHorizontalSize(327.00),
                                        child: Stack(
                                            alignment: Alignment.topCenter,
                                            children: [
                                              CustomImageView(
                                                  imagePath: ImageConstant
                                                      .imgA02cedc29b0e04b9b07dcd,
                                                  height:
                                                      getVerticalSize(225.00),
                                                  width:
                                                      getHorizontalSize(325.00),
                                                  alignment:
                                                      Alignment.bottomCenter),
                                              CustomImageView(
                                                  imagePath: ImageConstant
                                                      .imgA02cedc29b0e04b9b07dcd,
                                                  height:
                                                      getVerticalSize(225.00),
                                                  width:
                                                      getHorizontalSize(325.00),
                                                  alignment:
                                                      Alignment.topCenter)
                                            ]))),
                                Align(
                                    alignment: Alignment.bottomCenter,
                                    child: Text("IOT",
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.left,
                                        style: AppStyle.txtABeeZeeRegular62
                                            .copyWith(
                                                height: getVerticalSize(1.00))))
                              ])),
                      Padding(
                          padding: getPadding(top: 12),
                          child: Text("Your Everday consumption record!",
                              overflow: TextOverflow.ellipsis,
                              textAlign: TextAlign.left,
                              style: AppStyle.txtABeeZeeRegular20
                                  .copyWith(height: getVerticalSize(1.00)))),
                      Spacer(),
                      CustomButton(
                          height: 58,
                          width: 305,
                          text: "Get started",
                          variant: ButtonVariant.FillDeeppurpleA200,
                          shape: ButtonShape.RoundedBorder24,
                          fontStyle: ButtonFontStyle.PoppinsBold20,
                          onTap: onTapGetstarted),
                      CustomButton(
                          height: 58,
                          width: 305,
                          text: "Login",
                          margin: getMargin(top: 16),
                          variant: ButtonVariant.FillWhiteA700,
                          shape: ButtonShape.RoundedBorder24,
                          fontStyle:
                              ButtonFontStyle.PoppinsBold20DeeppurpleA200,
                          onTap: onTapLogin),
                      Padding(
                          padding: getPadding(top: 34),
                          child: RichText(
                              text: TextSpan(children: [
                                TextSpan(
                                    text: "New around here?",
                                    style: TextStyle(
                                        color: ColorConstant.fromHex("#2d2626"),
                                        fontSize: getFontSize(15),
                                        fontFamily: 'ABeeZee',
                                        fontWeight: FontWeight.w400,
                                        height: getVerticalSize(1.00))),
                                TextSpan(
                                    text: " ",
                                    style: TextStyle(
                                        color: ColorConstant.fromHex("#fa4f3b"),
                                        fontSize: getFontSize(15),
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.w700,
                                        height: getVerticalSize(1.00))),
                                TextSpan(
                                    text: "Sign in",
                                    style: TextStyle(
                                        color: ColorConstant.fromHex("#7041ee"),
                                        fontSize: getFontSize(15),
                                        fontFamily: 'Poppins',
                                        fontWeight: FontWeight.w700,
                                        height: getVerticalSize(1.00)))
                              ]),
                              textAlign: TextAlign.left))
                    ]))));
  }

  onTapGetstarted() {
    Get.toNamed(AppRoutes.registerScreen);
  }

  onTapLogin() {
    Get.toNamed(AppRoutes.login1Screen);
  }
}
