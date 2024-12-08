import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schema/message.schema';
import { ChatController } from './chat.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    ],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService],
    exports: [ChatService],
})

export class ChatModule {}