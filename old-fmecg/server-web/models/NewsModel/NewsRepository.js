const NewsDTO = require("./NewsDTO");
class NewsModel {
  async getAllData() {
    return await NewsDTO.findAll();
  }
  async deleteById(id,t){
    return await NewsDTO.destroy({
      where:{
        id:id
      }
    },
    t && {
      transaction: t,
    })
  }
}

module.exports = new NewsModel();
