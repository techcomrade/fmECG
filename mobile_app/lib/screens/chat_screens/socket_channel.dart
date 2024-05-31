import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';

class SocketChannel extends ChangeNotifier {
  WebSocketChannel? _channel;
  List<String> _messages = [];

  List<String> get messages => _messages;

  void connect() {
    _channel = IOWebSocketChannel.connect('ws://your-websocket-url/myhandler');
    _channel!.stream.listen((message) {
      _messages.add(message);
      notifyListeners();
    }, onDone: () {
      _channel = null;
      notifyListeners();
    }, onError: (error) {
      print(error);
    });
  }

  void sendMessage(String message) {
    _channel?.sink.add(message);
  }

  void disconnect() {
    _channel?.sink.close();
  }
}
