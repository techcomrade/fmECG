import { Controller, Post, Body, Get, Param, Req, InternalServerErrorException } from '@nestjs/common';
import { MessageSchema } from './schema/message.schema';
import { MessageRequest } from './dto/message.request';
import { ApiResponse } from '@nestjs/swagger';
import { ChatGateway } from './chat.gateway';
import { Socket } from 'socket.io';
import { UserGuardModel } from '../authentication/dto/user.guard.model';
import { UserService } from '../user/user.service';
import { MessageResponse } from './dto/message.response';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatGateWay: ChatGateway,
    private readonly chatService: ChatService,
    private userService: UserService
  ) { }

  // Lấy tin nhắn
  @ApiResponse({
    status: 200,
    type: [MessageSchema],
    description: "Successful",
  })
  @Get('messages/:groupChatId')
  async loadMessages(
    @Param('groupChatId') groupChatId: string,
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    try {
      let sender = await this.userService.getUserByAccountId(req.user.accountId);

      let messageRequest = {
        senderId: sender.id,
        groupChatId: groupChatId
      } as MessageRequest;

      let messages = await this.chatService.loadMessages(messageRequest);

      const messageResponses = [] as MessageResponse[];
      for (let msg of messages) {
        let msgSender = await this.userService.getUserById(msg.senderId);

        let messageResponse = {
          senderId: msg.senderId,
          senderName: msgSender.username,
          receiverId: msg.receiverId,
          message: msg.message,
          groupChatId: groupChatId,
          time: msg.time,
          latestMessage: msg.latestMessage
        } as MessageResponse;

        messageResponses.push(messageResponse);

      }
      return messageResponses;
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when loading message"
      );
    }
  }


  // Gửi tin nhắn
  @ApiResponse({
    status: 200,
    type: [MessageSchema],
    description: "Successful",
  })
  @Post('send')
  async sendMessage(
    @Body() messageRequest: MessageRequest,
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    try {
      let senderId = (await this.userService.getUserByAccountId(req.user.accountId)).id;
      messageRequest.senderId = senderId;
      return this.chatGateWay.handleMessage(messageRequest, {} as Socket)
    }
    catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        "Error when sending message"
      );
    }
  }

  @Get('latest_messages')
  @ApiResponse({
    status: 200,
    type: [MessageResponse],
    description: 'Get latest messages from all group chats',
  })
  async getLatestMessages(
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    try {
      const currentUser = await this.userService.getUserByAccountId(req.user.accountId);
      const latestMessages = await this.chatService.getLatestMessages();
      const messageResponses: MessageResponse[] = [];
      for (const msg of latestMessages) {
        const sender = await this.userService.getUserById(msg.senderId);

        const messageResponse: MessageResponse = {
          senderId: msg.senderId,
          senderName: sender.username,
          receiverId: msg.receiverId,
          message: msg.message,
          groupChatId: msg.groupChatId,
          time: msg.time,
          latestMessage: msg.message,
          seenBy: msg.seenBy,
        };

        messageResponses.push(messageResponse);
      }

      return messageResponses;
    } catch (error) {
      console.error('Error fetching latest messages:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get('unread-count')
  @ApiResponse({
    status: 200,
    description: 'Get total unread messages for the current user',
  })
  async getUnreadCount(
    @Req() req: Request & { user?: UserGuardModel },
  ): Promise<{ unreadCount: number[] }> {
    try {
      // Lấy userId của người dùng hiện tại từ request
      const currentUser = await this.userService.getUserByAccountId(req.user.accountId);
      const userId = currentUser.id;

      // Gọi service để tính tổng số tin nhắn chưa được đọc
      const unreadCount = await this.chatService.countUnreadMessagesByGroup(userId);

      return { unreadCount };
    } catch (error) {
      console.error('Error calculating unread messages:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }


}
