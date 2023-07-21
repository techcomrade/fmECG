import 'dart:async';

import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/controllers/firebase_messages_controller.dart';
import 'package:bluetooth_ecg/models/doctor_info.dart';
import 'package:bluetooth_ecg/providers/user_provider.dart';
import 'package:bluetooth_ecg/screens/chat_detail_screen.dart';
import 'package:bluetooth_ecg/utils/utils.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import 'package:provider/provider.dart';



class ChatScreen extends StatefulWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  Stream<QuerySnapshot>? conversationStream;

  @override
  void initState() {
    super.initState();
    checkPatientDoctorAssignment();
    getConversationStream();
  }

  void checkPatientDoctorAssignment() async {
    final doctorAssignedInfo = context.read<UserProvider>().doctorAssignedInfo;
      int patientId = await Utils.getUserId();

    if (doctorAssignedInfo.isNotEmpty) {
      // check conversation co tren db chua
      int patientId = await Utils.getUserId();
      int doctorId = doctorAssignedInfo["user_id"] ?? 0;
      List userIds = [patientId, doctorId]; 
      String conversationId = await FmECGFirebaseMessage().getSpecificConversationIdByUserIds(userIds);
      print('conversationId:$conversationId');
      if (conversationId == "") {
        print('go heree');
        final DateTime conversationCreatedAt = DateTime.now().toUtc();
        Map<String, dynamic> conversationInfo = {
          'conversation_id': Utils.getRandomNumber(4),
          'member_ids': {
            "$patientId": true,
            "$doctorId": true
          },
          'conversation_avatar_url': "dsgdfgdfgdf",
          'created_at': conversationCreatedAt
        };
        await FmECGFirebaseMessage().createConversation(conversationInfo);
      }
    }
  }

  void getConversationStream() async {
    int userId = await Utils.getUserId();
    conversationStream = await FmECGFirebaseMessage().getAllConversationsInfo(userId);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: ColorConstant.blueA200,
      appBar: AppBar(
        backgroundColor: ColorConstant.blueA200,
        elevation: 0,
        centerTitle: true,
        title: Column(
          children: [
            Text('fmECG', 
              textAlign: TextAlign.center,
              style: TextStyle(
                color: ColorConstant.whiteA700,
                fontWeight: FontWeight.bold,
                fontSize: 25,
              )
            ),
            Text('Trao đổi với bác sĩ', 
              textAlign: TextAlign.center,
              style: TextStyle(
                color: ColorConstant.whiteA700,
                fontSize: 18,
              )
            ),
          ],
        )
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              color: ColorConstant.blueA200,
              width: double.infinity,
              padding: EdgeInsets.all(10),
              margin: EdgeInsets.only(top:5),
              child: SizedBox(
                width: double.infinity,
                height:70,              
                child: ListView.builder(
                  itemCount: doctors.length,
                  shrinkWrap: true,
                  addSemanticIndexes: true ,
                  scrollDirection: Axis.horizontal,
                  physics: const ClampingScrollPhysics(),                 
                  itemBuilder: (context, index) {
                    return Container(
                      width: 80,
                      height: 80,            
                      padding: EdgeInsets.only(left: 10),
                        child: Stack(
                          children: [
                            Container(
                              decoration: BoxDecoration(
                              color: ColorConstant.whiteA700,
                                borderRadius: BorderRadius.circular(30),
                              ),
                              padding: EdgeInsets.all(1),
                              child: GestureDetector(
                                onTap: () => {},
                                child: Image.asset(doctors[index].image,
                                  alignment: Alignment.center,     
                                ),
                              )
                            ),
                          Positioned(
                          bottom:BorderSide.strokeAlignOutside,
                          right: BorderSide.strokeAlignOutside,
                          child: Container(
                            width: 10,
                            height: 10,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: ColorConstant.tertiary,
                            ),
                          ) 
                        )
                      ]
                    ),
                  );
                }),
              ),
            ),
            Container(
              width: double.infinity,
              height: size.height*0.65+4.4,
              margin: EdgeInsets.only(top: 20),
              decoration: BoxDecoration(
                color: ColorConstant.whiteA700,
                borderRadius: BorderRadius.only(topLeft: Radius.circular(50),topRight: Radius.circular(50))
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [               
                  Padding(
                    padding: EdgeInsets.fromLTRB(10, 15, 10, 10),
                    child: CustomTextFormField(
                    hintText: 'Search',
                    alignment: Alignment.topCenter,
                    prefix: Icon(PhosphorIcons.bold.magnifyingGlass),
                    width: 320,      
                    ),
                  ),
                  StreamBuilder<QuerySnapshot>(
                    stream: conversationStream,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        final List conversations = snapshot.data!.docs.map((document) {
                          return {
                            'document_id': document.id, 
                            ...document.data() as Map
                          };
                        }).toList();

                        return ListView.builder(
                          itemCount: conversations.length,
                          shrinkWrap: true,
                          scrollDirection: Axis.vertical,
                          itemBuilder: (context, index) {
                            final conversation = conversations[index];
                            return InkWell(
                              onTap: () => Navigator.of(context)
                                .push(MaterialPageRoute(builder: (context) {
                                  return ChatDetailScreen(conversation: conversation);
                              })),
                              child: Container(
                                width: double.infinity,
                                height: 100,
                                padding: EdgeInsets.fromLTRB(15, 15, 5, 10),
                                decoration: BoxDecoration(
                                  color: ColorConstant.whiteA700
                                ),
                                child: Container(
                                  color: ColorConstant.whiteA700,
                                  child: Row(
                                    children: [
                                      Container(
                                        margin: EdgeInsets.all(5),
                                        child: Image.asset(doctors[index].image),
                                        color: ColorConstant.whiteA700,
                                      ),
                                      Container(
                                        width: size.width / 1.4,
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          children: [
                                            Row(
                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                              children: [
                                                Text("${conversation["conversation_id"]}",
                                                  style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 15
                                                  ),                                
                                                ),
                                                Text('20.00',
                                                  style: TextStyle(
                                                    fontSize: 12
                                                  ),
                                                )
                                              ],
                                            ),
                                            Row(
                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                              children: [
                                                Text('Tin nhắn mới'),
                                                Container(
                                                  padding: EdgeInsets.fromLTRB(5, 2, 5, 2),
                                                  decoration: BoxDecoration(
                                                    borderRadius: BorderRadius.circular(20),
                                                    color: ColorConstant.primary,
                                                  ),
                                                  child: Text('1',
                                                    style: TextStyle(
                                                      fontWeight: FontWeight.w900,
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            )
                                          ],
                                        ),
                                      )
                                    ],
                                  ),
                                )
                              ),
                            );
                          },
                        );
                      } else {
                        return CircularProgressIndicator();
                      }
                    }
                  )      
                ],
              )
            )
          ]
        ),
      )
    );
  }
}

    List<Data> doctors = [
      Data(
        id: 1,
        userId: 2,
        departmentId: 3,
        name: 'Nguyễn A',
        email: 'johndoe@example.com',
        password: 'password',
        phoneNo: '1234567890',
        workingHour: '9AM - 5PM',
        aboutUs: 'We are a team of professionals...',
        service: 'Service description...',
        image: 'assets/images/doctor.png',
        facebookId: 'johndoe',
        twitterId: 'johndoe',
        googleId: 'johndoe',
        instagramId: 'johndoe',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
        departmentName: 'Department name...',
        ratting: 4.5,
        timeTabledata:[],
        ),
      Data(
        id: 2,
        userId: 3,
        departmentId: 4,
        name: 'Vũ B',
        email: 'janedoe@example.com',
        password: 'password',
        phoneNo: '1234567890',
        workingHour: '9AM - 5PM',
        aboutUs: 'We are a team of professionals...',
        service: 'Service description...',
        image: 'assets/images/doctor.png',
        facebookId: 'janedoe',
        twitterId: 'janedoe',
        googleId: 'janedoe',
        instagramId: 'janedoe',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
        departmentName: 'Department name...',
        ratting: 4.5,
        timeTabledata:[]),
    Data(
      id: 3,
      userId: 4,
      departmentId: 5,
      name: 'Trần C',
      email: 'bobsmith@example.com',
      password: 'password',
      phoneNo: '1234567890',
      workingHour: '9AM - 5PM',
      aboutUs: 'We are a team of professionals...',
      service: 'Service description...',
      image: 'assets/images/doctor.png',
      facebookId: 'bobsmith',
      twitterId: 'bobsmith',
      googleId: 'bobsmith',
      instagramId: 'bobsmith',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      departmentName: 'Department name...',
      ratting:4.5,
      timeTabledata:[]),
    Data(
      id :4,
      userId :5,
      departmentId :6,
      name :'Mai D' ,
      email :'alicesmith@example.com' ,
      password :'password' ,
      phoneNo :'1234567890' ,
      workingHour :'9AM - 5PM' ,
      aboutUs :'We are a team of professionals...' ,
      service :'Service description...' ,
      image :'assets/images/doctor.png' ,
      facebookId :'alicesmith' ,
      twitterId :'alicesmith' ,
      googleId :'alicesmith' ,
      instagramId :'alicesmith' ,
      createdAt :'2022-01-01T00 :00 :00.000Z' ,
      updatedAt :'2022-01-01T00 :00 :00.000Z' ,
      departmentName :'Department name...' ,
      ratting :4.5,
      timeTabledata:[]),
    ];
