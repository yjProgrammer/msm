// 所有的文章存放数据库
var mongoose = require('./dbConnect')('bloguser');  //设置连接数据库
var articlesSchema = mongoose.Schema({
    date: String,
    title: String, 
    content: String,  
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'userinfo'},
    scans: Number,
    comments: Number
}, {collection: 'articles'}); //连接集合
var articlesModel = mongoose.model('articles', articlesSchema);

module.exports = articlesModel;