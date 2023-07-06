import 'package:bluetooth_ecg/components/custom_text_form_field.dart';
import 'package:bluetooth_ecg/constants/color_constant.dart';
import 'package:bluetooth_ecg/models/doctor_info.dart';
import 'package:bluetooth_ecg/routes/route.dart';
import 'package:bluetooth_ecg/screens/chatdetail_screen.dart';
import 'package:bluetooth_ecg/theme/app_style.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';



class ChatScreen extends StatelessWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
    return Scaffold(
      backgroundColor: ColorConstant.blueA200,
      appBar: AppBar(
        backgroundColor: ColorConstant.blueA200,
        elevation: 0,
        centerTitle: true,
        title: Text('fmECG',
        style: TextStyle(
          color: ColorConstant.whiteA700,
          fontWeight: FontWeight.bold,
          fontSize: 25,
        )
        ),
      ),
      body:SingleChildScrollView(
        child: 
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Container(
                color: ColorConstant.blueA200,
                width: double.infinity,
                padding: EdgeInsets.all(10),
                margin: EdgeInsets.only(top:5),
                child: SizedBox(
                  width: double.infinity ,
                  height:70,              
                  child: ListView.builder(
                   itemCount: doctors.length,
                   shrinkWrap: true,
                   addSemanticIndexes: true ,
                   scrollDirection: Axis.horizontal,
                   physics: ClampingScrollPhysics(),                 
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
                                onTap: () => Navigator.push(context,
                                MaterialPageRoute(builder:(context) =>  ChatDetail(),)
                                ),
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
                          ) )
                         ]
                       ),
                     );
                  },),
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
                Container(
                  child: ListView.builder(
                    itemCount: doctors.length,
                    shrinkWrap: true,
                    scrollDirection: Axis.vertical,
                    itemBuilder: (context, index) {
                      return Container(
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
                                        Text(doctors[index].name,
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
                );                
              },
            )
          )      
        ],
      ),),],),
    ));
  }
}
