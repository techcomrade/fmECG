import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/firebase_messages_controller.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class ChatDetailScreen extends StatefulWidget {
  const ChatDetailScreen({
    Key? key, 
    required this.conversation
  }) : super(key: key);

  final Map conversation;

  @override
  _ChatDetailScreenState  createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends State<ChatDetailScreen> {
  Stream<QuerySnapshot>? messageStream;
  final TextEditingController _textMessageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    getMessageStream();
  }

  void getMessageStream() async {
    messageStream = await FmECGFirebaseMessage().getMessageConversation();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final Size screenSize = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: ColorConstant.quinary,            
      body: ConstrainedBox(
        constraints: BoxConstraints(maxHeight: MediaQuery.of(context).size.height),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.fromLTRB(150, 35, 15,0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                // IconButton(
                //   onPressed:(){},
                //   icon:Icon(PhosphorIcons.regular.arrowFatLeft)
                // ),
                Text('Bác sĩ A',
                style: TextStyle(
                  color: ColorConstant.primary ,
                  fontSize: 26,
                )),
                Container(
                  height: 35,
                  width: 35,
                  decoration: BoxDecoration(
                  color: ColorConstant.gray80014,
                  borderRadius: BorderRadius.circular(25),
                  ),         
                  child: IconButton(onPressed: (){},
                    icon: Icon(PhosphorIcons.regular.phone,
                    color: ColorConstant.black900,
                    size: 20,
                  )),)]),
            ),
             StreamBuilder<QuerySnapshot>(
                stream: messageStream,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    print('aaaadfsdfsda:${snapshot.data!.docs.map((e) => e.data())}');
                    final List messages = snapshot.data!.docs.map((document) => document.data()).toList();

                    return ListView.builder(
                      physics: ClampingScrollPhysics(),
                      itemCount: messages.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        final message = messages[index];
                        final bool isSender = message["sender_id"] == 333; 
                        return MessageTile(
                          message: message["message_content"], 
                          sender: "Thai", 
                          sentByMe: isSender
                        );
                      },);
                  } else {
                    return CircularProgressIndicator();
                  }
                }
              ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              // crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: screenSize.width - 80,
                  height: 60,
                  margin: EdgeInsets.only(right: 5),
                  child: CustomTextFormField(
                    controller: _textMessageController,
                    prefix: Icon(
                      PhosphorIcons.regular.smiley,
                      size: 30,
                      color:ColorConstant.black900
                      ),
                    hintText: 'Nhập tin nhắn',
                    suffix: IconButton(icon: Icon(PhosphorIcons.regular.camera,
                    color: ColorConstant.black900,
                    size: 30,),
                    onPressed: () {
                      print('gkngdkfj:${_textMessageController.text}');
                    },
                      ),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(bottom: 10),
                  decoration: BoxDecoration(
                    color: ColorConstant.primary,
                    borderRadius: BorderRadius.circular(50)
                    ),
                  child: IconButton(icon:Icon(PhosphorIcons.light.paperPlaneRight,
                    color: ColorConstant.whiteA700,
                    size:25,),
                    onPressed: () async {
                      final conversationId = widget.conversation["conversation_id"];
                      final String messageContent = _textMessageController.text;
                      final messageId = Utils.getRandomNumber(4);
                      final timeSent = DateTime.now().toUtc();
        
                      Map<String, dynamic> message = {
                        'conversation_id': conversationId,
                        'message_content': messageContent,
                        'message_id': messageId,
                        'sender_id': 333,
                        'sent_at': timeSent
                      };
                      await FmECGFirebaseMessage().sendMessageConversation(message);
                    },
                  ),
                )
              ],)
          ],
        ),
      )
      );
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



