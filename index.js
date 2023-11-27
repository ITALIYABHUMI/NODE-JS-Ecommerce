const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookie = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const port = 8200;

const app = express(); 

const localpassport = require('./model/localpassport')

const db = require('./config/mongoose');

app.use(
    session({
        name: 'e-commerce', 
        secret: 'e-commerce',
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }) 
)

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookie())
app.use(express.urlencoded())
app.use(flash())
app.use(passport.session()); 
app.use(passport.initialize());
app.use(passport.setAuthentication);

app.use((req, res, next) => {
    res.locals.message = req.flash();
    next(); 
});

app.use('/', require('./routes/'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server started on port: " + port);
});
