
import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ECGFilesController {
  static Future<void> uploadFileToDB(Map fileUploadInformation) async {
    final url = APIConstant.apiUrlProduction + 'ecg-records/upload';

    final String filePath = fileUploadInformation["filePath"];
    final int userId = fileUploadInformation["userId"];
    final int deviceId = fileUploadInformation["deviceId"];
    final DateTime startTime = fileUploadInformation["startTime"];
    final DateTime stopTime = fileUploadInformation["stopTime"];

    FormData fileToUpload = FormData.fromMap({
      'file': await MultipartFile.fromFile(filePath, filename: filePath.split('/').last),
      'user_id': userId,
      'device_id': deviceId,
      'start_time': startTime,
      'stop_time': stopTime,
      'sensor_type': "ECG"
    });
    try {
      final response = await Dio().post(url, data: fileToUpload);
      print('response:$response');
    } catch (e) {
      // save filePath to preferences
      FilesManagement.saveFilePathCaseNoInternet(filePath);
      print('error when upload file: $e');
    }
  }
}