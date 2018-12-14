const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Home = require('../models/landing');



router.get('/', (req,res) => {
    res.send('Hello form api');
})

router.get('/register',(req,res) => {
    User.find().then((data) => {
        console.log(data);
        res.send({data});
    },
    (err) => {
        res.status(400).send(err);
    });
});


router.get('/home',(req,res) => {
    Home.find().then((data) => {
        //console.log(data);
        res.send(data);
    },
    (err) => {
        // console.log(err.status);
        if(err.status === 500) {
            res.status(500).send(err);
        }
        if(err.status === 401) {
            res.status(401).send(err);
        }
    });
});


router.post('/register',(req,res) => {
    let user = req.body;
    //console.log(user);
    let registeredUser = new User(user);
    registeredUser.save((err,regUser) => {
        if(err) {
             console.log("Error occured while registering user");
        } else {
            let payload = { subject: regUser._id };
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
        }
        
    });
})

router.post('/login', (req,res) => {
    let userData = req.body;
   // console.log(userData);
    User.findOne({emailId: userData.emailId}, (err, user) =>
    {
        if(err) {
            console.log(err);
            //res.status(501).send("Internal error")
        } else
            if(!user){
               // console.log("no user");
                res.status(401).send("Unauthorized User"); 
            } else 
            if(user.password!== userData.password) {
                res.status(401).send('Invalid password');
            } 
            else {
                let payload = { subject:user._id };
                let token = jwt.sign(payload,'secretKey');
        
               // console.log("success");
                res.status(200).send({token});
            }
       
    });
})



module.exports = router;