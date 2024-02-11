import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/firebase_messages_controller.dart';
import 'package:bluetooth_ecg/providers/auth_provider.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';

class ChatDetailScreen extends StatefulWidget {
  const ChatDetailScreen({Key? key, required this.conversation})
      : super(key: key);

  final Map conversation;

  @override
  _ChatDetailScreenState createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends State<ChatDetailScreen> {
  Stream<QuerySnapshot>? messageStream;
  final TextEditingController _textMessageController = TextEditingController();
  final ScrollController _messageScrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    getMessageStream();
  }

  void getMessageStream() async {
    messageStream = await FmECGFirebaseMessage()
        .getMessageConversation(widget.conversation["conversation_id"]);
    setState(() {});
  }

  void _scrollToBottom() {
    _messageScrollController.animateTo(
      _messageScrollController.position.maxScrollExtent + 60.0,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size;
    final userId = context.read<AuthProvider>().userId;
    print('userId:$userId');
    return Scaffold(
        backgroundColor: ColorConstant.quinary,
        body: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Container(
                height: screenSize.height * 0.085,
                padding: const EdgeInsets.symmetric(horizontal: 10),
                decoration: BoxDecoration(color: Colors.grey[300]),
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                          onPressed: () => Navigator.pop(context),
                          icon: Icon(PhosphorIcons.regular.arrowArcLeft)),
                      Text('Bác sĩ Thái',
                          style: TextStyle(
                            color: ColorConstant.primary,
                            fontSize: 26,
                          )),
                      Align(
                        alignment: Alignment.centerRight,
                        child: Container(
                          alignment: Alignment.centerRight,
                          height: 35,
                          width: 35,
                          decoration: BoxDecoration(
                            color: ColorConstant.gray80014,
                            borderRadius: BorderRadius.circular(25),
                          ),
                          child: IconButton(
                              onPressed: () {},
                              icon: Icon(
                                PhosphorIcons.regular.phone,
                                color: ColorConstant.black900,
                                size: 20,
                              )),
                        ),
                      )
                    ]),
              ),
              Expanded(
                child: Column(
                  children: [
                    StreamBuilder<QuerySnapshot>(
                        stream: messageStream,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            final List messages = snapshot.data!.docs
                                .map((document) => document.data())
                                .toList();

                            return Expanded(
                              child: ConstrainedBox(
                                constraints: BoxConstraints(
                                    maxHeight: screenSize.height * 0.8),
                                child: Align(
                                  alignment: Alignment.bottomCenter,
                                  child: ListView.builder(
                                    physics: const ClampingScrollPhysics(),
                                    controller: _messageScrollController,
                                    shrinkWrap: true,
                                    itemCount: messages.length,
                                    itemBuilder: (context, index) {
                                      final message = messages[index];
                                      final bool isSender =
                                          message["sender_id"] == userId;
                                      return MessageTile(
                                          message: message["message_content"],
                                          sender: "Thai",
                                          sentByMe: isSender);
                                    },
                                  ),
                                ),
                              ),
                            );
                          } else {
                            return const CircularProgressIndicator();
                          }
                        }),
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                      Container(
                        width: screenSize.width - 80,
                        height: screenSize.height * 0.06,
                        margin: const EdgeInsets.only(right: 5, top: 2),
                        child: CupertinoTextField(
                          controller: _textMessageController,
                          prefix: Icon(PhosphorIcons.regular.smiley,
                              size: 30, color: ColorConstant.black900),
                          // hintText: 'Nhập tin nhắn',
                          suffix: IconButton(
                            icon: Icon(
                              PhosphorIcons.regular.camera,
                              color: ColorConstant.black900,
                              size: 30,
                            ),
                            onPressed: () {},
                          ),
                        ),
                      ),
                      Container(
                        decoration: BoxDecoration(
                            color: ColorConstant.primary,
                            borderRadius: BorderRadius.circular(50)),
                        child: IconButton(
                          icon: Icon(PhosphorIcons.regular.paperPlaneRight,
                              color: ColorConstant.whiteA700, size: 25),
                          onPressed: () async {
                            final conversationId =
                                widget.conversation["conversation_id"];
                            final String messageContent =
                                _textMessageController.text;
                            final messageId = Utils.getRandomNumber(4);
                            final timeSent = DateTime.now().toUtc();

                            Map<String, dynamic> message = {
                              'conversation_id': conversationId,
                              'message_content': messageContent,
                              'message_id': messageId,
                              'sender_id': userId,
                              'sent_at': FieldValue.serverTimestamp()
                            };
                            await FmECGFirebaseMessage()
                                .sendMessageConversation(message);
                            _textMessageController.clear();
                            _scrollToBottom();
                          },
                        ),
                      )
                    ])
                  ],
                ),
              ),
            ],
          ),
        ));
  }
}

class MessageTile extends StatefulWidget {
  final String message;
  final String sender;
  final bool sentByMe;

  const MessageTile(
      {Key? key,
      required this.message,
      required this.sender,
      required this.sentByMe})
      : super(key: key);

  @override
  State<MessageTile> createState() => _MessageTileState();
}

class _MessageTileState extends State<MessageTile> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
          top: 4,
          bottom: 4,
          left: widget.sentByMe ? 0 : 24,
          right: widget.sentByMe ? 24 : 0),
      alignment: widget.sentByMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: widget.sentByMe
            ? const EdgeInsets.only(left: 30)
            : const EdgeInsets.only(right: 30),
        padding:
            const EdgeInsets.only(top: 17, bottom: 17, left: 20, right: 20),
        decoration: BoxDecoration(
            borderRadius: widget.sentByMe
                ? const BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                    bottomLeft: Radius.circular(20),
                  )
                : const BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                    bottomRight: Radius.circular(20),
                  ),
            color: widget.sentByMe
                ? Theme.of(context).primaryColor
                : Colors.grey[700]),
        child: Text(widget.message,
            textAlign: TextAlign.start,
            style: const TextStyle(fontSize: 16, color: Colors.white)),
      ),
    );
  }
}
