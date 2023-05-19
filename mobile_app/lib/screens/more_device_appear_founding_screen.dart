
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/theme/app_decoration.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/utils/color_constant.dart';
import 'package:bluetooth_ecg/utils/image_constant.dart';
import 'package:bluetooth_ecg/utils/size_utils.dart';
import 'package:bluetooth_ecg/components/custom_button.dart';
import 'package:bluetooth_ecg/components/custom_image_view.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';

class MoreDeviceAppearFoundingScreen
    extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            backgroundColor: ColorConstant.whiteA700,
            body: Container(
                width: size.width,
                padding: getPadding(all: 8),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Padding(
                          padding: getPadding(top: 10),
                          child: Text("Intelli - chair",
                              overflow: TextOverflow.ellipsis,
                              textAlign: TextAlign.left,
                              style: AppStyle.txtManropeBold24
                                  .copyWith(height: getVerticalSize(1.00)))),
                      Container(
                          width: getHorizontalSize(250.00),
                          margin: getMargin(top: 13),
                          child: Text("Welcome Username. Now let’s connect your wheelchair using:",
                              maxLines: null,
                              textAlign: TextAlign.center,
                              style: AppStyle.txtManropeRegular14Gray500
                                  .copyWith(height: getVerticalSize(1.00)))),
                      Container(
                          height: getVerticalSize(400.00),
                          width: getHorizontalSize(300.00),
                          margin: getMargin(top: 20),
                          child: Stack(alignment: Alignment.center, children: [
                            Align(
                                alignment: Alignment.topCenter,
                                child: Padding(
                                    padding: getPadding(right:0, top: 10),
                                    child: Text("Dicoverable Bluetooth devices",
                                        overflow: TextOverflow.ellipsis,
                                        textAlign: TextAlign.left,
                                        style: AppStyle.txtManropeRegular14
                                            .copyWith(
                                                height:
                                                    getVerticalSize(1.00))))),
                            Align(
                                alignment: Alignment.center,
                                child: Container(
                                    padding: getPadding(
                                        left: 18,
                                        top: 10,
                                        right: 18,
                                        bottom: 10),
                                    decoration: AppDecoration.fillGray80014
                                        .copyWith(
                                            borderRadius: BorderRadiusStyle
                                                .customBorderBR29),
                                    child: Column(
                                        mainAxisSize: MainAxisSize.min,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        children: [
                                          CustomImageView(
                                              svgPath:
                                                  ImageConstant.imgBluetooth,
                                              height: getSize(24.00),
                                              width: getSize(24.00),
                                              ),
                                          Container(
                                              height: getVerticalSize(1.00),
                                              width: getHorizontalSize(321.00),
                                              margin:
                                                  getMargin(left: 1, top: 10),
                                              decoration: BoxDecoration(
                                                  color:
                                                      ColorConstant.gray50033)),
                                          GestureDetector(
                                              onTap: () {
                                                onTapRowintellichairone();
                                              },
                                              child: Container(
                                                  margin: getMargin(
                                                      left: 1, top: 10),
                                                  decoration: AppDecoration
                                                      .fillBluegray10001
                                                      .copyWith(
                                                          borderRadius:
                                                              BorderRadiusStyle
                                                                  .roundedBorder8),
                                                  child: Row(
                                                      mainAxisAlignment:
                                                          MainAxisAlignment
                                                              .spaceBetween,
                                                      children: [
                                                        Padding(
                                                            padding: getPadding(
                                                                left: 12,
                                                                top: 13,
                                                                bottom: 12),
                                                            child: Text(
                                                                "Intelli - chair G0011aswrdf",
                                                                overflow:
                                                                    TextOverflow
                                                                        .ellipsis,
                                                                textAlign:
                                                                    TextAlign
                                                                        .left,
                                                                style: AppStyle
                                                                    .txtManropeRegular12
                                                                    .copyWith(
                                                                        height:
                                                                            getVerticalSize(1.00)))),
                                                        CustomButton(
                                                            height: 43,
                                                            width: 82,
                                                            text: "lbl_connect")
                                                      ]))),
                                          Container(
                                              margin:
                                                  getMargin(left: 1, top: 10),
                                              decoration: AppDecoration
                                                  .fillBluegray10001
                                                  .copyWith(
                                                      borderRadius:
                                                          BorderRadiusStyle
                                                              .roundedBorder8),
                                              child: Row(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Padding(
                                                        padding: getPadding(
                                                            left: 12,
                                                            top: 13,
                                                            bottom: 12),
                                                        child: Text(
                                                            "Unknown name",
                                                            overflow:
                                                                TextOverflow
                                                                    .ellipsis,
                                                            textAlign:
                                                                TextAlign.left,
                                                            style: AppStyle
                                                                .txtManropeRegular12
                                                                .copyWith(
                                                                    height: getVerticalSize(
                                                                        1.00)))),
                                                    CustomButton(
                                                        height: 43,
                                                        width: 82,
                                                        text: "Connect")
                                                  ])),
                                          Container(
                                              margin:
                                                  getMargin(left: 1, top: 14),
                                              decoration: AppDecoration
                                                  .fillBluegray10001
                                                  .copyWith(
                                                      borderRadius:
                                                          BorderRadiusStyle
                                                              .roundedBorder8),
                                              child: Row(
                                                  mainAxisAlignment:
                                                      MainAxisAlignment
                                                          .spaceBetween,
                                                  children: [
                                                    Padding(
                                                        padding: getPadding(
                                                            left: 12,
                                                            top: 13,
                                                            bottom: 12),
                                                        child: Text(
                                                            "JBL-B2019",
                                                            overflow:
                                                                TextOverflow
                                                                    .ellipsis,
                                                            textAlign:
                                                                TextAlign.left,
                                                            style: AppStyle
                                                                .txtManropeRegular12
                                                                .copyWith(
                                                                    height: getVerticalSize(
                                                                        1.00)))),
                                                    CustomButton(
                                                        height: 43,
                                                        width: 82,
                                                        text: "Connect")
                                                  ])),

                                          Spacer(),
                                          Align(
                                              alignment: Alignment.center,
                                              child: Padding(
                                                  padding:
                                                      getPadding(bottom: 12),
                                                  child: Text(
                                                      "Scanning your devices ...",
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      textAlign: TextAlign.left,
                                                      style: AppStyle
                                                          .txtManropeRegular14
                                                          .copyWith(
                                                              height:
                                                                  getVerticalSize(
                                                                      1.00)))))
                                        ])))
                          ]))
                    ]))));
  }

  onTapRowintellichairone() {
    Get.toNamed(AppRoutes.moreDeviceOneConnectScreen);
  }
}
