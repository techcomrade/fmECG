
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/utils/image_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/utils/validation.dart';
import 'package:bluetooth_ecg/components/custom_image_view.dart';
import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import '../theme/app_decoration.dart';
import '../theme/app_style.dart';

class Login1Screen extends StatelessWidget {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: ColorConstant.gray50,
        body: Form(
          key: _formKey,
          child: Container(
            width: size.width,
            padding: getPadding(
              top: 57,
              bottom: 57,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Spacer(),
                Text(
                  "Sign in",
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.left,
                  style: AppStyle.txtPoppinsBold36.copyWith(
                    height: getVerticalSize(
                      1.00,
                    ),
                  ),
                ),
                // CustomTextFormField(
                //   width: 305,
                //   focusNode: FocusNode(),
                //   controller: null,
                //   hintText: "Sign in with Apple",
                //   margin: getMargin(
                //     top: 32,
                //   ),
                //   variant: TextFormFieldVariant.FillWhiteA700,
                //   padding: TextFormFieldPadding.PaddingT10,
                //   fontStyle: TextFormFieldFontStyle.PoppinsBold20,
                //   prefix: Container(
                //     margin: getMargin(
                //       left: 24,
                //       top: 15,
                //       right: 30,
                //       bottom: 19,
                //     ),
                //     child: CustomImageView(
                //       svgPath: ImageConstant.imgFire,
                //     ),
                //   ),
                //   prefixConstraints: BoxConstraints(
                //     maxHeight: getVerticalSize(
                //       58.00,
                //     ),
                //   ),
                // ),
                // CustomTextFormField(
                //   width: 305,
                //   focusNode: FocusNode(),
                //   controller: null,
                //   hintText: "Sign in with Google",
                //   margin: getMargin(
                //     top: 16,
                //   ),
                //   variant: TextFormFieldVariant.FillWhiteA700,
                //   padding: TextFormFieldPadding.PaddingT10,
                //   fontStyle: TextFormFieldFontStyle.PoppinsBold20,
                //   prefix: Container(
                //     margin: getMargin(
                //       left: 24,
                //       top: 18,
                //       right: 25,
                //       bottom: 19,
                //     ),
                //     child: CustomImageView(
                //       svgPath: ImageConstant.imgGoogle,
                //     ),
                //   ),
                //   prefixConstraints: BoxConstraints(
                //     maxHeight: getVerticalSize(
                //       58.00,
                //     ),
                //   ),
                // ),
                // Padding(
                //   padding: getPadding(
                //     top: 1,
                //   ),
                //   child: Text(
                //     "Insert your Logins Details",
                //     overflow: TextOverflow.ellipsis,
                //     textAlign: TextAlign.left,
                //     style: AppStyle.txtABeeZeeItalic15Black9007e.copyWith(
                //       height: getVerticalSize(
                //         1.00,
                //       ),
                //     ),
                //   ),
                // ),
                CustomTextFormField(
                  width: 305,
                  focusNode: FocusNode(),
                  controller: null,
                  hintText: "Enter Your Email",
                  margin: getMargin(
                    top: 15,
                  ),
                  variant: TextFormFieldVariant.FillWhiteA700,
                  padding: TextFormFieldPadding.PaddingT16,
                  textInputType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null ||
                        (!isValidEmail(value, isRequired: true))) {
                      return "Please enter valid email";
                    }
                    return null;
                  },
                ),
                CustomTextFormField(
                  width: 305,
                  focusNode: FocusNode(),
                  controller: null,
                  hintText: "Enter Your Password",
                  margin: getMargin(
                    top: 9,
                  ),
                  variant: TextFormFieldVariant.FillWhiteA700,
                  padding: TextFormFieldPadding.PaddingT16,
                  textInputAction: TextInputAction.done,
                  textInputType: TextInputType.visiblePassword,
                  validator: (value) {
                    if (value == null ||
                        (!isValidPassword(value, isRequired: true))) {
                      return "Please enter valid password";
                    }
                    return null;
                  },
                  isObscureText: true,
                ),
                Container(
                  width: getHorizontalSize(
                    305.00,
                  ),
                  margin: getMargin(
                    top: 14,
                  ),
                  padding: getPadding(
                    left: 30,
                    top: 10,
                    right: 91,
                    bottom: 10,
                  ),
                  decoration: AppDecoration.txtFillDeeppurpleA200.copyWith(
                    borderRadius: BorderRadiusStyle.txtRoundedBorder24,
                  ),
                  child: Text(
                    "Login Now",
                    overflow: TextOverflow.ellipsis,
                    textAlign: TextAlign.left,
                    style: AppStyle.txtPoppinsBold20.copyWith(
                      height: getVerticalSize(
                        1.00,
                      ),
                    ),
                  ),
                ),
                Container(
                  height: getVerticalSize(
                    1.00,
                  ),
                  width: size.width,
                  margin: getMargin(
                    top: 38,
                  ),
                  decoration: BoxDecoration(
                    color: ColorConstant.gray90063,
                  ),
                ),
                Container(
                  width: getHorizontalSize(
                    137.00,
                  ),
                  margin: getMargin(
                    top: 20,
                  ),
                  child: RichText(
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: "If you are New user\n",
                          style: TextStyle(
                            color: ColorConstant.fromHex("#000000"),
                            fontSize: getFontSize(
                              15,
                            ),
                            fontFamily: 'ABeeZee',
                            fontWeight: FontWeight.w400,
                            height: getVerticalSize(
                              1.00,
                            ),
                          ),
                        ),
                        TextSpan(
                          text: "Register Now",
                          style: TextStyle(
                            color: ColorConstant.fromHex("#7041ee"),
                            fontSize: getFontSize(
                              15,
                            ),
                            fontFamily: 'Poppins',
                            fontWeight: FontWeight.w700,
                            height: getVerticalSize(
                              1.00,
                            ),
                          ),
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
