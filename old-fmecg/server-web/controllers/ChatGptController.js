const ChatGptService = require("../services/ChatGptService");

class ChatGptController {
  async sendMessage(req, res, next) {
    console.log(`[P]:::Send message: ${req.body.message} `);
    const message = await ChatGptService.chat(req.body.message);
    if (message) {
      return res.status(200).json({
        message: "",
        metadata: message,
      });
    }
    return res.status(500).json({
      message: "chat error",
    });
  }
  async getHistory(req, res, next) {
    console.log(`[G]:::Get history message `);
    return res.status(200).json({
      message: "",
      metadata: await ChatGptService.history(),
    });
  }
  async training(req, res, next) {
    const message = req.body.message;
    console.log(`[P]:::update data training: ${message}`);
    if (message) {
      var result = ChatGptService.training(message);
      return result
        ? res.status(200).json({
            message: "Dữ liệu được tích hợp thành công",
          })
        : res.status(500).json({
            message: "Dữ liệu tích hợp không thành công",
          });
    }
  }
  async createAIConversation(req, res, next) {
    const user_id = req.body.user_id;
    console.log(`[P]:::Create ai conversation: ${user_id}`);
    const result = await ChatGptService.createAssistantConversation(user_id);
    return result ?  res.status(200).json({
      metadata: "Dữ liệu của bạn đã được tích hợp thành công",
      })
    : res.status(500).json({
        message: "Có lỗi vui lòng thử lại sau",
      });
  }
}
module.exports = new ChatGptController();
