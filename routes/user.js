var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('user', {title: 'Hello'+req.session.cookie.user_name});
});



module.exports = router;
