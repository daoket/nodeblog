const mongoose = require("mongoose")

// 内容表结构
module.exports = new mongoose.Schema({
  
  // 关联字段
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  title: String,
  // 用户
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // 添加时间
  addTime: {
    type: Date,
    default: new Date()
  },
  // 阅读量
  view: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  comments: {
    type: Array,
    defalut: []
  }
})
