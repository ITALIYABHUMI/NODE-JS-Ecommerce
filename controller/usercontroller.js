const admintbl = require('../model/form')
const productTbl = require('../model/product')
const categorytbl = require('../model/category')
const cartTbl = require('../model/cart')

const dashboard = async (req, res) => {
    try {
        let category = await categorytbl.find({});
        let product = await productTbl.find({});
        return res.render('user/dashboard', {
            category, product, user: res.locals.user
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const usercategorychange = async (req, res) => {
    try {
        let id = req.body.category;
        let category = await categorytbl.findById(id);
        let Allcategory = await categorytbl.find({});
        let product = await productTbl.find({ categoryId: id });
        let Allproduct = await productTbl.find({});
        if (req.body.Allcategory == "Allcategory" || !product) {
            return res.render('user/shop', {
                product: Allproduct,
                category: Allcategory,
                user: res.locals.user
            })
        }
        else if (product) {
            return res.render('user/shop', {
                product, category: Allcategory, user: res.locals.user
            })
        }
        else if (req.body.Allcategory == "Allcategory" || !product) {
            return res.render('user/shop', {
                product: Allproduct,
                category: Allcategory,
                user: res.locals.user
            })
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const registerdata = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password == cpassword) {
            let userdata = await admintbl.create({
                name: name,
                email: email,
                password: password
            })
            if (userdata) {
                return res.render('user/login');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const shop = async (req, res) => {
    try {
        let category = await categorytbl.find({});
        let product = await productTbl.find({});
        return res.render('user/shop', {
            category, product, user: res.locals.user
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const detail = async (req, res) => {
    try {
        let id = req.query.id;
        let product = await productTbl.findById(id);
        return res.render('user/shopdetail', {
            product, user: res.locals.user
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const cart = async (req, res) => {
    try {
        let cart = await cartTbl.find({});
        let cartproduct = await cartTbl.find({});
        res.cookie('cart', cartproduct);
        let price = 0;
        cartproduct.map((val) => {
            price = val.price + price;
        })
        return res.render('user/cart', {
            cart, user: res.locals.user, price
        });

    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const addtocart = async (req, res) => {
    try {
        if (res.locals.user) {
            let id = req.query.id;
            let product = await productTbl.findById(id);
            let cartdata = await cartTbl.findOne({ productId: product.id });
            if (!cartdata) {
                let cart = await cartTbl.create({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                })
                if (cart) {
                    return res.redirect('/shop')
                }
            }
            else {
                console.log("product already add to cart");
                return res.redirect('/shop')
            }
        }
        else {
            req.flash('success', "you have to login first")
            return res.redirect('/shop')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deletecart = async (req, res) => {
    try {
        let id = req.query.id;
        let cart = await cartTbl.findByIdAndDelete(id);
        if (cart) {
            return res.redirect('/shop')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const updatecart = async (req, res) => {
    try {
        let id = req.body.id;
        let qty = req.body.qty; 
        console.log(id, qty);
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
        return false; 
    }
}

module.exports = {
    dashboard,
    usercategorychange,
    registerdata,
    shop,
    detail,
    cart,
    addtocart,
    deletecart,
    updatecart
}   
