const mongoose = require('mongoose');
const keys = require('./keys');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.ROOT_URL || keys.mongoDB.url ,err => {
    if(err) {
        console.log('Problem connecting to DB');
    }
    else {
        console.log('connected to DB');
    }
});

module.exports = mongoose;