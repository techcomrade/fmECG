const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

class RegisterGoogleSerivce {
	constructor() {
		passport.use(
			new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: "/auth/register/google/callback",
				},
				(accessToken, refreshToken, profile, done) => {
					process.nextTick(async () => {
						console.log(profile);
						let email = profile.emails[0].value;
						await User.queryDB(User.findOnebyEmail(email)).then(
							async (checked) => {
								if (!checked) {
									let data = {};
									data.email = email;
									data.password = await bcrypt.hash(profile.displayName, 10);
									console.log(data);
									let isAdded = User.insertDatatoDB(data, "user");
									if (isAdded) {
										return done(null, profile);
									}
								}
								return done(null, false);
							}
						);
					});
				}
			)
		);
		passport.serializeUser(function (user, done) {
			done(null, user);
		});

		passport.deserializeUser(function (obj, done) {
			done(null, obj);
		});
	}

    registerGoogle(){
        passport.authenticate('google', {
            scope: ['profile', 'email']
            })
    }

    callbackRegisterGoogle(){
        passport.authenticate('google',{
            successRedirect: '/login',
            failureRedirect: '/register',
            })
    }
}

module.exports = new RegisterGoogleSerivce;