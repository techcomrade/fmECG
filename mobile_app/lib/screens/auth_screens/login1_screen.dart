import 'package:bluetooth_ecg/components/submit_button.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Login1Screen extends StatefulWidget {
  const Login1Screen({Key? key}) : super(key: key);

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
  bool showLoginError = true; // Thêm biến showLoginError và khởi tạo là false

  final paddingLoginHorizontal30 = const EdgeInsets.symmetric(horizontal: 30);

  @override
  void initState() {
    super.initState();
  }

  void _loginUser() async {
    final AuthProvider authProvider = context.read<AuthProvider>();
    if (loginProcess) return;
    setState(() {
      loginProcess = true; // Ẩn thông báo lỗi trước khi thực hiện đăng nhập
    });
    final form = _formKey.currentState;
    if (form != null && form.validate()) {
      try {
        // Thử đăng nhập, nhưng không có giá trị trả về để kiểm tra thành công
        await authProvider.loginUser(
            _emailController.text, _passwordController.text);
        // Nếu hàm đăng nhập không ném ra một exception, thì cho rằng thành công
        setState(() {
          showLoginError =
              false; // Đặt showLoginError thành false nếu đăng nhập thành công
        });
      } catch (e) {
        // Xử lý bất kỳ exception nào xảy ra trong quá trình đăng nhập
        print('Exception during login: $e'); // In ra exception để debug
        setState(() {
          showLoginError =
              true; // Hiển thị thông báo lỗi trong trường hợp có exception
        });
      } finally {
        setState(() {
          loginProcess = false;
        });
      }
    } else {
      setState(() {
        loginProcess = false;
        showLoginError =
            true; // Đặt showLoginError thành true nếu form không hợp lệ
      });
    }
  }

  Widget _formLoginUser() {
    print('showLoginError: $showLoginError');
    return Form(
        key: _formKey,
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                  color: ColorConstant.quinary,
                  borderRadius: BorderRadius.circular(12)),
              margin: paddingLoginHorizontal30,
              child: TextFormField(
                controller: _emailController,
                focusNode: focusNodeEmail,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: "Email",
                    hintStyle: TextStyle(
                        color: ColorConstant.quaternary,
                        fontWeight: FontWeight.bold,
                        fontSize: 16),
                    contentPadding:
                        const EdgeInsets.only(left: 20, top: 20, bottom: 20)),
              ),
            ),
            const SizedBox(height: 10),
            Container(
              decoration: BoxDecoration(
                  color: ColorConstant.quinary,
                  borderRadius: BorderRadius.circular(12)),
              margin: paddingLoginHorizontal30,
              child: TextFormField(
                obscureText: true,
                controller: _passwordController,
                focusNode: focusNodePassword,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: "Password",
                    hintStyle: TextStyle(
                        color: ColorConstant.quaternary,
                        fontWeight: FontWeight.bold,
                        fontSize: 16),
                    contentPadding:
                        const EdgeInsets.only(left: 20, top: 20, bottom: 20)),
              ),
            ),
            if (!showLoginError)
              // Display error message if needed
              const Padding(
                padding: EdgeInsets.only(top: 8.0),
                child: Text(
                  'Tài khoản hoặc mật khẩu không đúng',
                  style: TextStyle(color: Colors.red),
                ),
              ),
          ],
        ));
  }

  @override
  void dispose() {
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
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
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
                  color: ColorConstant.quaternary)),
          // 2 input
          const SizedBox(height: 80),
          _formLoginUser(),

          // forgot password
          const SizedBox(height: 15),
          Container(
            margin: paddingLoginHorizontal30,
            alignment: Alignment.centerRight,
            child: Text(
              "Forgot password?",
              style: TextStyle(
                  color: ColorConstant.primary, fontWeight: FontWeight.bold),
            ),
          ),

          // button login
          const SizedBox(height: 50),
          Container(
              margin: paddingLoginHorizontal30,
              child: loginProcess
                  ? CircularProgressIndicator(color: ColorConstant.primary)
                  : SubmitButton(onTap: _loginUser, text: "Login")),

          const SizedBox(height: 50),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Don't have an account?"),
              Text(
                "  Sign up",
                style: TextStyle(
                    color: ColorConstant.primary, fontWeight: FontWeight.bold),
              )
            ],
          )
        ]),
      )),
    ));
  }
}
