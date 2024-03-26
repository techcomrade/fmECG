const NewsDTO = require("./NewsDTO");
class NewsModel {
  async getAllData() {
    return await NewsDTO.findAll();
  }
}

module.exports = new NewsModel();
