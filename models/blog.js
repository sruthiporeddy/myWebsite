const mongoose = require('mongoose');

const Schema = mongoose.Schema 

const postSchema = new Schema({
            postId: string,
            title: string,
            author: string,
            publishDate: string, 
            image: string,
            excert: string  
         
        });




module.exports = mongoose.model('post',postSchema,'posts');
