var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/auth', function(req, res, next) {
  // res.setHeader('cookie')
  console.log('%celelee test:', 'background:#000;color:#fff', 1);
  // res.cookie('user', 'admin', { maxAge: 60000000, httpOnly: false, signed: true });
  res.cookie('user', 'elelee', { expires: new Date(Date.now() + 900000), httpOnly: true });
  res.send({
    data: {
      user: {
        username: 'elelee',
        avatar_url: 'https://drimg.scbao.com/tuku/yulantu/121016/235026-12101613062993.jpg',
      },
    },
    code: 0,
    msg: 'suc',
  });
});

router.get('/get_menus', function(req, res, next) {
  console.log('%celelee test:', 'background:#000;color:#fff', 'get_menus');
  res.send({
    data: [],
    code: 0,
    msg: 'suc',
  });
});

module.exports = router;
