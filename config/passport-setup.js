const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys =require('./keys');
const GoogleUser = require('../models/googleUser');



passport.serializeUser((user,done) => {
   return done(null,user.id);
})

passport.deserializeUser((id,done) => {
    GoogleUser.findById(id).then((user) => {
       return done(null,user);
    })
    
})


passport.use(new GoogleStrategy({
    callbackURL:'/oauth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile,done) => {
    GoogleUser.findOne({'googleId': profile.id}).then(
        (currentUser) => {
            if(currentUser) {
                console.log('currentuser -----------',currentUser);
                return done(null,currentUser);
            } else {
                new GoogleUser({
                    googleId: profile.id ,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('new User-----------',newUser );
                    return done(null,newUser);
                })
            }
    })  

}))