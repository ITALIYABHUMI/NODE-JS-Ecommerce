const admintbl = require('../model/form')
const productTbl = require('../model/product')
const categorytbl = require('../model/category')
const fs = require('fs');
const path = require('path');

const adminpanel = async (req, res) => {
    try {
        if (res.locals.user) {
            let user = res.locals.user;
            if (user.role == "admin") {
                let category = await categorytbl.find({});
                let product = await productTbl.find({});
                return res.render('admin/adminpanel', {
                    category, product,user: res.locals.user
                });
            }
            else {
                return res.redirect('/')
            }
        }
        else {
            return res.redirect('/')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const categorychange = async (req, res) => {
    try {
        let id = req.body.category;
        let category = await categorytbl.findById(id);
        let Allcategory = await categorytbl.find({});
        let product = await productTbl.find({ categoryId: id });
        let Allproduct = await productTbl.find({});
        if (req.body.Allcategory == "Allcategory" || !product) {
            return res.render('admin/shop', {
                product: Allproduct,
                category: Allcategory,
                user: res.locals.user
            })
        }
        else if (product) {
            return res.render('admin/shop', {
                product, category: Allcategory, user: res.locals.user
            })
        }
        else if (req.body.Allcategory == "Allcategory" || !product) {
            return res.render('admin/shop', {
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
 
const register = (req, res) => {
    return res.render('register',{user: res.locals.user});
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
                return res.redirect('/login');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const login = (req, res) => {
    return res.render('login',{user: res.locals.user})
}

const logindata = async (req, res) => {
    try {
        let data = await admintbl.findOne({ email: req.body.email });
        if (data.role = "admin") {
            return res.redirect('/adminpanel');

        } else {
            return res.redirect('/dashboard');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const category = (req, res) => {
    return res.render('admin/category',{user: res.locals.user});
}

const categoryAdd = async (req, res) => {
    try {
        let userdata = await categorytbl.create({
            category: req.body.category
        })
        if (userdata) {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deletecategory = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await categorytbl.findByIdAndDelete(id);
        if (category) {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const editcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await categorytbl.findById(id);
        if (category) {
            return res.render('admin/categoryUpdate', {
                category,user: res.locals.user
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const categoryUpdate = async (req, res) => {
    try {
        let id = req.body.id;
        let category = await categorytbl.findByIdAndUpdate(id, {
            category: req.body.category
        });
        if (category) {
            return res.redirect('/dashboard');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const product = async (req, res) => {
    try {
        let category = await categorytbl.find({});
        return res.render('admin/product', {
            category,user: res.locals.user
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const productAdd = async (req, res) => {
    try {
        let image = "";
        const { categoryId, name, price } = req.body;
        let userdata = await productTbl.create({
            categoryId: categoryId,
            name: name,
            price: price,
            image: req.file.path
        })
        if (userdata) {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const deleteproduct = async (req, res) => {
    try {
        let id = req.query.id;
        let product = await productTbl.findByIdAndDelete(id);
        fs.unlinkSync(product.image);
        if (product) {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const editproduct = async (req, res) => {
    try {
        let id = req.query.id;
        let product = await productTbl.findById(id);
        let category = await categorytbl.find({});
        if (product) {
            return res.render('admin/productUpdate', {
                category, product,user: res.locals.user
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const productUpdate = async (req, res) => {
    try {
        const { id, categoryId, name, price } = req.body;
        if (req.file) {
            let data = await productTbl.findById(id);
            if (data) {
                fs.unlinkSync(data.image);
                let product = await productTbl.findByIdAndUpdate(id, {
                    cateogryId: categoryId,
                    name: name,
                    price: price,
                    image: req.file.path
                });
                if (product) {
                    return res.redirect('/shop');
                }
            }
        }
        else {
            let data = await productTbl.findById(id);
            if (data) {
                let product = await productTbl.findByIdAndUpdate(id, {
                    cateogryId: categoryId,
                    name: name,
                    price: price,
                    image: data.path
                });
                if (product) {
                    return res.redirect('/shop');
                }
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
        return res.render('admin/shop', {
            category, product,user: res.locals.user
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const checkout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/dashboard');
    })
}



module.exports = {
    adminpanel,
    categorychange,
    register,
    registerdata,
    login,
    logindata,
    category,
    categoryAdd,
    deletecategory,
    editcategory,
    categoryUpdate,
    product,
    productAdd,
    deleteproduct,
    editproduct,
    productUpdate,
    shop,
    checkout
}  