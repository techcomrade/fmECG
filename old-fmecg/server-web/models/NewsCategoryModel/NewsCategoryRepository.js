const NewsCategoryDTO = require("./NewsCategoryDTO");
class NewsCategoryModel {
  async getAllData() {
    return await NewsCategoryDTO.findAll();
  }
  async add(category) {
    return await NewsCategoryDTO.create({
      id: category.id,
      category_name: category.category_name,
      category_description: category.category_description,
    });
  }
  async deleteById(id,t) {
    return await NewsCategoryDTO.destroy({
      where: {
        id: id,
      },
    },
    t && {
      transaction: t,
    });
  }
  async updateById(category) {
    return await NewsCategoryDTO.update(
      {
        category_name: category.category_name,
        category_description: category.category_description,
      },
      {
        where: {
          id: category.id,
        },
      }
    );
  }
}

module.exports = new NewsCategoryModel();
