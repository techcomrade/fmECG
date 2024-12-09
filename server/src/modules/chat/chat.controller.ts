import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './schema/message.schema';
import { MessageRequest } from './dto/message.request';
import { ApiResponse } from '@nestjs/swagger';
import { ChatGateway } from './chat.gateway';
import { Socket } from 'socket.io';
import { UserGuardModel } from '../authentication/dto/user.guard.model';
import { UserService } from '../user/user.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatGateWay: ChatGateway,
    private userService: UserService
  ) { }

  // Lấy tin nhắn
  @ApiResponse({
    status: 200,
    type: [Chat],
    description: "Successful",
  })
  @Get('messages/:senderId/:receiverId/:groupChatId')
  async loadMessages(
    @Param('receiverId') receiverId: string,
    @Param('groupChatId') groupChatId: string,
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    let senderId = (await this.userService.getUserByAccountId(req.user.accountId)).id;

    let messageRequest = {
      senderId: senderId,
      receiverId: receiverId,
      groupChatId: groupChatId
    } as MessageRequest;

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
    @Body() messageRequest: MessageRequest,
    @Req() req: Request & { user?: UserGuardModel },
  ) {
    let senderId = (await this.userService.getUserByAccountId(req.user.accountId)).id;
    messageRequest.senderId = senderId;
    return this.chatGateWay.handleMessage(messageRequest, {} as Socket)
  }
}
