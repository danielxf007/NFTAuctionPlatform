const express = require('express');
const bcrypt = require('bcrypt');
const error_mssgs = require('../error-mssgs.json');
const mongoose = require('mongoose');
const db_url = require('../config/db_url.json');
const user_model = require('../models/user');
var router = express.Router();
const user_db_url = db_url["clients_db"];

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

function isEmptyObject(object){
    return Object.keys(object).length === 0;
}

router.get('/', function(req, res, next) {
    if(isEmptyObject(req.query)){
        res.render('sign-in', { title: 'Sign In' });
    }else{
        next();
    }
});
  
//Connects with the data base
router.get('/', async function(req, res, next){
    try{
        await mongoose.connect(user_db_url, connectionParams);
        next();
    }catch(e){
        res.render('sign-in', {title: 'Sign In', err: e});
    }
});

//Checks if user exists
router.get('/', async function(req, res, next){
    try{
        let result = await user_model.findOne({user_name: req.query.user_name});
        if(isEmptyObject(result)){
            throw new Error(error_mssgs['inexistent user']);
        }else{
            req.hashed_password = result['password'];
            next();
        }
    }catch(e){
        res.render('sign-in', {title: 'Sign In', err: e});
    }
});

//Checks if the password is correct
router.get('/', async function(req, res, next){
    try{
        let matched = await bcrypt.compare(req.query.password, req.hashed_password);
        if(!matched){
            throw new Error(error_mssgs['inexistent user']);
        }else{
            next();
        }
    }catch(e){
        res.render('sign-in', {title: 'Sign In', err: e});
    }
});

router.get('/', function(req, res){
    req.session.user_name = req.query.user_name;
    res.redirect('/user');
});

module.exports = router;