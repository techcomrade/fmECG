import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageRequest } from './dto/message.request';
import { UserService } from '../user/user.service';

@WebSocketGateway({
  cors: {
    origin: 'http://127.0.0.1:3002',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private userService: UserService
  ) { }
  // Người dùng tham gia phòng chat (có thể là chat nhóm)
  @SubscribeMessage('joinGroup')
  async joinGroup(@MessageBody() groupChatId: string, @ConnectedSocket() client: Socket) {
    client.join(groupChatId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageRequest: MessageRequest,
    client: Socket
  ) {
    if (messageRequest.groupChatId) {
      // Xác định event và nhóm
      const groupChatId = messageRequest.groupChatId;
      const receiveEvent = `receiveMessageFrom${groupChatId}`;

      // Gửi tin nhắn đến tất cả các client trong nhóm
      this.server.to(groupChatId).emit(receiveEvent, messageRequest);
    }

    // Lưu tin nhắn vào cơ sở dữ liệu
    await this.chatService.saveMessage(messageRequest);
  }

  @SubscribeMessage('getMessages')
  async loadMessages(@MessageBody() messageRequest: MessageRequest, client: Socket) {
    let messages = await this.chatService.loadMessages(messageRequest);
    return messages;
  }
} 
