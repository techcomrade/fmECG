class APIConstant {
  static String apiUrl = '';

  static getDebugMode() {
    assert(() {
      // development 
      // apiUrl = 'https://192.168.1.216:6001/api/';

      // debug
      // apiUrl = 'https://chat.pancake.vn/api/';
      return true;
    }());
  }

  static const headers = <String, String>{
    'Content-Type': 'application/json; charset=UTF-8'
  };
}