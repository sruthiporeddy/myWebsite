
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/blog');
const BlogHeader = require('../models/blogHeader');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

function verifyToken(req,res,next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    
    if(token === null) {
        return res.status(401).send('Unauthorized request');
    } 
   
    let payload = jwt.verify(token,'secretKey');
    
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
   
    req.userid = payload.subject;
    next();
 }
 

router.get('/blogpost',verifyToken,(req,res) => {
    Post.find().then(data => {
       // console.log(data);
        res.status(200).send(data);
    },
    (err) => {
        if(err.status === 500) {
            res.status(500).send(err);
        }
        if(err.status === 401) {
            res.status(401).send(err);
        }
    });
}); 

router.get('/blogHeader',verifyToken,(req,res) => {
    BlogHeader.find().then(data => {
       // console.log(data);
        res.status(200).send(data);
    },
    (err) => {
        if(err.status === 500) {
            res.status(500).send(err);
        }
        if(err.status === 401) {
            res.status(401).send(err);
        }
    });
}); 


/*router.post('/blogpost',(req,res) => {
    let home = req.body;
    let homePage = new BlogHeader(home);
    homePage.save((err,homesaved) => {
        if(err){
            console.log("Error occured while registering user"); 
        }
        else {
            res.status(200).send({homesaved});
        }
    });

}) ; */

router.patch('/blogpost/:id',(req,res) => {
    const id = req.params.id;
   
    // using loadsh
    const newupdatedValue = _.pick(req.body,['title','author','image','excert'])

    // Using $set of mongoose
    // const updateOps = {};
    // for(let ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    if(!ObjectID.isValid(id)) {
        res.status(404).send('No Post with that id');
    }
    Post.findByIdAndUpdate(id,{$set: newupdatedValue},{new : true}).then((result) => {
        console.log(result);
        if(!result) {
            return res.status(404).send('No post available '); 
        }
        res.status(200).send({result});
    }).catch( err => {  
        res.status(500).send(err);
    })
    

}) ;

module.exports = router;