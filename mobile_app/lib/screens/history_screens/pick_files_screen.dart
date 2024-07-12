import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class PickFiles extends StatefulWidget {
  const PickFiles({super.key});

  @override
  State<PickFiles> createState() => _PickFilesState();
}

class _PickFilesState extends State<PickFiles> {
  static const platform = MethodChannel("com.example.method_channel/java");
  List<String?> pickedFilesPath = [];
  String pythonModulePath = "";
  List<String?> txtFilePaths = [];

  void chooseFilePaths() async {
    final FilePickerResult? result =
        await FilePicker.platform.pickFiles(allowMultiple: true);
    final bool canAddPath = result != null && !result.paths.contains(null);
    if (canAddPath) {
      setState(() {
        pickedFilesPath = result.paths;
      });
    }
  }

  void choosePythonModulePath() async {
    final FilePickerResult? result = await FilePicker.platform
        .pickFiles();
    final bool canAddPath =
        result != null && !result.paths.contains(null) && result.isSinglePick && result.files.first.extension == "py";
    if (canAddPath) {
      print('sdgndjkd:${result.files.first.extension}');
      setState(() {
        pythonModulePath = result.paths.first!;
      });
    }
  }

  void chooseTxtFilePaths() async {
    final FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['txt', 'csv'],
        allowMultiple: true);
    final bool canAddPath = result != null && !result.paths.contains(null);
    if (canAddPath) {
      setState(() {
        txtFilePaths = result.paths;
      });
    }
  }

  void sendDataToNativePython() async {
    final bool cannotSend = pythonModulePath == "" || txtFilePaths.contains(null) || txtFilePaths.length != 2;
    if (cannotSend) return;
    // TODO: Show error in here
    final Map pathContext = {
      'python_path': pythonModulePath,
      'pcg_path': txtFilePaths[0],
      'ppg_path': txtFilePaths[1]
    };
    final Map? dataProcessed = await platform.invokeMethod('transfer_context_to_python', pathContext);
    print('gnjgdf:$dataProcessed');
  }

  @override
  Widget build(BuildContext context) {
    final String txtPath = txtFilePaths.join(", ");

    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        InkWell(
          onTap: choosePythonModulePath,
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 6, horizontal: 4),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              color: Colors.blue,
            ),
            child: Text("Get path Python"),
          ),
        ),
        const SizedBox(height: 4),
        Text("$pythonModulePath"),
        const SizedBox(height: 10),
        InkWell(
          onTap: chooseTxtFilePaths,
          child: Container(
              padding: EdgeInsets.symmetric(vertical: 6, horizontal: 4),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(4),
                color: Colors.blue,
              ),
              child: Text("Get path txt file")),
        ),
        const SizedBox(height: 4),
        Text("$txtPath"),
        const SizedBox(height: 20,),
        InkWell(
          onTap: sendDataToNativePython,
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 6, horizontal: 4),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              color: Colors.blue,
            ),
            child: Text("Send to Python Native")
          ),
        )
      ],
    ));
  }
}
