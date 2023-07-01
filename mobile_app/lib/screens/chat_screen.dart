import 'dart:math';

import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/generated/intl/messages_en.dart';
import 'package:bluetooth_ecg/models/message_model.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:bluetooth_ecg/utils/size.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class ChatScreen extends StatefulWidget{
  @override
  _ChatScreenState  createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  List<Message> messages = [
  Message(
    id: 1,
    userId: 2,
    recipientId: 1,
    content: "Xin chào bác sĩ!",
    timeSent: DateTime.now(),
  ),
  Message(
      id: 2,
      userId: 3,
      recipientId: 2,
      content: "Chào bạn!",
      timeSent: DateTime.now(),
    ),  
  Message(
    id: 1,
    userId: 2,
    recipientId: 1,
    content: "Tôi đã gửi cho bác sĩ kết quả nhịp tim của tôi",
    timeSent: DateTime.now()),
    Message(
      id: 2,
      userId: 3,
      recipientId: 2,
      content: "Chào bạn tôi đã xem kết quả vào đã làm một bản đánh giá. ",
      timeSent: DateTime.now(),
    ), 
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child:Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: ColorConstant.quinary,            
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(150, 35, 15,0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
              Text('Dr. Hiệp',
              style: TextStyle(
                color: ColorConstant.primary,
                fontWeight: FontWeight.bold,
                fontFamily: 'Roboto',
                fontSize: 25
              )),
              Container(
                height: 35,
                width: 35,
                decoration: BoxDecoration(
                color: ColorConstant.gray80014,
                borderRadius: BorderRadius.circular(25),
                ),         
                child: IconButton(onPressed: (){},
                 icon: Icon(Icons.phone,
                 color: Colors.white,
                 size: 20,
                shadows: [Shadow(color: ColorConstant.black900,
                blurRadius: 5, 
                )],)),)]),
          ),

            SingleChildScrollView(
              child: Stack(
                  children: [
                    ListView.builder(
                      itemCount: messages.length,
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        final bool isRecipient = messages[index].recipientId == 1;
                        return Container(
                          padding: EdgeInsets.all(10),
                          margin: (isRecipient ? EdgeInsets.only(left: 60,top: 15, right: 10) : EdgeInsets.only(right: 60, top: 15, left: 10)),
                          child: Align( 
                          alignment: (isRecipient ? Alignment.topRight : Alignment.topLeft),
                          child: Container(
                            padding: EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              color: (isRecipient ? ColorConstant.primary : ColorConstant.gray80014)
              
                            ),
                            child: Text(messages[index].content,
                            style: TextStyle(
                              // fontFamily: 'txtAveriasSansLibre',
                              fontSize: 16,
                              color: (messages[index].recipientId== 1 ? ColorConstant.whiteA700: ColorConstant.black900)
                            ),
                            )
                          ),
                        ));
                      }
                    )                
                  ]
                ),
            ),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: 320,
                height: 60,
                padding: EdgeInsets.only(top:8),
                margin: EdgeInsets.only(right: 5),
                child: CustomTextFormField(
                  prefix: Icon(
                    Icons.sentiment_satisfied_alt,
                    size: 30,
                    color:ColorConstant.black9007e
                    ),
                  hintText: 'Nhập tin nhắn',
                  suffix: IconButton(icon: Icon(Icons.camera_alt,
                  color: ColorConstant.black9007e,
                  size: 30,),
                  onPressed: (){},
                   ),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  color: ColorConstant.primary,
                  borderRadius: BorderRadius.circular(50)
                 ),
                child: IconButton(icon:Icon(Icons.send,
                  color: ColorConstant.whiteA700,
                  size:25,),
                  onPressed: (){},
                ),
              )
            ],)
        ],
      )
      ));
  }
}
