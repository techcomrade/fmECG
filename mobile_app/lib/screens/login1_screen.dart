
import 'package:bluetooth_ecg/components/submit_button.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/utils/validation.dart';
import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import '../theme/app_decoration.dart';
import '../theme/app_style.dart';

class Login1Screen extends StatelessWidget {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final paddingLoginHorizontal30 = const EdgeInsets.symmetric(horizontal: 30);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.white,
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // logo
                // welcome
                Text("Welcome!", 
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                    color: ColorConstant.quaternary
                  )
                ),
                const SizedBox(height: 10),
                Text("To fmECG!", 
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                    color: ColorConstant.quaternary
                  )
                ),

                // 2 input
                const SizedBox(height: 80),
                Container(
                  decoration: BoxDecoration(
                    color: ColorConstant.quinary,
                    borderRadius: BorderRadius.circular(12)
                  ),
                  margin: paddingLoginHorizontal30,
                  child: TextFormField(
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Email",
                      hintStyle: TextStyle(color: ColorConstant.quaternary, fontWeight: FontWeight.bold, fontSize: 16),
                      contentPadding: const EdgeInsets.only(left: 20, top: 20, bottom: 20)
                    ),
                  ),
                ),
          
                const SizedBox(height: 10),
                Container(
                  decoration: BoxDecoration(
                    color: ColorConstant.quinary,
                    borderRadius: BorderRadius.circular(12)
                  ),
                  margin: paddingLoginHorizontal30,
                  child: TextFormField(
                    obscureText: true,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Password",
                      hintStyle: TextStyle(color: ColorConstant.quaternary, fontWeight: FontWeight.bold, fontSize: 16),
                      contentPadding: const EdgeInsets.only(left: 20, top: 20, bottom: 20)
                    ),
                  ),
                ),

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
}
