import 'package:shared_preferences/shared_preferences.dart';

class SharedPreprerencesRepo {
  static void saveInfor(String token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('token', token);
//print("shared" + prefs.getString("token")!);
  }

  static Future<String> getInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? "";
  }

  static Future<bool> autoLogin() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') != null;
  }

  static void deleteInfor(String id) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('token');
  }
}
