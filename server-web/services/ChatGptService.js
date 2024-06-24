const Joi = require('joi');
const openai = require('../config/chatgpt_api')
var chatHistory = "You: Hệ thống quản lý dữ liệu thiết bị điện tim, hệ thống bao gồm app, server và web, tên: ECG Admin, bạn là ai trợ giúp tư vấn người dùng, tôi tên là Tuấn";
class ChatGptService {
    async chat (message,user_id){
        chatHistory += `\nYou: ${message}`;
        try {
            const response = await openai.chat.completions.create({
                messages: [{ role: "user", content: chatHistory}],
                model: "gpt-3.5-turbo",
              });
            chatHistory += `\nAssistant:${response.choices[0].message.content}`

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);
            return undefined;
        }
    }
    async history(user_id){
        return chatHistory;
    }
}

module.exports = new ChatGptService();