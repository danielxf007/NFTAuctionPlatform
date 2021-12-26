var express = require('express');
const web3_utils = require('web3-utils');
const bcrypt = require('bcrypt');
const error_mssgs = require('../error-mssgs.json');
const mongoose = require('mongoose');
const db_url = require('../config/db_url.json');
require('dotenv').config();
var router = express.Router();
const salt = 10;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD
var user_db_url = db_url["clients_db"];

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

router.get('/', function(req, res) {
  res.render('sign-up', { title: 'Sign Up' });
});

//Checks if a wallet address is valid
router.post('/', function(req, res, next){
    if(web3_utils.isAddress(req.body.wallet_addr)){
        next();
    }else{
        res.render('sign-up', {title: 'Sign Up', err: error_mssgs['invalid wallet']});
    }
});

//Connects with the data base
router.post('/', async function(req, res, next){
    try{
        let connection = await mongoose.connect(user_db_url, connectionParams);
        next();
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
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