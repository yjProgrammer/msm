//引用外部方法及模块
const express = require('express'); 
const session = require('express-session'); 
const bodyParser = require('body-parser');
const router = require('./router');
const path = require('path');
const config = require('./config');

const app = express();

app.use(session(config.session)); //配置session
app.use(express.static(path.join(__dirname, 'views'))); //配置静态目录
app.use(bodyParser.urlencoded({extended: true}));  //body配置
// app.set('views', path.join(__dirname, 'views'));  //ejs配置
// app.set('view engine', 'ejs');

router(app);  //路由引用

app.listen(config.port, function() {
    console.log('running...');
})