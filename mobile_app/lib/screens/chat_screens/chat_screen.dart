import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:bluetooth_ecg/providers/socketchannel_provider.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    final socketChannelProvider = Provider.of<SocketChannelProvider>(context);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.blue,
        toolbarHeight: size.height * 0.1,
        title: Row(
          children: [
            Image.asset('assets/images/doctor.png', height: 40), // Meta-like logo
            const SizedBox(width: 8),
            const Text("Tin nhắn", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: socketChannelProvider.messages.length,
              itemBuilder: (context, index) {
                final message = socketChannelProvider.messages[index];
                return Align(
                  alignment: message.isCurrentUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                    decoration: BoxDecoration(
                      color: message.isCurrentUser ? Colors.blue : Colors.grey[300],
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (!message.isCurrentUser) Text(message.sender, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        Text(
                          message.text,
                          style: TextStyle(color: message.isCurrentUser ? Colors.white : Colors.black),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      labelText: 'Gửi tin nhắn',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20)),
                      ),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () {
                    if (_controller.text.isNotEmpty) {
                      socketChannelProvider.sendMessage(_controller.text);
                      _controller.clear();
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
