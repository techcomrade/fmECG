import 'package:bluetooth_ecg/components/submit_button.dart';
import 'package:bluetooth_ecg/generated/l10n.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/theme/app_decoration.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/utils/validation.dart';
import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:provider/provider.dart';

// ignore_for_file: must_be_immutable
class RegisterScreen extends StatefulWidget {
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final paddingLoginHorizontal30 = const EdgeInsets.symmetric(horizontal: 30);
  bool isSigningUp = false; 

  GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  FocusNode focusNodeEmail = FocusNode();
  FocusNode focusNodePassword = FocusNode();
  FocusNode focusNodeConfirmPassword = FocusNode();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  bool loginProcess = false;

  void _signUpUser() async {
    final AuthProvider authProvider = context.read<AuthProvider>();
    try {
      if (isSigningUp) return;
      setState(() {
        isSigningUp = true;
      });
      final form = _formKey.currentState;
      form!.save();

      // if (form.validate() && Validators.isValidEmail(_emailController.text) && Validators.isValidPassword(_passwordController.text)) {
      if (form.validate()) {
        await authProvider.registerUser(_emailController.text, _passwordController.text);
      } else {
        print('show dialog or ...');
      }
      setState(() {
        isSigningUp = false;
      });
    } catch (e) {
      setState(() {
        isSigningUp = false;
      });
    }
  }

  Widget _formSignUpUser() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: ColorConstant.quinary,
              borderRadius: BorderRadius.circular(12)
            ),
            child: TextFormField(
              controller: _emailController,
              focusNode: focusNodeEmail,
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
            child: TextFormField(
              obscureText: true,
              controller: _passwordController,
              focusNode: focusNodePassword,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: "Password",
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
            child: TextFormField(
              obscureText: true,
              controller: _confirmPasswordController,
              focusNode: focusNodeConfirmPassword,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: "Confirm password",
                hintStyle: TextStyle(color: ColorConstant.quaternary, fontWeight: FontWeight.bold, fontSize: 16),
                contentPadding: const EdgeInsets.only(left: 20, top: 20, bottom: 20)
              ),
            ),
          ),
        ],
      )
    );
  }


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        backgroundColor: Colors.white,
        body: Center(
          child: SingleChildScrollView(
            child: Container(
              margin: paddingLoginHorizontal30,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // logo
                  const Image(
                    image: AssetImage("assets/images/fm_ecg.png"),
                    height: 100,  
                  ),
                  // welcome
                  Text(S.current.registration, 
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                      color: ColorConstant.quaternary
                    )
                  ),
                  const SizedBox(height: 15),
                  Text("Please enter your email or mobile number\nto sign up", 
                    style: TextStyle(
                      fontSize: 15,
                      color: ColorConstant.description
                    )
                  ),
                  // 2 input
                  const SizedBox(height: 30),
                  _formSignUpUser(),
                  const SizedBox(height: 20),
            
                  // button login 
                  SubmitButton(onTap: () {}, text: "Proceed"),
            
                  const SizedBox(height: 50),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                    Text("Already have an account?"),
                    Text("  Login", style: TextStyle(color: ColorConstant.primary, fontWeight: FontWeight.bold),)
                  ],)
                ]
              ),
            ),
          ),
        ),
      )
    );
  }

  onTapArrowLeft() {
    Get.toNamed(AppRoutes.moreDeviceAppearFoundingScreen);
  }
}
