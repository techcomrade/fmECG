class APIConstant {
  static String apiUrl = "http://192.168.1.7:2000/";
  static String apiUrlProduction = "http://54.179.77.166/";

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