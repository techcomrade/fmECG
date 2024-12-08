import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './schema/message.schema';
import { MessageRequest } from './dto/message.request';
import { ApiResponse } from '@nestjs/swagger';
import { ChatGateway } from './chat.gateway';
import { Socket } from 'socket.io';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatGateWay: ChatGateway
  ) { }

  // Lấy tin nhắn
  @ApiResponse({
    status: 200,
    type: [Chat],
    description: "Successful",
  })
  @Get('messages/:senderId/:receiverId/:groupChatId')
  async loadMessages(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
    @Param('groupChatId') groupChatId: string
  ) {
    let messageRequest = {
      senderId: senderId,
      receiverId: receiverId,
      groupChatId: groupChatId
    } as MessageRequest;

    console.log(messageRequest);

    return await this.chatGateWay.loadMessages(messageRequest, {} as Socket);
  }

  // Gửi tin nhắn
  @ApiResponse({
    status: 200,
    type: [Chat],
    description: "Successful",
  })
  @Post('send')
  async sendMessage(
    @Body() messageRequest: MessageRequest
  ) {
    console.log(messageRequest)
    return this.chatGateWay.handleMessage(messageRequest, {} as Socket)
  }
}
