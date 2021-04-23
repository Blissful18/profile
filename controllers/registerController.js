//import registerService from "./../services/registerService";
const registerService = require('./../services/registerService');
//import { validationResult } from "express-validator";
const {validationResult} = require('express-validator');


let getPageRegister = (req, res) => {
    let newUser = {
        full_name: "",
        display_name: "",
        email_address: "",
        birthday: "",
    }
    return res.render("register.ejs", {
        errors: req.flash("errors"),
        newUser: newUser
    });
};

let createNewUser = async (req, res) => {
    
    let newUser = {
        full_name: req.body.fullName,
        display_name: req.body.display_name,
        email_address: req.body.email_address,
        birthday: req.body.birthday,
        password: req.body.password,
    };

    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
        
        
    }

    try {
        
        await registerService.createNewUser(newUser);
        req.flash('errors', `Please verify your account through your email.`);
        return res.render("login.ejs", { 
            errors: req.flash('errors')
        });
       // return res.redirect("/login");
    } catch (err) {
        req.flash('errors',err);
        return res.render("register.ejs", { 
            errors: req.flash('errors'),
            newUser: newUser });
    }
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};
