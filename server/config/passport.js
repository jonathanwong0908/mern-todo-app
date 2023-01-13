const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

module.exports = () => {
  const ExtractJWT = passportJWT.ExtractJwt;
  passport.use(
    new passportJWT.Strategy({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    }, async (req, payload, done) => {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, true);
      } else {
        return done(new Error("User not found"), false);
      }
    })
  )
  return {
    initialize: () => {
      return passport.initialize();
    }
  }
}