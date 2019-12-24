//引用对应的路由配置
// var index = require('./routers/index');
var login = require('./routers/login');
// var register = require('./routers/register');
// var publish = require('./routers/publish');
// var comment = require('./routers/comment');
// var person = require('./routers/person');
// var del = require('./routers/del');
// var delcom = require('./routers/delcom');

module.exports = function(app) {
    // 主页路由入口
    // app.use('/index', index);

    // 登录路由入口
    app.use('/api/login', login);

    //注册路由入口
    // app.use('/register', register);
    
    //发表文章路由入口
    // app.use('/publish', publish);

    // 发表评论路由入口
    // app.use('/comment', comment);

    // 个人主页路由入口
    // app.use('/person', person);

    // 删除文章路由入口
    // app.use('/del', del);
    
    // 删除评论路由入口
    // app.use('/delcom', delcom);

    //退出登录路由
    // app.get('/exit', function(req, res) {
    //     req.session.user = null;
    //     res.redirect('/index');
    // })
}