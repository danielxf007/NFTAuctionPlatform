var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sign-up', { title: 'Sign Up' });
});

module.exports = router;