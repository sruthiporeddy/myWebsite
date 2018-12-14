const mongoose = require('mongoose');

const Schema = mongoose.Schema 

const userSchema = new Schema({
    firstname: string = '',
    lastname: string = '',
    emailId: string = '',
    password: string = '',
});


module.exports = mongoose.model('user',userSchema,'users');
