const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/users');


passport.use(new googleStrategy({

    clientID: '<YOUR_GOOGLE_CLIENT_ID>', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: '<YOUR_GOOGLE_CLIENT_SECRET>', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "http://localhost:8000/users/auth/google/callback"   
},

function(accessToken, refreshToken, profile, done){

    User.findOne({email:profile.emails[0].value}).exec(function(err,user){

            if(err){
                console.log("err in google strategy");
                return;
            }

            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create ({
                    name:profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes[20].toString('hex')

                }, function(err,user){
                    if(err){
                        console.log("err in creating strategy");
                        return;
                    }
                    return done(null,user);
                });
            }

    });
}

));


module.exports = passport;

