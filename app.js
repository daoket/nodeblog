/**
* 应用程序的入口文件
* author wtniu
* date 2018-4-9
*/

// 加载模块
const express = require('express')
const swig = require('swig')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


// 创建app应用
const app = new express()
// 设置静态文件托管 当用户访问的url以/pulic开始，直接返回__dirname+'/public'下的文件
app.use('/public', express.static(__dirname + '/public'))
// 配置模板引擎
app.engine('html', swig.renderFile)
// 设置模板文件存放目录 参数一：必须为views
app.set('views', './views')
// 注册模板引擎 参数一：必须为view engine  参数二：app.engine中第一个参数相同
app.set('view engine', 'html')
// 开发环境 取消模板缓存
swig.setDefaults({cache: false})

// 中间件 处理post提交数据为json格式，必须在路由之前
app.use(bodyParser.urlencoded({ extended: true }))

// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

mongoose.connect("mongodb://127.0.0.1:27017/blog", error => {
  if (error) {
    console.log("数据库连接失败：" + error)
  } else {
    console.log("------数据库连接成功！------")
    // 监听http请求
    app.listen(8081)
    console.log('run: localhost:8081')
  }
});


