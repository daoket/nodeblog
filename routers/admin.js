const express = require('express')
const router = express.Router()

// router.use((req, res, next) => {
//   console.log(req.userInfo)
//   if (!req.userInfo.isAdmin) {
//     res.send('对不起，只有管理员才能进入后台管理')
//     return
//   }
//   next()
// })

router.get('/', (req, res, next) => {
  res.render('admin/index', {
    userInfo: req.userInfo
  })
})

module.exports = router