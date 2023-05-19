import 'dart:convert';

HardwareDevice hardwareDeviceFromJson(String str) => HardwareDevice.fromJson(json.decode(str));

String hardwareDeviceToJson(HardwareDevice data) => json.encode(data.toJson());

class HardwareDevice {
    int id;
    String name;
    String type;

    HardwareDevice({
        required this.id,
        required this.name,
        required this.type,
    });

    factory HardwareDevice.fromJson(Map<String, dynamic> json) => HardwareDevice(
        id: json["id"],
        name: json["name"],
        type: json["type"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "type": type,
    };
}