const express = require("express");
const router = express.Router();
const User = require('../models/User')
const Category = require('../models/Category')
const Content = require('../models/Content')

router.get("/", (req, res, next) => {
  setTimeout(() => {
    var data = {
      userInfo: req.userInfo,
      categories: [],
      count: 0,
      page: Number(req.query.page || 1),
      limit: 5,
      pages: 0
    }
    
    Category.find().then(function (categories) {
      data.categories = categories
      return Content.count()
    }).then(function (count) {
      
      data.count = count
      data.pages = Math.ceil(data.count / data.limit)
      data.page = Math.min(data.page, data.pages) // page最大为pages
      data.page = Math.max(data.page, 1) // page 最小为1
      var skip = (data.page - 1) * data.limit
      return Content.find().sort({addTime: -1}).limit(data.limit).skip(skip).populate(['category', 'user'])
    }).then(function (contents) {
      data.contents = contents
      res.render("main/index", data)
    })
  }, 200);
});

module.exports = router;
