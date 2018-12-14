const mongoose = require('mongoose');

const Schema = mongoose.Schema 

const BlogHeaderSchema = new Schema({
         tagline: string,
         title : string 
        }); 

module.exports = mongoose.model('blogheader',BlogHeaderSchema,'blogHeader');