// 所有用户信息存放数据库
var mongoose = require('./dbConnect')('bloguser');  //设置连接数据库
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    photo: String,
    personinfo: String
}, {collection: 'userinfo'}); //连接集合
var userModel = mongoose.model('userinfo', userSchema);

module.exports = userModel;  