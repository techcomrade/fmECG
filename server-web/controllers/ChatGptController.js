const ChatGptService = require('../services/ChatGptService');

class ChatGptController {
    async sendMessage(req,res,next){
    console.log(`[P]:::Send message: ${req.body.message} `);
        const message = await ChatGptService.chat(req.body.message);
        if(message){
            return res.status(200).json({
                message: "",
                metadata: message
            })
        }
        return res.status(500).json({
            message: "chat error"
        })
    }
    async getHistory(req,res,next){
    console.log(`[G]:::Get history message `);
    return res.status(200).json({
        message: "",
        metadata: await ChatGptService.history
    })
    }
}
module.exports = new ChatGptController();