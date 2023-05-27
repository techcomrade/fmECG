import 'package:bluetooth_ecg/components/submit_button.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/auth_controller.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:bluetooth_ecg/utils/validation.dart';
import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
class Login1Screen extends StatefulWidget {
  @override
  State<Login1Screen> createState() => _Login1ScreenState();
}

class _Login1ScreenState extends State<Login1Screen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  FocusNode focusNodeEmail = FocusNode();
  FocusNode focusNodePassword = FocusNode();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool loginProcess = false;

  final paddingLoginHorizontal30 = const EdgeInsets.symmetric(horizontal: 30);

  @override
  void initState() {
    super.initState();
  }

  void _loginUser() async {
    final AuthProvider authProvider = context.read<AuthProvider>();
    try {
      if (loginProcess) return;
      setState(() {
        loginProcess = true;
      });
      final form = _formKey.currentState;
      form!.save();

      // if (form.validate() && Validators.isValidEmail(_emailController.text) && Validators.isValidPassword(_passwordController.text)) {
      if (form.validate()) {
        await authProvider.loginUser(_emailController.text, _passwordController.text);
      } else {
        print('show dialog or ...');
      }
      setState(() {
        loginProcess = false;
      });
    } catch (e) {
      setState(() {
        loginProcess = false;
      });
    }
  }

  Widget _formLoginUser() {
    return Form(
      key: _formKey,
      child: Column(children: [
        Container(
          decoration: BoxDecoration(
            color: ColorConstant.quinary,
            borderRadius: BorderRadius.circular(12)
          ),
          margin: paddingLoginHorizontal30,
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
          margin: paddingLoginHorizontal30,
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
      ],)
    );
  }

  @override
  void dispose(){
    _emailController.dispose();
    _passwordController.dispose();
    focusNodeEmail.dispose();
    focusNodePassword.dispose();
    super.dispose();
  }

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
                _formLoginUser(),

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
                  child: SubmitButton(onTap: _loginUser, text: "Login")
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
