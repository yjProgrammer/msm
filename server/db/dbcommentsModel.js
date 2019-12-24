var mongoose = require('./dbConnect')('bloguser');  //设置连接数据库
var commentsSchema = mongoose.Schema({
    date: String,
    content: String, 
    source: {type: mongoose.Schema.Types.ObjectId, ref: 'articles'}, 
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'userinfo'},
}, {collection: 'comments'}); //连接集合
var commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;