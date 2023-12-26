const passport = require('passport');
const GoogleStrategy = require('passport-google-strategy').trategy;
const authController = require('../Controllers/authController');

class LoginGoogleService {
    constructor(){
        passport.use(
            new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackUrl: '/auth/google/callback'
            },
            (accessToken, refreshToken, profile, done) => {
                 process.nextTick(async () => {
                    let email = profile.emails[0].value;
                    await User.queryDB(User.findOnebyEmail(email))
                    .then((checked) => {
                        if(checked) {
                            refreshToken = accessToken;
                            authController.insertToken(
                                accessToken, 
                                refreshToken,
                                checked[0].id
                            ); 
                            return done(null, profile);
                        }
                        else return done(null, false);
                    })
                    .catch((error) => {
                        console.log(error);
                        return done(null, false);
                    })
                 })
            }
        ));
        passport.serializeUser((user, done) => {
            done(null, user);
        })
        passport.deserializeUser((obj, done) => {
            done(null, obj);
        })
    };
    loginGoogle(req, res, next) {
        passport.authenticate("google", {
            scope: [
                "profile",
                "email"
            ]
        })
    }
    callbackLoginGoogle(req, res, next) {
        passport.authenticate("google", {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    }

}

module.exports = new LoginGoogleService;