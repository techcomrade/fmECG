export class MessageRequest {
    senderId: string;
    receiverId: string;
    message: string;
    groupChatId: string;
    time: number;
    latestMessage?: string;
    seenBy: string[];
}