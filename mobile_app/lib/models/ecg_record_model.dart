import 'dart:convert';

EcgRecord ecgRecordFromJson(String str) => EcgRecord.fromJson(json.decode(str));

String ecgRecordToJson(EcgRecord data) => json.encode(data.toJson());

class EcgRecord {
    int id;
    String name;
    String dataDirectory;

    EcgRecord({
        required this.id,
        required this.name,
        required this.dataDirectory,
    });

    factory EcgRecord.fromJson(Map<String, dynamic> json) => EcgRecord(
        id: json["id"],
        name: json["name"],
        dataDirectory: json["data_directory"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "data_directory": dataDirectory,
    };
}