import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

// cách dùng
// đọc docs DIO trước khi sử dụng: https://pub.dev/packages/dio
// đọc thêm bài này để hiểu interceptor: https://viblo.asia/p/dio-flutter-tim-hieu-ve-interceptor-trong-dio-va-trien-khai-co-che-authentication-018J2vzqJYK
// với request cần auth: sử dụng dioConfigInterceptor.post/get/put/delete
// với request không cần auth: sử dụng Dio().post/get/put/delete

final dioConfigInterceptor = Dio()
  ..options.baseUrl = Utils.apiUrl
  ..options.connectTimeout = const Duration(seconds: 8)
  ..options.receiveTimeout = const Duration(seconds: 20)
  ..options.sendTimeout = const Duration(seconds: 15)
  ..interceptors.add(tokenInterceptor);

final Interceptor tokenInterceptor = QueuedInterceptorsWrapper(
  onRequest: (options, handler) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? accessToken = prefs.getString('access_token');
    final String? refreshToken = prefs.getString('refresh_token');
    final int? accessExp = prefs.getInt('access_exp');
    if (accessToken == null || accessExp == null || refreshToken == null) {
      // logout
      return;
    }

    final int now = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    final bool isExpired = now > accessExp;
    if (isExpired) {
      final retryDio = Dio()
        ..options.baseUrl = options.baseUrl
        ..options.headers['Authorization'] = "Bearer $refreshToken";
      final Response res = await retryDio.post("/auth/renew_access_token", data: {});
      final bool isRefreshSuccess = res.data["success"] == true;
      if (!isRefreshSuccess) {
        // print('false with logout');
        // logout
        // await AuthRepository.logoutNoCredentials();
      } else {
        // await AuthRepository.saveTokenDataIntoPrefs(res.data["data"]);
        final String accessToken = res.data["data"]["access_token"];
        options.headers['Authorization'] = "Bearer $accessToken";
      }
    } else {
      options.headers['Authorization'] = "Bearer $accessToken";
    }
    return handler.next(options);
  },

  onResponse: (response, handler) {
    // print('responseee:${response.data}');
    return handler.next(response);
  },

  onError: (error, handler) {
    print('errorr:${error.response?.data}');
    return handler.next(error);
  }
);

