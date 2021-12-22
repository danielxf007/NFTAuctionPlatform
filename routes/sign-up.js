var express = require('express');
const bcrypt = require('bcrypt');
const salt = 10;
var router = express.Router();

var request_time  = function (req, res, next){
    req.requesTime = Date.now();
    next();
}

router.use(request_time);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sign-up', { title: 'Sign Up' });
});

router.post('/', async function(req, res, next){
    let hash = await bcrypt.hash(req.body.password, salt);
    if(hash){
        req.body.password = hash;
        next()
    }else{
        res.sendStatus(400);
    }
});

router.post('/', function(req, res){
    console.log(req.body);
    res.render("index");
});

module.exports = router;