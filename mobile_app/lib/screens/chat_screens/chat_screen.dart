import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  WebSocketChannel? channel;
  TextEditingController nameController = TextEditingController();
  TextEditingController messageController = TextEditingController();
  List<Map<String, dynamic>> messages = [];
  String? username;
  bool isConnected = false;

  @override
  void dispose() {
    channel?.sink.close();
    super.dispose();
  }

  void connect() {
    if (nameController.text.isNotEmpty) {
      setState(() {
        username = nameController.text;
        isConnected = true;
      });

      channel = WebSocketChannel.connect(Uri.parse('ws://10.0.2.2:8080/ws'));
      channel!.sink.add(json.encode({'sender': username, 'type': 'JOIN'}));

      channel!.stream.listen((data) {
        Map<String, dynamic> message = json.decode(data);
        setState(() {
          messages.add(message);
        });
      }, onError: onError);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Username cannot be empty')),
      );
    }
  }

  void sendMessage() {
    if (messageController.text.isNotEmpty && channel != null) {
      var chatMessage = {
        'sender': username,
        'content': messageController.text,
        'type': 'CHAT'
      };
      channel!.sink.add(json.encode(chatMessage));
      setState(() {
        messages.add(chatMessage);
      });
      messageController.clear();
    }
  }

  void onError(error) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Could not connect to WebSocket server. Please try again later!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Flutter WebSocket Chat')),
      body: isConnected ? chatPage() : usernamePage(),
    );
  }

  Widget usernamePage() {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Enter Username'),
            ),
            ElevatedButton(onPressed: connect, child: Text('Start Chatting'))
          ],
        ),
      ),
    );
  }

  Widget chatPage() {
    return Column(
      children: [
        Expanded(
          child: ListView.builder(
            itemCount: messages.length,
            itemBuilder: (context, index) {
              return ListTile(
                leading: CircleAvatar(
                  backgroundImage: AssetImage('assets/images/doctor.png'),
                ),
                title: Text(messages[index]['sender']),
                subtitle: Text(messages[index]['content']),
              );
            },
          ),
        ),
        Padding(
          padding: EdgeInsets.all(8.0),
          child: TextField(
            controller: messageController,
            decoration: InputDecoration(
              labelText: 'Send a message',
              suffixIcon: IconButton(
                icon: Icon(Icons.send),
                onPressed: sendMessage,
              ),
            ),
          ),
        ),
      ],
    );
  }
}