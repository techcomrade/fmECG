
import 'package:bluetooth_ecg/components/submit_button.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/theme/app_decoration.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/utils/image_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/utils/validation.dart';
import 'package:bluetooth_ecg/components/custom_image_view.dart';
import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';

// ignore_for_file: must_be_immutable
class RegisterScreen extends StatefulWidget {
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final paddingLoginHorizontal30 = const EdgeInsets.symmetric(horizontal: 30);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: ColorConstant.quinary,
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // logo
                const Image(
                  image: AssetImage("assets/images/fm_ecg.png"),
                  height: 100,  
                ),
                // welcome
                Text("Welcome to fmECG!", 
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                    color: ColorConstant.quaternary
                  )
                ),
                // 2 input
                const SizedBox(height: 80),
                // _formLoginUser(),

                // forgot password
                const SizedBox(height: 15),
                Container(
                  margin: paddingLoginHorizontal30,
                  alignment: Alignment.centerRight,
                  child: Text("Forgot password?",
                    style: TextStyle(color: ColorConstant.primary, fontWeight: FontWeight.bold),
                  ),
                ),

                // button login 
                const SizedBox(height: 50),
                Container(
                  margin: paddingLoginHorizontal30,
                  child: SubmitButton(onTap: () {}, text: "Login")
                ),

                const SizedBox(height: 50),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                  Text("Don't have an account?"),
                  Text("  Sign up", style: TextStyle(color: ColorConstant.primary, fontWeight: FontWeight.bold),)
                ],)
              ]
            ),
          ) 
        ),
      )
    );
  }

  onTapArrowLeft() {
    Get.toNamed(AppRoutes.moreDeviceAppearFoundingScreen);
  }
}
