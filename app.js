const express = require('express')
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dbOptions = require('./config/config');

const app = express()
// 连接mongoDB数据库
mongoose.connect(dbOptions.url,dbOptions.options);
var db = mongoose.connection;

// 监听数据库连接状态
db.on('error',function(err){
    console.log('db connection fail')
})
db.on('open',function(){
    console.log('db connection sucess');
})

// 创建 application/json 解析
app.use(bodyParser.json())
// 创建 application/x-www-form-urlencoded 解析
app.use(bodyParser.urlencoded({ extended: false }))

// ejs模版引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')

// 托管静态资源
app.use(express.static(__dirname+'/public'))

//路由控制
// 后台
app.use('/admin',require('./router/admin'))
// 前台
 app.use('/about',require('./router/about'))
 app.use('/message',require('./router/message'))
 app.use('/details',require('./router/details'))
 app.use('/',require('./router/index'))

app.listen(3000)