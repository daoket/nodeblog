/**
* 应用程序的入口文件
* Created by wtniu on 2018-04-11.
* Copyright 2018 wtniu. All rights reserved.
*/

// 加载模块
const express = require('express')
const swig = require('swig')
const mongoose = require("mongoose")
// 将post发送的数据解析为json，并通过req.body来调用
const bodyParser = require("body-parser")
const Cookies = require("cookies")
const User = require('./models/User')

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
// 不缓存
swig.setDefaults({cache: false})

// 中间件 处理post提交数据为json格式，必须在路由之前
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 设置cookie
app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res)
  // 解析登录用户的cookies信息
  var userInfo = {}
  if (req.cookies.get('userInfo')) {
    try{
      req.userInfo = JSON.parse(req.cookies.get("userInfo"));
      User.findById(req.userInfo._id).then(function (userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
      })
    }catch(e){
    	console.log(e)
    }
  }
  next()
})

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
    app.listen(1234)
    console.log('Server running at: http://localhost:1234')
  }
});


