const express = require("express");
const router = express.Router();
const User = require('../models/User')
const Category = require('../models/Category')
const Content = require('../models/Content')

var data = {}
router.use(function (req, res, next) {
  data = {
    userInfo: req.userInfo,
    categories: []
  }
  Category.find().then(function (categories) {
    data.categories = categories
    next()
  })
})

router.get("/", (req, res, next) => {
    data.category = req.query.category || '',
    data.count = 0,
    data.page = Number(req.query.page || 1),
    data.limit = 5,
    data.pages = 0
  
  // 筛选首页分类
  var where = {}
  if (data.category) {
  	where.category = data.category
  }
  
  Category.count().then(function (count) {
    
    data.count = count
    data.pages = Math.ceil(data.count / data.limit)
    data.page = Math.min(data.page, data.pages) // page最大为pages
    data.page = Math.max(data.page, 1) // page 最小为1
    var skip = (data.page - 1) * data.limit
    return Content.where(where).find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user'])
  }).then(function (contents) {
    data.contents = contents
    res.render("main/index", data)
  })
});

router.get('/view', (req, res) => {
  
  var contentid = req.query.contentid || ''
  Content.findOne({
    _id: contentid
  }).then(function (content) {
    data.content = content
    
    // 记录阅读数
    content.view++
    content.save()
    res.render('main/view', data)
  })
})

module.exports = router;
