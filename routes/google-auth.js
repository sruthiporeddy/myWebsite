const express = require('express');
const passport = require('passport');
const router = express.Router();
// router.use(passport.initialize());


router.get('/google', passport.authenticate('google',{
  scope: ['profile']
})
);

router.get('/google/redirect',passport.authenticate('google'),(req,res) => {
    res.send("Succesfully logged in");
})

module.exports = router;