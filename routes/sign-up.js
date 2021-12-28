var express = require('express');
const bcrypt = require('bcrypt');
const error_mssgs = require('../error-mssgs.json');
const confirmation_mssgs = require('../confirmation-mssgs.json');
const mongoose = require('mongoose');
const db_url = require('../config/db_url.json');
const user_model = require('../models/user');
var router = express.Router();
const salt = 10;
const user_db_url = db_url["clients_db"];

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

router.get('/', function(req, res) {
  res.render('sign-up', { title: 'Sign Up' });
});

//Connects with the data base
router.post('/', async function(req, res, next){
    try{
        let db = await mongoose.connect(user_db_url, connectionParams);
        next();
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
    }
});

//Checks if user exists
router.post('/', async function(req, res, next){
    try{
        let result = await user_model.find({user_name: req.body.user_name});
        if(result.length){
            throw new Error(error_mssgs['user name exists']);
        }else{
            next();
        }
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
    }
});

//Hashes password
router.post('/', async function(req, res, next){
    try{
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next()
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
    }
});

//Adds user to the database
router.post('/', async function(req, res, next){
    try{
        let new_user = new user_model(req.body);
        await new_user.save();
        next();
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
    }
});

//Closes data base connection
router.post('/', async function(req, res, next){
    try{
        await mongoose.disconnect();
        next();
    }catch(e){
        res.render('sign-up', {title: 'Sign Up', err: e});
    }
});

//Renders the sign up page
router.post('/', function(req, res){
    res.render('sign-up', {title: 'Sign Up', mssg: confirmation_mssgs['user created']});
});

module.exports = router;