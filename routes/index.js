const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const routes = express.Router();

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imagedata = multer({ storage: file }).single('image');

const admincontroller = require('../controller/admincontroller');
const usercontroller = require('../controller/usercontroller');
 

routes.get('/adminpanel', admincontroller.adminpanel);
routes.post('/categorychange', admincontroller.categorychange);
routes.get('/login', admincontroller.login);
routes.post('/logindata', passport.authenticate('local', { failureRedirect: '/' }), admincontroller.logindata);
routes.get('/register', admincontroller.register);
routes.post('/registerdata', admincontroller.registerdata);
routes.get('/category', admincontroller.category);
routes.post('/categoryAdd', admincontroller.categoryAdd);
routes.get('/deletecategory', admincontroller.deletecategory);
routes.get('/editcategory', admincontroller.editcategory);
routes.post('/categoryUpdate', admincontroller.categoryUpdate);
routes.get('/product', admincontroller.product);
routes.post('/productAdd', imagedata, admincontroller.productAdd);
routes.get('/deleteproduct', admincontroller.deleteproduct);
routes.get('/editproduct', admincontroller.editproduct);
routes.post('/productUpdate', imagedata, admincontroller.productUpdate);
routes.get('/adminshop', admincontroller.shop);
routes.get('/checkout', admincontroller.checkout);

routes.get('/', usercontroller.dashboard);
routes.get('/dashboard', usercontroller.dashboard);
routes.post('/registerdata', usercontroller.registerdata);
routes.post('/usercategorychange', usercontroller.usercategorychange);
routes.get('/shop', usercontroller.shop);
routes.get('/detail', usercontroller.detail);
routes.get('/cart', usercontroller.cart);
routes.get('/addtocart', usercontroller.addtocart);
routes.get('/deletecart', usercontroller.deletecart);
routes.post('/updatecart', usercontroller.updatecart);

module.exports = routes;
