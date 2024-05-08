import 'dart:async';
import 'dart:convert';

import 'package:bluetooth_ecg/constants/api_constant.dart';
import 'package:web_socket_channel/io.dart';

class SocketChannel {
  late IOWebSocketChannel _socketChannel;
  Timer? _heartbeatTimer;

  connect() async {
    try {
      // TODO: update lai token theo App
      String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiODM1NzM0MjEtOTk0My00YTI1LTlmZTEtMDBmMDQ3N2FhYmE0IiwiZXhwIjoxNzEzNjcwMjczLCJpYXQiOjE3MTM2NjY2NzN9.iPjn54pGQgaYJXPZV5yDo5HbRZeT588UjzJ3B0AKGFs";
      final wsUrl = Uri.parse("${APIConstant.socketUrl}?token=$token");
      _socketChannel = IOWebSocketChannel.connect(wsUrl);
      await _socketChannel.ready;
      print("WebSocket is connected at ${DateTime.now()}");

      _listenConnection();
      _joinTopicSocketChannel();
      _startHeartbeat();   
    } catch (e, t) {
      print('connect socket error: $e $t');
    }
  }

  _listenConnection() {
    _socketChannel.stream.listen((message) {
        print('okeee:$message');
        _handleEventSocket(message);
      },
      onDone: () {
        print("WebSocket is closed at ${DateTime.now()}");
        _handleDisconnect();
      },
      onError: (err) => print("errsocket: $err")
    );
  }

  _handleEventSocket(message) {
    try {
      var decodedMessage = json.decode(message);
      String eventType = decodedMessage['event'];

      if (eventType == "phx_reply") {
        _handleUnmatchedTopic(decodedMessage["payload"]);
      }
    } catch (e, t) {
      print("cannot handle event socket:$e $t");
    }
  }

  _handleUnmatchedTopic(payload) {
    try {
      Map response = payload["response"] ?? {};
      final status = payload["status"];

      if (status == "error" && response["reason"] == "unmatched topic") {
        _joinTopicSocketChannel();
      }
    } catch (e, t) {
      print("cannot handle unmatched topic socket:$e $t");
    }
  }

  _joinTopicSocketChannel() {
    // TODO: update lai userId theo App
    String userId = "83573421-9943-4a25-9fe1-00f0477aaba4";
    String topic = "message:$userId";

    final Map<String, dynamic> joinMessage = {
      'topic': topic,
      'event': 'phx_join',
      'payload': {
        "hi": "test"
      },
      'ref': ''
    };

    _socketChannel.sink.add(json.encode(joinMessage));
  }

  void _startHeartbeat() {
    _heartbeatTimer?.cancel();
    _heartbeatTimer = Timer.periodic(const Duration(seconds: 15), (timer) {
      _sendHeartbeat();
    });
  }

  Future<void> _sendHeartbeat() async {
    pushEventSocket(event: 'ping', payload: {'type': 'heartbeat'});
  }

  _handleDisconnect() {
    _socketChannel.innerWebSocket?.close();
    _socketChannel.sink.close();
  }

  void pushEventSocket({String event = "", Map payload = const {}}) {
    // TODO: update lai userId theo App
    String userId = "83573421-9943-4a25-9fe1-00f0477aaba4";
    String topic = "message:$userId";

    final Map<String, dynamic> message = {
      'topic': topic,
      'event': event,
      'payload': payload,
      'ref': ''
    };
    _socketChannel.sink.add(json.encode(message));
  }
}