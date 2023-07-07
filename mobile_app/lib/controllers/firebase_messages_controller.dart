import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class FmECGFirebaseMessage {

  final CollectionReference groupCollection = FirebaseFirestore.instance.collection("group");

  getDeviceToken() async {
    final String? firebaseToken = await FirebaseMessaging.instance.getToken();
    return firebaseToken ?? "";
  }

  saveTokenToFireStore(String token, String userId) async {
    await FirebaseFirestore.instance.collection("user_tokens").doc(userId).set(
      {
        "firebase_token": token
      }
    );
  }
}