const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleSchema = new Schema({
    googleId: string,
    username: string    
})

const googleUserModel  = mongoose.model('googleUser',googleSchema);

module.exports = googleUserModel;