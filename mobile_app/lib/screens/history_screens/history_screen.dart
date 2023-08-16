import 'package:bluetooth_ecg/controllers/ecg_record_controller.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/providers/ecg_provider.dart';
import 'package:bluetooth_ecg/screens/history_screens/history_record_chart.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

class HistoryScreen extends StatefulWidget {
  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  @override
  void initState() {
    super.initState();
    getAllRecords();
  }

  void getAllRecords() async {
    final int userId = await Utils.getUserId();
    final int roleId = context.read<AuthProvider>().roleId;
    if (roleId == 0) {
      ECGRecordController.getAllECGRecords(userId);
    } else if (roleId == 1) {
      ECGRecordController.getAllECGRecordByDoctor(userId);
    }
  }

  @override
  Widget build(BuildContext context) {
    final List allECGRecordsPreview = context.watch<ECGProvider>().ecgRecordsPreview;
    final int roleId = context.read<AuthProvider>().roleId;

      return Scaffold(
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(left: 16.0, top: 30.0),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'History',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            SizedBox(height: 16),
            if (allECGRecordsPreview.isNotEmpty)
            Expanded(
              // child: ListView(
              //   padding: EdgeInsets.all(16),
              //   children: [
              //     buildHistoryCard(1, 'Input Text', '2023-06-27'),
              //     SizedBox(height: 16),
              //     buildHistoryCard(2, 'Input Text', '2023-06-26'),
              //     SizedBox(height: 16),
              //     buildHistoryCard(3, 'Input Text', '2023-06-25'),
              //     SizedBox(height: 16),
              //     buildHistoryCard(4, 'Input Text', '2023-06-24'),
              //     SizedBox(height: 16),
              //     buildHistoryCard(5, 'Input Text', '2023-06-23'),
              //     SizedBox(height: 16),
              //     // buildLastRectangle(),
              //   ],
              // ),
              child: ListView.builder(
                itemCount: allECGRecordsPreview.length,
                itemBuilder: (contextECGRecords, index) {
                  if (roleId != 0) {
                    return ExpansionTile(
                      title: Text("${ allECGRecordsPreview[index]["user_id"]}"),
                      children: 
                        allECGRecordsPreview[index]["data"].map<Widget>((record) {
                          final recordId = record["record_id"];
                          final String recordName = record["data_directory"]
                                                    .split("/").last.split('.').first;
                          final DateTime recordCreatedAt = DateTime.parse(record["start_time"]);
                          final String recordCreatedFormat = DateFormat("EEEE, dd-MM-yyyy", "vi").format(recordCreatedAt);
                          return buildHistoryCard(recordId, recordName, recordCreatedFormat);
                        }).toList()
                    );
                  } else {
                    final int recordId = allECGRecordsPreview[index]["record_id"];
                    final String recordName = allECGRecordsPreview[index]["data_directory"]
                                              .split("/").last.split('.').first;
                    final DateTime recordCreatedAt = DateTime.parse(allECGRecordsPreview[index]["created_at"]);
                    final String recordCreatedFormat = DateFormat("EEEE, dd-MM-yyyy", "vi").format(recordCreatedAt);

                    return buildHistoryCard(recordId, recordName, recordCreatedFormat);
                  }
                },
              ),
            ),
          ],
        ),
    );
  }

  Widget buildHistoryCard(int recordId, String inputText, String date) {
    return InkWell(
      onTap: () {
        Navigator.push(context,
          MaterialPageRoute(
            builder: (context) => HistoryRecordChart(recordId: recordId),
          )
        );
      },
      child: Container(
        padding: EdgeInsets.all(16),
        margin: EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              blurRadius: 5,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.grey[200],
              ),
              child: Center(
                child: Icon(
                  Icons.favorite_border,
                  color: Color.fromARGB(255, 57, 5, 243),
                  size: 30,
                ),
              ),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$inputText $recordId',
                    style: TextStyle(fontSize: 14),
                  ),
                  SizedBox(height: 8),
                  Text(
                    '$date',
                    style: TextStyle(fontSize: 14),
                  ),
                ],
              ),
            ),
            SizedBox(width: 16),
            Container(
              width: 100,
              height: 40,
              decoration: BoxDecoration(
                color: Colors.black,
                borderRadius: BorderRadius.circular(15),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.check, color: Colors.white),
                  SizedBox(width: 4),
                  Text(
                    '$recordId BPM',
                    style: TextStyle(color: Colors.white, fontSize: 12),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildLastRectangle() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 5,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(5.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              icon: Icon(Icons.home),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.bar_chart),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.chat),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.people),
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}