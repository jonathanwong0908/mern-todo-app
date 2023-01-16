const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    done(error, null);
  }
})

module.exports = (passport) => {
  passport.use(strategy);
}