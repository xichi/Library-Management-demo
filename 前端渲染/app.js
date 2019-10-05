/* 
   图书馆管理系统---入口文件
*/
const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const app = express();

//启动静态资源服务
app.use('/www',express.static('public'));

//处理请求参数，挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//路由
app.use(router);

//启动服务器功能
app.listen(3000,()=>{
    console.log('running');
})