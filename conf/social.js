import GoogleStrategy from 'passport-google-oauth20';
import app from './app.js';

const Google = passport => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GID,
      clientSecret: process.env.GSECRET,
      callbackURL: `http://${app.host}/auth/google`
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

export default Google;