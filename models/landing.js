const mongoose = require('mongoose');

const Schema = mongoose.Schema 

const landingPageSchema = new Schema({
    heading: string = '',
    headingDescription: string = '',
    buttonDesc: string = ''
})
module.exports = mongoose.model('home',landingPageSchema,'landingPage');
