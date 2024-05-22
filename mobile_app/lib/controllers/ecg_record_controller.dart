
import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/utils/files_management.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';
import 'package:provider/provider.dart';

ECGProvider ecgProvider = Utils.globalContext!.read<ECGProvider>();

class ECGRecordController {
  static Future<void> uploadFileToDB(Map fileUploadInformation) async {
    final url = APIConstant.apiUrlProduction + 'api/record';

    final String filePath = fileUploadInformation["file_path"];
    final MultipartFile fileData = await MultipartFile.fromFile(
      filePath, 
      filename: filePath.split('/').last,
      contentType: MediaType('text', 'csv')
    );
    FormData fileToUpload = FormData.fromMap({
      ...fileUploadInformation,
      "file": fileData,
    });
    try {
      final response = await Dio().post(url, data: fileToUpload);
    } catch (e, t) {
      // save filePath to preferences
      FilesManagement.saveFilePathCaseNoInternet(filePath);
      print('error when upload file: $e $t');
    }
  }

  static Future<void> getAllECGRecords(int userId) async {
    try {
      final String url = APIConstant.apiUrlProduction + 'ecg-records/patient/$userId';
      final Response response = await Dio().get(url);

      final responseData = response.data;
      if (responseData["status"] == "success") {
        List ecgRecordsPreview = responseData["data"];
        ecgProvider.setECGRecordsPreview(ecgRecordsPreview);
      }
    } catch (e) {
      print('error when get all records: $e');
    }
  }

  static Future<void> getDataECGRecordById(int recordId) async {
    try {
      final String url = APIConstant.apiUrlProduction + 'ecg-records/record-data/$recordId';

      final Response response = await Dio().get(url);
      final responseData = response.data;
      if (responseData["status"] == "success") {
        List ecgRecordData = responseData["data"];
        ecgProvider.setECGRecordDataSelected(ecgRecordData);
      }
    } catch (e) {
      print('error when get all records: $e');
    }
  }
}