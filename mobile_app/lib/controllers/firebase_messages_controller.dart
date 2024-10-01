import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class FmECGFirebaseMessage {
  final database = FirebaseFirestore.instance;
  // final conversationsCollection = FirebaseFirestore.instance.collection("conversations");
  // final messagesCollection = FirebaseFirestore.instance.collection("messages");

  Future<String> getDeviceToken() async {
    final String? firebaseToken = await FirebaseMessaging.instance.getToken();
    return firebaseToken ?? "";
  }

  Future<void> saveTokenToFirestore(int userId, String firebaseToken) async {
    await database.collection("user_tokens").add(
      {
        "user_id": userId,
        "firebase_token": firebaseToken
      }
    );
  }

  Future<void> createConversation(Map<String, dynamic> conversationInfo) async {
    await database.collection("conversations").add(conversationInfo);
  }

  Future<String> getSpecificConversationIdByUserIds(List userIds) async {
    final QuerySnapshot collectionQuerySnapshot = await database.collection("conversations")
                                                    .where('member_ids.${userIds[0]}', isEqualTo: true)
                                                    .where('member_ids.${userIds[1]}', isEqualTo: true)
                                                    .get();
    final allDocuments = collectionQuerySnapshot.docs;
    if (allDocuments.isEmpty) {
      return "";
    } else {
      String conversationId = "";
      for (DocumentSnapshot documentSnapshot in allDocuments) {
        final Map<String,dynamic> data = documentSnapshot.data() as Map<String,dynamic>;
        if (data["conversation_id"] != null) {
          conversationId = data["conversation_id"];
          break;
        }
      }
      return conversationId;
    }
  }

  getSpecificConversationInfo() {
    final conversationInfoQuery = database.collection("conversations")
                                          .where('conversation_id', isEqualTo: 1)
                                          .snapshots();
    return conversationInfoQuery;
  }

  getAllConversationsInfo(int userId) {
    final allConversationsQuery = database.collection("conversations")
                                .where('member_ids.$userId', isEqualTo: true)
                                .snapshots();
    return allConversationsQuery;
  }

  getMessageConversation(String conversationId) {
    final messageConversationQuery = database.collection("messages")
                                            .where("conversation_id", isEqualTo: conversationId)
                                            .orderBy("sent_at")
                                            .snapshots();
    return messageConversationQuery;
  }

  Future<void> sendMessageConversation(Map<String,dynamic> message) async {
    await database.collection("messages").add(message);
  }

  Future<bool> checkFirebaseTokenExist(String firebaseToken) async {
    final QuerySnapshot firebaseTokenSnapshot = await database.collection("user_tokens")
                                     .where("firebase_token", isEqualTo: firebaseToken)
                                     .get();
    final allDocuments = firebaseTokenSnapshot.docs;
    if (allDocuments.isNotEmpty) {
      return true;
    } else {
      return false;
    }
  }
}