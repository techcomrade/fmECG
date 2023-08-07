import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

import '../components/custom_text_form_field.dart';
import '../constants/color_constant.dart';
import '../models/message_model.dart';
import '../theme/app_style.dart';

import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
class ChatDetail extends StatefulWidget{
  @override
  _ChatDetailState  createState() => _ChatDetailState();
}

class _ChatDetailState extends State<ChatDetail> {
  
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
    content: "Tôi đã gửi cho bác sĩ kết quả nhịp tim của tôi ",
    timeSent: DateTime.now()),
    Message(
      id: 2,
      userId: 3,
      recipientId: 2,
      content: "Chào bạn tôi đã xem kết quả vào đã làm một bản đánh giá.",
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

            SingleChildScrollView(
              child: Stack(
                  children: [
                    ListView.builder(     
                      itemCount: messages.length,
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        final bool isRecipient = messages[index].recipientId== 1;
                      return Container(
                        padding: EdgeInsets.all(15),
                        margin: isRecipient? EdgeInsets.fromLTRB(60, 10, 10, 10) : EdgeInsets.fromLTRB(10, 10, 60, 10) ,
                        child: Align( 
                        alignment: (isRecipient ? Alignment.topRight : Alignment.topLeft ),
                        child: Container(
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            color: (isRecipient ? ColorConstant.primary : ColorConstant.gray80014)
                          ),
                          child: Text(messages[index].content,
                          style: TextStyle( 
                            fontSize: 16,
                            color: (isRecipient ? ColorConstant.whiteA700 : ColorConstant.black900)
                          ),
                          )
                        ),
                       ));
                    },)                
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
                margin: EdgeInsets.only(right: 5,bottom: 15),
                child: CustomTextFormField(
                  prefix: Icon(
                    PhosphorIcons.regular.smiley,
                    size: 30,
                    color:ColorConstant.black900
                    ),
                  hintText: 'Nhập tin nhắn',
                  suffix: IconButton(icon: Icon(PhosphorIcons.regular.camera,
                  color: ColorConstant.black900,
                  size: 30,),
                  onPressed: (){},
                   ),
                ),
              ),
              Container(
                padding: EdgeInsets.only(bottom: 2),
                decoration: BoxDecoration(
                  color: ColorConstant.primary,
                  borderRadius: BorderRadius.circular(50)
                 ),
                child: IconButton(icon:Icon(PhosphorIcons.light.paperPlaneRight,
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


