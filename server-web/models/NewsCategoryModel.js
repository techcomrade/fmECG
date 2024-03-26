const CommonModel = require("./CommonModel");

class NewsCategoryModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM news_categories;`;
    }
    add(category) {
        return `INSERT INTO news_categories(id, category_name, category_description, created_at, updated_at)
        VALUES ('${category.id}','${category.category_name}', '${category.description}', '${category.created_at}', '${category.updated_at}');`
    }
    deleteById(id) {
        return `DELETE FROM news_categories WHERE id = '${id};`
    }
    updateById(category){
        return `UPDATE news_categories SET category_name = '${category.category_name}', category_description= '${category.category_description}', created_at = '${category.created_at}', updated_at= '${category.updated_at}', WHERE id = '${category.id};`;
    }
}


module.exports = new NewsCategoryModel();