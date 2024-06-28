var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


router.post('/signup', (req, res) => {
	const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    console.log(checkBody(req.body, ["name", "email", "password"]))
    if (!checkBody(req.body, ["name", "email", "password"])) {
        res.json({
            result: false, 
            error: 'Missing or empty fields'
        })
    } else {
        User.findOne({email: email}).then(data => {
            if (data) {
                res.json({ 
                    result: false, 
                    error: 'User already exists' 
                })
            } else {
                newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
                
                newUser.save().then(()=> {
                    res.json({ result: true })
                })
            }
        })
    }
});


router.post('/signin', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(checkBody(req.body, ["email", "password"]))
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({
            result: false, 
            error: 'Missing or empty fields'
        })
    } else {
        User.findOne({email: email, password: password}).then(data => {
            if (!data) {
                res.json({ 
                    result: false, 
                    error: 'User not found' 
                })
            } else {
                res.json({ result: true })
            }
        })
    }
});

module.exports = router;
