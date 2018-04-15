const mongoose = require('mongoose');
const categoriesSchema = require('../schemas/categories')

// 定义一个模型类
module.exports = mongoose.model('Category', categoriesSchema)
