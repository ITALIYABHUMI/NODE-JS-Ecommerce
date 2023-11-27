const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const registerTbl = require('./form');

passport.use(new passportLocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await registerTbl.findOne({ email: email });
        if (!user || user.password != password) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log(err);
        return false;
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser((id, done) => {
    registerTbl.findById(id).then((user) => {
        return done(null, user)
    }).catch((err) => {
        console.log(err);
        return false;
    })
})


passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');

}

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}


module.exports = passport;