class APIConstant {
  static String apiUrl = "http://192.168.1.7:2000/";
  static String apiUrlProduction = "http://103.200.20.59:3000/";
  static String socketUrl = 'ws://192.168.1.3:4000/socket/websocket';
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
