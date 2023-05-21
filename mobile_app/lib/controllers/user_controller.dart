import 'package:bluetooth_ecg/contants/api_constant.dart';
import 'package:http/http.dart' as http;

Future<void> loginUser(String email, String password) async {
    // call API with email and password
    String url = APIConstant.apiUrl + '/login';
    try {
      final response = await http.post(Uri.parse('url'), 
        headers: APIConstant.headers,
        body: {'email': email, 'password': password}
      );
      // final responseData = response.body;
      // if (responseData["success"]) {
      //   // do something with data
      // }
    } catch (err) {
      print('error from login: $err');
    }
  }

  Future<void> registerUser() async {
    // call API with email and password
    String url = APIConstant.apiUrl + '/login';
    try {
      final response = await http.post(Uri.parse('url'), 
        headers: APIConstant.headers,
        // body: {'email': email, 'password': password}
      );
      // final responseData = response.body;
      // if (responseData["success"]) {
      //   // do something with data
      // }
    } catch (err) {
      print('error from login: $err');
    }
  }