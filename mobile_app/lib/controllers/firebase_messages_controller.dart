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

  Future<void> saveTokenToFirestore(String token, int userId) async {
    await database.collection("user_tokens").doc(userId.toString()).set(
      {
        "firebase_token": token
      }
    );
  }

  //TODO: add list userId
  void getSpecificConversationByUserIds() async {
    final QuerySnapshot collectionQuerySnapshot = await database.collection("conversations")
                                                    .where('member_ids.${333}', isEqualTo: true)
                                                    .where('member_ids.${444}', isEqualTo: true)
                                                    .get();
    final allDocuments = collectionQuerySnapshot.docs;
    for (DocumentSnapshot documentSnapshot in allDocuments) {
      final Map<String,dynamic> data = documentSnapshot.data() as Map<String,dynamic>;
      print('data:$data');
      if (data["member_ids"] != null && data["member_ids"].length > 1) {
        print('datataaa:${data["member_ids"]}');
      }
    }
  }

  //TODO: add conversationId
  getSpecificConversationInfo() {
    final conversationInfoQuery = database.collection("conversations")
                                          .where('conversation_id', isEqualTo: 1)
                                          .snapshots();
    return conversationInfoQuery;
  }

  //TODO: add userId
  getAllConversationsInfo() {
    final allConversationsQuery = database.collection("conversations")
                                .where('member_ids.${333}', isEqualTo: true)
                                .snapshots();
    return allConversationsQuery;
  }

  //TODO: add conversationId
  getMessageConversation() {
    final messageConversationQuery = database.collection("messages")
                                            .where("conversation_id", isEqualTo: 1)
                                            // .orderBy("sent_at")
                                            .snapshots();
    return messageConversationQuery;
  }

  Future<void> sendMessageConversation(Map<String,dynamic> message) async {
    await database.collection("messages").add(message);
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