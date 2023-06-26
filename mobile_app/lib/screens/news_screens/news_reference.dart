// anh Hà code, dùng để tham khảo cho news screen

// header() {
//     return SafeArea(
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           Padding(
//             padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 const Text(
//                   HOME,
//                   style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 25,
//                       fontWeight: FontWeight.w800),
//                 ),
//                 InkWell(
//                   onTap: () {},
//                   child: Image.asset(
//                     "assets/homescreen/search_header.png",
//                     height: 25,
//                     width: 25,
//                   ),
//                 )
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }

//   body() {
//     return SingleChildScrollView(
//       controller: scrollController,
//       child: Column(
//         children: [
//           SizedBox(
//             height: 5,
//           ),
//           InkWell(
//             onTap: () {
//               Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (context) => Login1Screen(),
//                   ));
//             },
//             child: Stack(
//               children: [
//                 Container(
//                   margin: EdgeInsets.all(14),
//                   child: ClipRRect(
//                     borderRadius: BorderRadius.circular(10),
//                     child: Image.asset(
//                       "assets/homescreen/Book-appointment-banner.png",
//                       height: 180,
//                       width: MediaQuery.of(context).size.width,
//                       fit: BoxFit.fill,
//                     ),
//                   ),
//                 ),
//                 Container(
//                   margin: EdgeInsets.all(10),
//                   height: 180,
//                   child: Row(
//                     children: [
//                       SizedBox(
//                         width: 20,
//                       ),
//                       Column(
//                         mainAxisAlignment: MainAxisAlignment.center,
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           const Text(
//                             BOOK,
//                             style: TextStyle(
//                                 fontSize: 17,
//                                 color: Colors.white,
//                                 fontWeight: FontWeight.w600),
//                           ),
//                           const Text(
//                             APPOINTMENT,
//                             style: TextStyle(
//                                 fontSize: 17,
//                                 color: Colors.white,
//                                 fontWeight: FontWeight.w600),
//                           ),
//                           const SizedBox(
//                             height: 10,
//                           ),
//                           const Text(
//                             QUICKLY_CREATE_FILES,
//                             style: TextStyle(
//                               fontSize: 10,
//                               color: Colors.white,
//                             ),
//                           ),
//                           const SizedBox(
//                             height: 20,
//                           ),
//                           Container(
//                             width: isLoggedIn ? 120 : 130,
//                             height: 28,
//                             child: Stack(
//                               children: [
//                                 Image.asset(
//                                   "assets/homescreen/bookappointment.png",
//                                   width: isLoggedIn ? 120 : 130,
//                                   height: 28,
//                                   fit: BoxFit.fill,
//                                 ),
//                                 Center(
//                                   child: Text(
//                                     isLoggedIn
//                                         ? BOOKAPPOINTMENT
//                                         : LOGIN_TO_BOOK_APPOINTMENT,
//                                     style: TextStyle(
//                                         fontSize: 9,
//                                         color: LIME,
//                                         fontWeight: FontWeight.w700),
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           )
//                         ],
//                       ),
//                     ],
//                   ),
//                 )
//               ],
//             ),
//           ),
//           Padding(
//             padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
//             child: Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Text(
//                   DOCTOR_LIST,
//                   style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 17,
//                       fontWeight: FontWeight.w700),
//                 ),
//                 InkWell(
//                   onTap: () {

//                   },
//                   child: Text(
//                     SEE_ALL,
//                     style: TextStyle(
//                         color: Colors.blue,
//                         fontSize: 13,
//                         fontWeight: FontWeight.w700),
//                   ),
//                 ),
//               ],
//             ),
//           ),
//           doctorDetailTile(
//               imageUrl:
//                   "https://img.freepik.com/premium-vector/doctor-surgeon-pharmacist-therapist-with-stethoscope-smiling-medic-worker-medical-staff_458444-338.jpg?w=2000",
//               name: "Pham ngoc ha",
//               department: "Cardiology",
//               aboutUs:
//                   "Cardiologists specify in the study and treatment of the heart and the many disseases and issues",
//               id: 1),
//           doctorDetailTile(
//               imageUrl:
//                   "https://img.freepik.com/premium-vector/doctor-surgeon-pharmacist-therapist-with-stethoscope-smiling-medic-worker-medical-staff_458444-338.jpg?w=2000",
//               name: "Pham ngoc ha",
//               department: "Cardiology",
//               aboutUs:
//                   "Cardiologists specify in the study and treatment of the heart and the many disseases and issues",
//               id: 1),
//           doctorDetailTile(
//               imageUrl:
//                   "https://img.freepik.com/premium-vector/doctor-surgeon-pharmacist-therapist-with-stethoscope-smiling-medic-worker-medical-staff_458444-338.jpg?w=2000",
//               name: "Pham ngoc ha",
//               department: "Cardiology",
//               aboutUs:
//                   "Cardiologists specify in the study and treatment of the heart and the many disseases and issues",
//               id: 1),
//           doctorDetailTile(
//               imageUrl:
//                   "https://img.freepik.com/premium-vector/doctor-surgeon-pharmacist-therapist-with-stethoscope-smiling-medic-worker-medical-staff_458444-338.jpg?w=2000",
//               name: "Pham ngoc ha",
//               department: "Cardiology",
//               aboutUs:
//                   "Cardiologists specify in the study and treatment of the heart and the many disseases and issues",
//               id: 1),
//           nextUrl != "null"
//               ? Padding(
//                   padding: const EdgeInsets.all(50.0),
//                   child: CircularProgressIndicator(
//                     strokeWidth: 2,
//                   ),
//                 )
//               : Container(),
//         ],
//       ),
//     );
//   }

//   doctorDetailTile(
//       {required String imageUrl,
//       required String name,
//       required String department,
//       required String aboutUs,
//       required int id}) {
//     return InkWell(
//       onTap: () {
//         Navigator.push(context,
//             MaterialPageRoute(builder: (context) => DoctorDetails(id)));
//       },
//       child: Container(
//         decoration: BoxDecoration(
//             color: Colors.black12, borderRadius: BorderRadius.circular(10)),
//         child: Row(
//           children: [
//             Padding(
//               padding: const EdgeInsets.all(10.0),
//               child: ClipRRect(
//                 borderRadius: BorderRadius.circular(10),
//                 child: CachedNetworkImage(
//                   height: 72,
//                   width: 72,
//                   fit: BoxFit.cover,
//                   imageUrl: Uri.parse(imageUrl).toString(),
//                   progressIndicatorBuilder: (context, url, downloadProgress) =>
//                       Container(
//                           height: 75,
//                           width: 75,
//                           child: Center(child: Icon(Icons.image))),
//                   errorWidget: (context, url, error) => Container(
//                     height: 75,
//                     width: 75,
//                     child: Center(
//                         child: Image.asset(
//                       "assets/images/doctor.png",
//                     )),
//                   ),
//                 ),
//               ),
//             ),
//             Expanded(
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                   Text(
//                     name,
//                     style: TextStyle(
//                         color: Colors.black,
//                         fontSize: 17,
//                         fontWeight: FontWeight.w800),
//                   ),
//                   SizedBox(
//                     height: 5,
//                   ),
//                   Container(
//                     decoration: BoxDecoration(
//                       borderRadius: BorderRadius.circular(3),
//                       color: LIME,
//                     ),
//                     child: Padding(
//                       padding: const EdgeInsets.fromLTRB(5, 3, 5, 3),
//                       child: Text(
//                         department,
//                         style: const TextStyle(
//                             color: Colors.white,
//                             fontSize: 10,
//                             fontWeight: FontWeight.w700),
//                       ),
//                     ),
//                   ),
//                   SizedBox(
//                     height: 5,
//                   ),
//                   Row(
//                     children: [
//                       Expanded(
//                         child: Text(
//                           aboutUs,
//                           maxLines: 2,
//                           overflow: TextOverflow.ellipsis,
//                           style: TextStyle(
//                             color: Colors.grey,
//                             fontSize: 10,
//                           ),
//                         ),
//                       ),
//                     ],
//                   ),
//                 ],
//               ),
//             ),
//             SizedBox(
//               width: 16,
//             )
//           ],
//         ),
//         margin: EdgeInsets.fromLTRB(16, 6, 16, 6),
//       ),
//     );
//   }

//   Future<bool> _willPopScope() async {
//     Navigator.popUntil(context, (route) => route.isFirst);
//     Navigator.pushReplacement(
//         context, MaterialPageRoute(builder: (context) => Login1Screen()));
//     return false;
//   }