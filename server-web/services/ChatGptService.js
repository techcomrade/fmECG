const Joi = require("joi");
const openai = require("../config/chatgpt_api");
const {
  filterUserAnswer,
  filterActionWeb,
  clearCache,
} = require("../utils/stringUtils");
var chatHistory = [
  {
    role: "system",
    content:
      "Bạn là trợ lý ảo của hệ thống quản lý dữ liệu, thiết bị y tế ECG AI, bạn có nhiệm vụ tư vấn cho người dùng về hệ thống và hướng dẫn người dùng sử dụng hệ thống",
  },
];
class ChatGptService {
  async chat(messageData, user_id) {
    const message = filterUserAnswer(messageData);
    const filterMessage = filterActionWeb(message);
    if (filterMessage) return filterMessage;
    if (clearCache(message)) {
      chatHistory = [
        {
          role: "system",
          content:
            "Bạn là trợ lý ảo của hệ thống quản lý dữ liệu, thiết bị y tế ECG AI, bạn có nhiệm vụ tư vấn cho người dùng về hệ thống và hướng dẫn người dùng sử dụng hệ thống",
        },
      ];
      return "Đã xoá bộ nhớ đệm thành công";
    }
    try {
      chatHistory?.push({
        role: "user",
        content: message,
      });
      const response = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-3.5-turbo",
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
    return undefined;
  }
  async history(user_id) {
    return chatHistory;
  }

  async creatAssistant() {
    const assistant = await openai.beta.assistants.create({
      name: "ECG AI",
      instructions:
        "Bạn là trợ lý ảo của hệ thống quản lý dữ liệu y tế ecg, ecg là hệ thống quản lý thiết bị y tế và dữ liệu y tế thông minh cung cấp cho người dùng giải pháp chăm sóc sức khoẻ tim mạch, và kết nối với trợ lý ảo và bác sĩ hỗ trợ",
      tools: [{ type: "retrieval" }],
      model: "gpt-4",
    });
    console.log("create assistant:", assistant);
    return true;
  }

  async createThreadChat() {
    let run = await openai.beta.threads.runs.createAndPoll(
      "thread_JBm1QGWAJ5JzhGhaVBrqqIyx",
      {
        assistant_id: "asst_klOlGrfqBrsIFIGyehBBwxU4",
        instructions:
          "Bạn là trợ lý ảo của hệ thống quản lý dữ liệu y tế ecg, ecg là hệ thống quản lý thiết bị y tế và dữ liệu y tế thông minh cung cấp cho người dùng giải pháp chăm sóc sức khoẻ tim mạch, và kết nối với trợ lý ảo và bác sĩ hỗ trợ",
      }
    );

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      for (const message of messages.data.reverse()) {
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
    } else {
      console.log(run.status);
    }
    const runs = await openai.beta.threads.runs.list(
      "thread_JBm1QGWAJ5JzhGhaVBrqqIyx"
    );

    console.log(runs);

    const response = await openai.beta.threads.del(
      "thread_JBm1QGWAJ5JzhGhaVBrqqIyx"
    );

    console.log(response);
  }
  
}
module.exports = new ChatGptService();