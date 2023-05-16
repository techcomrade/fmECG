
import 'package:bluetooth_ecg/routes/app_routes.dart';
import 'package:bluetooth_ecg/theme/app_decoration.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/util/color_constant.dart';
import 'package:bluetooth_ecg/util/image_constant.dart';
import 'package:bluetooth_ecg/util/size_utils.dart';
import 'package:bluetooth_ecg/util/validation_functions.dart';
import 'package:bluetooth_ecg/view/custom_image_view.dart';
import 'package:bluetooth_ecg/view/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:flutter/cupertino.dart';

// ignore_for_file: must_be_immutable
class RegisterScreen extends StatelessWidget {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
            resizeToAvoidBottomInset: false,
            backgroundColor: ColorConstant.deepPurpleA200,
            body: Form(
                key: _formKey,
                child: Container(
                    width: size.width,
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Container(
                              width: size.width,
                              margin: getMargin(top: 52),
                              padding: getPadding(top: 21, bottom: 21),
                              decoration: AppDecoration.outlineBlack9000f
                                  .copyWith(
                                      borderRadius:
                                          BorderRadiusStyle.customBorderTL50),
                              child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    // CustomAppBar(
                                    //     height: getVerticalSize(56.00),
                                    //     leadingWidth: 40,
                                    //     leading: AppbarImage(
                                    //         height: getSize(24.00),
                                    //         width: getSize(24.00),
                                    //         svgPath: ImageConstant.imgArrowleft,
                                    //         margin: getMargin(left: 16),
                                    //         onTap: onTapArrowleft),
                                    //     title: AppbarTitle(
                                    //         text: "Register as a New User",
                                    //         margin: getMargin(left: 12))),
                                    Padding(
                                        padding: getPadding(left: 24, top: 0),
                                        child: Text("Details",
                                            overflow: TextOverflow.ellipsis,
                                            textAlign: TextAlign.left,
                                            style: AppStyle.txtPoppinsBold24
                                                .copyWith(
                                                    height: getVerticalSize(
                                                        1.00)))),
                                    CustomTextFormField(
                                        width: 305,
                                        focusNode: FocusNode(),
                                        controller: null,
                                        hintText: "Stuart Kearns",
                                        margin: getMargin(left: 24, top: 10)),
                                    CustomTextFormField(
                                        width: 305,
                                        focusNode: FocusNode(),
                                        controller: null,
                                        hintText: "test@gmail.com",
                                        margin: getMargin(left: 24, top: 10),
                                        textInputType:
                                            TextInputType.emailAddress,
                                        validator: (value) {
                                          if (value == null ||
                                              (!isValidEmail(value,
                                                  isRequired: true))) {
                                            return "Please enter valid email";
                                          }
                                          return null;
                                        }),
                                    CustomTextFormField(
                                        width: 305,
                                        focusNode: FocusNode(),
                                        controller:
                                            null,
                                        hintText: "91 234 5678 90",
                                        margin: getMargin(left: 24, top: 10),
                                        padding:
                                            TextFormFieldPadding.PaddingT16),
                                    CustomTextFormField(
                                        width: 305,
                                        focusNode: FocusNode(),
                                        controller:
                                            null,
                                        hintText: "***************",
                                        margin: getMargin(left: 24, top: 10),
                                        padding:
                                            TextFormFieldPadding.PaddingT11,
                                        textInputType:
                                            TextInputType.visiblePassword,
                                        suffix: InkWell(
                                            onTap: () {
                                              // controller.isShowPassword.value =
                                              //     !controller
                                              //         .isShowPassword.value;
                                            },
                                            child: Container(
                                                margin: getMargin(
                                                    left: 30,
                                                    top: 10,
                                                    right: 17,
                                                    bottom: 18),
                                                child: CustomImageView(
                                                    svgPath:
                                                        //  ImageConstant
                                                        //     .imgInstagram
                                                        // :
                                                    ImageConstant
                                                            .imgInstagram))),
                                        suffixConstraints: BoxConstraints(
                                            maxHeight: getVerticalSize(58.00)),
                                        validator: (value) {
                                          if (value == null ||
                                              (!isValidPassword(value,
                                                  isRequired: true))) {
                                            return "Please enter valid password";
                                          }
                                          return null;
                                        },
                                        // isObscureText:
                                        //     !controller.isShowPassword.value
                                    ),

                                    CustomTextFormField(
                                        width: 305,
                                        focusNode: FocusNode(),
                                        // controller:
                                        //     controller.passwordOneController,
                                        hintText: "*************",
                                        margin: getMargin(left: 24, top: 10),
                                        padding:
                                            TextFormFieldPadding.PaddingT11,
                                        textInputAction: TextInputAction.done,
                                        textInputType:
                                            TextInputType.visiblePassword,
                                        suffix: InkWell(
                                            onTap: () {
                                              // controller.isShowPassword1.value =
                                              //     !controller
                                              //         .isShowPassword1.value;
                                            },
                                            child: Container(
                                                margin: getMargin(
                                                    left: 30,
                                                    top: 14,
                                                    right: 13,
                                                    bottom: 15),
                                                child: CustomImageView(
                                                    // svgPath: controller
                                                    //         .isShowPassword1
                                                    //         .value
                                                    //     ? ImageConstant
                                                    //         .imgCheckmark
                                                    //     : ImageConstant
                                                    //         .imgCheckmark
                                                ))),
                                        suffixConstraints: BoxConstraints(
                                            maxHeight: getVerticalSize(58.00)),
                                        validator: (value) {
                                          if (value == null ||
                                              (!isValidPassword(value,
                                                  isRequired: true))) {
                                            return "Please enter valid password";
                                          }
                                          return null;
                                        },
                                        // isObscureText:
                                        //     !controller.isShowPassword1.value
                                    ),
                                    Padding(
                                        padding: getPadding(left: 10, top: 10),
                                        child: Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              CustomImageView(
                                                  svgPath: ImageConstant
                                                      .imgCheckmarkBlack900,
                                                  height:
                                                      getVerticalSize(30.00),
                                                  width:
                                                      getHorizontalSize(29.00),
                                                  margin:
                                                      getMargin(bottom: 33)),
                                              Container(
                                                  width:
                                                      getHorizontalSize(206.00),
                                                  margin: getMargin(
                                                      left: 10, top: 4),
                                                  child: RichText(
                                                      text: TextSpan(children: [
                                                        TextSpan(
                                                            text:
                                                                "I accept terms and conditions for this app. \n",
                                                            style: TextStyle(
                                                                color: ColorConstant
                                                                    .fromHex(
                                                                        "#000000"),
                                                                fontSize:
                                                                    getFontSize(
                                                                        15),
                                                                fontFamily:
                                                                    'ABeeZee',
                                                                fontWeight:
                                                                    FontWeight
                                                                        .w400,
                                                                height:
                                                                    getVerticalSize(
                                                                        1.00))),
                                                        TextSpan(
                                                            text:
                                                                "Terms & Conditions",
                                                            style: TextStyle(
                                                                color: ColorConstant
                                                                    .fromHex(
                                                                        "#7041ee"),
                                                                fontSize:
                                                                    getFontSize(
                                                                        15),
                                                                fontFamily:
                                                                    'Poppins',
                                                                fontWeight:
                                                                    FontWeight
                                                                        .w700,
                                                                height:
                                                                    getVerticalSize(
                                                                        1.00)))
                                                      ]),
                                                      textAlign:
                                                          TextAlign.center))
                                            ])),
                                    GestureDetector(
                                      onTap: () => onTapArrowleft(),
                                      child: Align(
                                          alignment: Alignment.center,
                                          child: Container(
                                              width: getHorizontalSize(305.00),
                                              margin:
                                                  getMargin(top: 10, bottom: 42),
                                              padding: getPadding(
                                                  left: 0,
                                                  top: 12,
                                                  right: 0,
                                                  bottom: 12),
                                              decoration: AppDecoration
                                                  .txtFillDeeppurpleA200
                                                  .copyWith(
                                                      borderRadius:
                                                          BorderRadiusStyle
                                                              .txtRoundedBorder24),
                                              child: Text("Proceed",
                                                  overflow: TextOverflow.ellipsis,
                                                  textAlign: TextAlign.center,
                                                  style: AppStyle.txtPoppinsBold20
                                                      .copyWith(
                                                          height: getVerticalSize(
                                                              1.00))))),
                                    )
                                  ]))
                        ])))));
  }

  onTapArrowleft() {
    Get.toNamed(AppRoutes.moreDeviceAppearFoundingScreen);
  }
}
