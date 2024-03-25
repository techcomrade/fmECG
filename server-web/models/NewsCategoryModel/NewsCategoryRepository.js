const CommonModel = require("../../models/CommonModel");
const NewsCategoryDTO = require('./NewsCategoryDTO')
class NewsCategoryModel extends CommonModel{
    async getAllData(){
        return await NewsCategoryDTO.findAll();
    }
    async add(category) {
        return await NewsCategoryDTO.create({
            id: category.id,
            category_name: category.category_name,
            category_description: category.category_description
        });
    }
    async deleteById(id) {
        return await NewsCategoryDTO.destroy({where: {
            id:id
        }});
    }
    async updateById(category){
        return await NewsCategoryDTO.update({
            category_name: category.category_name,
            category_description: category.category_description
        },{
            where:{
                id: category.id
            }
        })
    }
}


module.exports = new NewsCategoryModel();