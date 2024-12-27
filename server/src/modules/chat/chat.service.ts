import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MessageSchema } from "./schema/message.schema";
import { MessageRequest } from "./dto/message.request";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(MessageSchema.name) private chatModel: Model<MessageSchema>
  ) { }

  async saveMessage(messageRequest: MessageRequest): Promise<MessageSchema> {
    console.log(messageRequest);
    messageRequest.time = Math.floor(Date.now() / 1000);
    const chat = new this.chatModel(messageRequest);
    return chat.save();
  }

  async loadMessages(messageRequest: MessageRequest): Promise<MessageSchema[]> {
    console.log(messageRequest.senderId);
    if (messageRequest.groupChatId != null) {
      var groupChatId = messageRequest.groupChatId;
      return this.chatModel
        .find({ groupChatId })
        .sort({ timestamp: 1 });
    }
  }

  async getLatestMessages(): Promise<MessageSchema[]> {
    return this.chatModel.aggregate([
      {
        $sort: { time: -1 }, // Sắp xếp theo thời gian giảm dần
      },
      {
        $group: {
          _id: "$groupChatId", // Nhóm theo `groupChatId`
          latestMessage: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$latestMessage" }, 
      },
    ]);
  }

  async countUnreadMessagesByGroup(userId: string): Promise<number[]> {
    return this.chatModel.aggregate([
      {
        $match: {
          seenBy: { $ne: userId }, 
        },
      },
      {
        $group: {
          _id: "$groupChatId",
          unreadCount: { $sum: 1 },
        },
      },
    ]);
  }
  
  
}
