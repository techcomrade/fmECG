import 'dart:io';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FilesManagement {
  static Future<String> get _pathToSaveData async {
    final directoryToSaveFile = await getApplicationDocumentsDirectory();
    // final directoryToSaveFile = await getExternalStorageDirectory();
    // final directoryToSaveFile = Directory("/storage/self/primary/fm_ECG");
    // Directory("/storage/self/primary/fm_ECG");
    final directoryToSaveData = directoryToSaveFile.path + '/fmECG_data';
    return directoryToSaveData;
  }

  static setUpFileToSaveDataMeasurement() async {
    final directoryPath = await _pathToSaveData;
    final String fileNameAsTimestamp = Utils.getCurrentTimestamp().toString();
    return File('$directoryPath/$fileNameAsTimestamp.csv');
  }

  static void createDirectoryFirstTimeWithDevice() async {
    // final directoryPath = "/storage/self/primary/fm_ECG";
    final directoryPath = await _pathToSaveData;
    Directory(directoryPath).createSync(recursive: true);
  }

  static convertRowToStringBeforeSaving(List<dynamic> row) {
    String dataRow = row.join(",");
    return dataRow;
  }

  static void appendDataToFile(File file, List<dynamic> row) async {
    String data = convertRowToStringBeforeSaving(row);
    data = data + "\n"; //xuống dòng khi lưu dữ liệu 1 row
    await file.writeAsString(data, mode: FileMode.append);
    print('successful');
  }

  static void saveFilePathCaseNoInternet(String filePath) async {
    const String keyToSave = "files_not_upload";
    final SharedPreferences preferences = await SharedPreferences.getInstance();
    String existingFilePath;
    
    if (preferences.containsKey(keyToSave)) {
      existingFilePath = preferences.getString(keyToSave)!;
      existingFilePath = existingFilePath + '\n$filePath';
      preferences.setString(keyToSave, existingFilePath);
    } else {
      existingFilePath = filePath;
      preferences.setString(keyToSave, existingFilePath);
    }
  }
}