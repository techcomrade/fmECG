const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/UserModel')
const bcrypt = require('bcrypt');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/register/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
      //console.log(profile);
      let email = profile.emails[0].value;
      await User.queryDB(User.findOnebyEmail(email))
      .then(async (checked) => {
        if(!checked){
          let data = {};
          data.email = email;
          data.password = await bcrypt.hash(profile.displayName, 10);
          console.log(data);
          let isAdded = User.insertDatatoDB(data, 'user');
          if(isAdded) {
              return done(null, profile);
          }
        }
        return done(null, false);
      })
    });
  }
))
passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });
    
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_SECRET_KEY ,
        callbackURL: "/auth/facebook/login"
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          console.log(accessToken, refreshToken, profile, done);
          return done(null, profile);
        });
      }
    ));
