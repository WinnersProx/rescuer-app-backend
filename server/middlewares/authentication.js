import dotenv from 'dotenv';
import passport from 'passport';
import PassportJwt from 'passport-jwt';
import User from '../models/user';

dotenv.config();
let JwtStrategy = PassportJwt.Strategy;
let ExtractJwt = PassportJwt.ExtractJwt;
const { SECRET } = process.env;

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  passReqToCallback : true
}, async (req, jwtPayload, done) => {
	const user = await User.findbyField('email', 'users', jwtPayload.email);
  if(user){
    return done(null, user);
  }
  else{
    return done(null, false);
  }
}));

export default passport;
