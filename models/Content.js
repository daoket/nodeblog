const mongoose = require('mongoose');
const contentSchema = require('../schemas/contents')

// 定义一个模型类
module.exports = mongoose.model('Content', contentSchema)
