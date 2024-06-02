import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';

class Message {
  final String text;
  final String sender;
  final bool isCurrentUser;

  Message({required this.text, required this.sender, required this.isCurrentUser});

  factory Message.fromJson(Map<String, dynamic> json, String currentUserEmail) {
    return Message(
      text: json['text'],
      sender: json['sender'],
      isCurrentUser: json['sender'] == currentUserEmail,
    );
  }
}

class SocketChannelProvider extends ChangeNotifier {
  WebSocketChannel? _channel;
  List<Message> _messages = [];
  final String _currentUserEmail;

  SocketChannelProvider(this._currentUserEmail);

  List<Message> get messages => _messages;

  void connect() {
    _channel = IOWebSocketChannel.connect('ws://192.168.153.241:8080/myhandler');
    _channel!.stream.listen((message) {
      Map<String, dynamic> messageData = json.decode(message);
      _messages.add(Message.fromJson(messageData, _currentUserEmail));
      notifyListeners();
    }, onDone: () {
      _channel = null;
      notifyListeners();
    }, onError: (error) {
      print(error);
    });
  }

  void sendMessage(String message) {
    // Assuming the server expects JSON with a 'text' field
    _channel?.sink.add(json.encode({'text': message, 'sender': _currentUserEmail}));
  }

  void disconnect() {
    _channel?.sink.close();
  }
}
