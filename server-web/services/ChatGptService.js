const Joi = require('joi');
const openai = require('../config/chatgpt_api')
var chatHistory = "";
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