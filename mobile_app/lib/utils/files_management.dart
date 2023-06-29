import 'dart:io';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:path_provider/path_provider.dart';

class FilesManagement {
  static Future<String> get _pathToSaveData async {
    final directory = await getApplicationDocumentsDirectory();
    final directoryToSaveData = directory.path + '/fmECG_data';
    print('directory:$directoryToSaveData');
    return directoryToSaveData;
  }

  static setUpFileToSaveDataMeasurement() async {
    final directoryPath = await _pathToSaveData;
    final String fileNameAsTimestamp = Utils.getCurrentTimestamp().toString();
    return File('$directoryPath/$fileNameAsTimestamp.csv');
  }

  static void createDirectoryFirstTimeWithDevice() async {
    final directoryPath = await _pathToSaveData;
    Directory(directoryPath).createSync(recursive: true);
  }

  static convertRowToStringBeforeSaving(List<double> row) {
    String dataRow = row.join(" ");
    return dataRow;
  }

  static void appendDataToFile(File file, List<double> row) async {
    String data = convertRowToStringBeforeSaving(row);
    data = data + "\n"; //xuống dòng khi lưu dữ liệu 1 row
    await file.writeAsString(data, mode: FileMode.append);
    print('successful');
  }
}