const express = require("express");
const router = express.Router();
const User = require('../models/user')

router.get("/", (req, res, next) => {
  setTimeout(() => {
    res.render("main/index", {
      userInfo: req.userInfo
    });
  }, 200);
});

module.exports = router;
