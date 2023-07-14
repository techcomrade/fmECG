import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class FmECGFirebaseMessage {
  FirebaseFirestore database = FirebaseFirestore.instance;

  getDeviceToken() async {
    final String? firebaseToken = await FirebaseMessaging.instance.getToken();
    return firebaseToken ?? "";
  }

  saveTokenToFirestore(String token, int userId) async {
    await database.collection("user_tokens").doc(userId.toString()).set(
      {
        "firebase_token": token
      }
    );
  }

  // sendMessage(Map message) async {
  //   Map messagebody = {
  //     "conversation_id": 
  //     "message_id":
  //     "message_content":
  //     "sender_id":
  //     "sent_at":
  //   };

  // }

  // createConversation(Map conversation) async {
  //   Map conversation = {

  //   };
  // }
}