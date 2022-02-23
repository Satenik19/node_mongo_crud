import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

const localOpts = {
    usernameField: 'email',
    passwordField: 'password',
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return done(null, false, { "message": "User does not exist" });
        } else if (!user.authenticateUser(password)) {
            return done(null, false, { "message": "Wrong credentials" });
        }
        const userData =  {
            _id: user._id,
            email: user.email,
            token: `JWT ${user.createToken()}`,
        };

        return done(null, userData);
    } catch (e) {

        return done(e, false);
    }
});

const jwtStrategy = new JWTStrategy(jwtOptions, async (payload, done) => {
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

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });