const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
const api = require('./routes/api');
const blog = require('./routes/blog');
const googleAuth = require('./routes/google-auth');
const passportSetup = require('./config/passport-setup');
const mongoose = require('./config/mongoose-connect');
const keys = require('./config/keys');

app.set('view engine','ejs');
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookiekey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/api',api);
app.use('/oauth',googleAuth);
app.use('/blogApi',blog);



app.get('/', (req,res) => {
    res.send('Hello world');
})


app.listen(3000, () => {
    console.log('server started on port 3000');
} )  