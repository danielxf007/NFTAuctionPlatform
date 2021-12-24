var express = require('express');
const web3_utils = require('web3-utils');
const bcrypt = require('bcrypt');
const salt = 10;
var router = express.Router();
const error_mssgs = require('../error-mssgs.json');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sign-up', { title: 'Sign Up' });
});

router.post('/', function(req, res, next){
    if(web3_utils.isAddress(req.body.wallet_addr)){
        next();
    }else{
        res.render('sign-up', {title: 'Sign Up', err: error_mssgs['invalid wallet']});
    }
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