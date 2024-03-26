const CommonModel = require("./CommonModel");

class NewsModel extends CommonModel{
    getAllData(){
        return `SELECT * FROM news`;
    }
    add(news) {
        return `INSERT INTO news(id, title, content, category_id, author, url, image, created_at, updated_at)
        VALUES ('${news.id}','${news.title}', '${news.content}', '${news.category_id}', '${news.author}', '${news.url}', '${news.image}', '${news.created_at}', '${news.updated_at}');`
    }
    deleteById(id) {
        return `DELETE FROM news WHERE id = '${id};`
    }
    updateById(news){
        return `UPDATE news SET title = '${news.title}', content = '${news.content}', category_id = '${news.category_id}', author = '${news.author}', url = '${news.url}', image = '${news.image}', created_at = '${news.created_at}', updated_at = '${news.updated_at}' WHERE id = '${news.id};`;
    }
}


module.exports = new NewsModel();