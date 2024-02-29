import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from './models/User.js';
dotenv.config();

// Define options for the JWT strategy.
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

// Configure Passport to use the JWT strategy for authentication.
passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      // Attempt to find a user by their ID extracted from the JWT payload.
      const user = await User.findById(jwt_payload.id);
      if (user) {
        // If the user is found, complete the authentication process successfully with the user object.
        return done(null, user);
      } else {
        // If the user is not found, authentication fails
        return done(null, false);
      }
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  })
);

export default passport;
