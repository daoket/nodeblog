const express = require("express");
const router = express.Router();
const User = require('../models/user');

var responseDate

router.use((req, res, next) => {
  responseDate = {
    code: "0",
    message: ""
  }
  next()
})

// 用户注册
router.post("/user/register", (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  let repassword = req.body.repassword

  if (username == '') {
    responseDate = {
      code: '1',
      message: '姓名不能为空'
    }
    res.json(responseDate)
    return
  }
  if (password == '') {
    responseDate = {
      code: '2',
      message: '密码不能为空'
    }
    res.json(responseDate)
    return
  }
  if (password != repassword) {
    responseDate = {
      code: '3',
      message: '两次密码不一致'
    }
    res.json(responseDate)
    return
  }
  // 查询数据库是否重名
  User.findOne({
    username: username
  }).then((userInfo) => {
    if (userInfo) {
      console.log(userInfo)
      responseDate = {
        code: 4,
        message: '用户名已经被注册'
      }
      res.json(responseDate)
      return
    }
    var user = new User({
      username: username,
      password: password
    })
    return user.save()
  }).then((newUserInfo) => {
    console.log(newUserInfo)
    responseDate.message = "注册成功";
    res.json(responseDate);
  })
});

module.exports = router;
