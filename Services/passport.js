const passport = require ('passport');
const LocalStrategy  = require ('passport-local');
const User  = require ('../Models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require ('../config');

const localOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
    secretOrKey: config.secret
  };
  
  const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
  
      if (!user) {
        return done(null, false);
      }
  
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = {
  authLocal : passport.authenticate('local', { session: false }),
  authjwt : passport.authenticate('jwt',{session:false})
}