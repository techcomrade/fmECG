const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/UserModel')
const bcrypt = require('bcrypt');
const authCtrl = require('./controllers/authController')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, 
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
      //console.log(accessToken, refreshToken, profile, done);
      let email = profile.emails[0].value;
      await User.queryDB(User.findOnebyEmail(email))
      .then((checked) => {
        if(checked){
        //  console.log(accessToken, refreshToken, checked[0].id);
          refreshToken = accessToken;
          authCtrl.insertToken(accessToken, refreshToken, checked[0].id);
          return done(null, profile);
        }
        return done(null, false);
        }
        )
      .catch(err => { return done(null, false)})

    });
  }
  ));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
