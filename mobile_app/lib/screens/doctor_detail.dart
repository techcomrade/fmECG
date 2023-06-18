import 'dart:convert';

import 'package:bluetooth_ecg/models/doctor_info.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';


import '../AllText.dart';
import '../main.dart';
import 'main_screen.dart';

class DoctorDetails extends StatefulWidget {
  final int id;

  DoctorDetails(this.id);

  @override
  _DoctorDetailsState createState() => _DoctorDetailsState();
}

class _DoctorDetailsState extends State<DoctorDetails> {
  List<String> weekDaysList = [
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  ];
  bool isLoggedIn = false;

  @override
  void initState() {
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    return
       SafeArea(
            child: Scaffold(
              backgroundColor: Colors.white,
              appBar: AppBar(
                leading: Container(),
                backgroundColor: Colors.white,
                flexibleSpace: header(),
              ),
              body: body(),
            ),
          );
  }

  header() {
    return SafeArea(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: Icon(
                    Icons.arrow_back_ios,
                    size: 18,
                    color: Colors.black,
                  ),
                  constraints: BoxConstraints(maxWidth: 30, minWidth: 10),
                  padding: EdgeInsets.zero,
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
                SizedBox(
                  width: 5,
                ),
                Text(
                  "phamngocha",
                  style: TextStyle(
                      color: Colors.black, fontSize: 22, fontWeight: FontWeight.w800),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      InkWell(
                        onTap: () {
                        },
                        child: Image.asset(
                          "assets/doctordetails/Phone.png",
                          height: 40,
                          width: 40,
                          fit: BoxFit.fill,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      InkWell(
                        onTap: () {
                        },
                        child: Image.asset(
                          "assets/doctordetails/email.png",
                          height: 40,
                          width: 40,
                          fit: BoxFit.fill,
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }

  body() {
    return Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            child: Column(
              children: [
                doctorProfileCard(),
                workingTimeAndServiceCard(),
              ],
            ),
          ),
        ),
        bottomButtons(),
      ],
    );
  }

  doctorProfileCard() {
    return Container(
      margin: EdgeInsets.all(16),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(10)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(15),
                  child: CachedNetworkImage(
                    height: 90,
                    width: 110,
                    fit: BoxFit.cover,
                    imageUrl: Uri.parse("").toString(),
                    progressIndicatorBuilder:
                        (context, url, downloadProgress) => Container(
                            height: 75,
                            width: 75,
                            child: Center(child: Icon(Icons.image))),
                    errorWidget: (context, url, error) => Container(
                      height: 75,
                      width: 75,
                      child: Center(
                        child: Image.asset("assets/images/doctor.png"),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 15,
              ),
              Container(
                height: 90,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Ha",
                          style: TextStyle(
                              fontWeight: FontWeight.w800, fontSize: 16),
                        ),
                        Text(
                          "Carrdio",
                          style: TextStyle(color: Colors.blue, fontSize: 10),
                        ),
                        InkWell(
                          onTap: () {

                          },
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Image.asset(
                                    "assets/doctordetails/star_active.png",
                                    height: 12,
                                    width: 12,
                                  ),
                                  SizedBox(
                                    width: 5,
                                  ),
                                  Image.asset(
                                    "assets/doctordetails/star_active.png",
                                    height: 12,
                                    width: 12,
                                  ),
                                  SizedBox(
                                    width: 5,
                                  ),
                                  Image.asset(
                                    "assets/doctordetails/star_active.png",
                                    height: 12,
                                    width: 12,
                                  ),
                                  SizedBox(
                                    width: 5,
                                  ),
                                  Image.asset(
                                    "assets/doctordetails/star_active.png",
                                    height: 12,
                                    width: 12,
                                  ),
                                  SizedBox(
                                    width: 5,
                                  ),
                                  Image.asset(
                                       "assets/doctordetails/star_active.png",
                                    height: 12,
                                    width: 12,
                                  ),
                                ],
                              ),
                              SizedBox(
                                height: 2,
                              ),
                              Text(
                                "See all reviews",
                                style:
                                TextStyle(color: Colors.grey, fontSize: 10),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        GestureDetector(
                          onTap: () {
                          },
                          child: Image.asset(
                            "assets/doctordetails/facebook.png",
                            height: 15,
                            width: 15,
                          ),
                        ),
                        SizedBox(
                          width: 7,
                        ),
                        GestureDetector(
                          onTap: () {
                          },
                          child: Image.asset(
                            "assets/doctordetails/twitter.png",
                            height: 15,
                            width: 15,
                          ),
                        ),
                        SizedBox(
                          width: 7,
                        ),
                        GestureDetector(
                          onTap: () {
                          },
                          child: Image.asset(
                            "assets/doctordetails/google+.png",
                            height: 15,
                            width: 15,
                          ),
                        ),
                        SizedBox(
                          width: 7,
                        ),
                        GestureDetector(
                          onTap: () {
                          },
                          child: Image.asset(
                            "assets/doctordetails/instagram.png",
                            height: 15,
                            width: 15,
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              )
            ],
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            "A cardiologist is a medical doctor who studies and treats diseases and conditions of the cardiovascular system — the heart and blood vessels — including heart rhythm disorders, coronary artery disease, heart attacks, heart defects and infections, and related disorders.",
            style: TextStyle(color: Colors.grey, fontSize: 11),
            textAlign: TextAlign.justify,
          ),
        ],
      ),
    );
  }

  workingTimeAndServiceCard() {
    return Container(
      color: Colors.white,
      width: MediaQuery.of(context).size.width,
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            WORKING_TIME,
            style: TextStyle(fontWeight: FontWeight.w700, fontSize: 19),
          ),
          GridView.builder(
            shrinkWrap: true,
            physics: ClampingScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 10,
                childAspectRatio: 3,
                mainAxisSpacing: 5),
            itemCount: 6,
            itemBuilder: (context, index) {
              return Row(
                children: [
                  Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: Center(
                      child: Image.asset("assets/doctordetails/free-time.png"),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Sunday",
                        style: TextStyle(
                            color: Colors.blue,
                            fontSize: 12,
                            fontWeight: FontWeight.w700),
                      ),
                      SizedBox(
                        height: 5,
                      ),
                      Text(
                        "9h -22h",
                        style: TextStyle(
                          color: Colors.blue,
                          fontSize: 9,
                        ),
                      ),
                    ],
                  )
                ],
              );
            },
          ),
          SizedBox(
            height: 15,
          ),
          Text(
            SERVICES,
            style: TextStyle(fontWeight: FontWeight.w700, fontSize: 19),
          ),
          SizedBox(
            height: 5,
          ),
          Text(
              "A cardiologist is a medical doctor who studies and treats diseases and conditions of the cardiovascular system — the heart and blood vessels — including heart rhythm disorders, coronary artery disease, heart attacks, heart defects and infections, and related disorders.",

          style: TextStyle(fontSize: 13, color: Colors.grey),
            textAlign: TextAlign.justify,
          ),
          SizedBox(
            height: 100,
          ),
        ],
      ),
    );
  }

  bottomButtons() {
    return Container(
      color: Colors.white,
      child: Row(
        children: [
          SizedBox(
            width: 10,
          ),
          isLoggedIn
              ? InkWell(
                  onTap: () {

                  },
                  child: Container(
                    height: 50,
                    width: 50,
                    margin: EdgeInsets.fromLTRB(0, 5, 6, 15),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(25),
                      color: LIME,
                    ),
                    child: Image.asset("assets/doctordetails/review.png"),
                  ),
                )
              : Container(),
          Expanded(
            child: InkWell(
              onTap: () {

              },
              child: Container(
                margin: EdgeInsets.fromLTRB(6, 5, 12, 15),
                height: 50,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(25),
                  color: LIME,
                ),
                child: Center(
                  child: Text(
                    isLoggedIn ? BOOK_APPOINTMENT : LOGIN_TO_BOOK_APPOINTMENT,
                    style: TextStyle(fontWeight: FontWeight.w700, fontSize: 17, color: Colors.white),
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }


}
