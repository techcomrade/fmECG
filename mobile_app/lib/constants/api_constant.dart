class APIConstant {
  static String apiUrl = "http://192.168.1.218:2000/";

  // static getDebugMode() {
  //   assert(() {
  //     // debug 
  //     apiUrl = 'http://localhost:2000/';

  //     // development
  //     // apiUrl = 'https://abcdef.vn/api/';
  //     return true;
  //   }());
  // }

  static const headers = <String, String>{
    'Content-Type': 'application/json;charset=UTF-8'
  };
}