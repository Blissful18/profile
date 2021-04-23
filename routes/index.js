//import express from "express";
const express = require('express');
//import homePageController from "../controllers/homePageController";
const homePageController = require('../controllers/homePageController');
//import registerController from "../controllers/registerController";
const registerController = require('../controllers/registerController');
//import loginController from "../controllers/loginController";
const loginController = require('../controllers/loginController');
const submitform = require('../controllers/submitform');
//import auth from "../validation/authValidation";
const auth = require('../validation/authValidation');
//import passport from "passport";
const passport = require('passport');
//import initPassportLocal from "../controllers/passportLocalController";
const initPassportLocal = require('../controllers/passportLocalController');

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.get("/verify/:token",submitform.verifyAccount);
    
    router.post("/logout", loginController.postLogOut);
    router.get("/feed",homePageController.getFeed);
    require('./separate/journals.routes.js')(app);
    require('./separate/profile.routes.js')(app);
    return app.use("/", router);
};
module.exports = initWebRoutes;




// var express = require("express");
// var router  = express.Router();
// var passport = require("passport");
// require('../configs/viewEngine');
// const dbConn  = require('../configs/db');

// router.get('/profile', (req, res) => {
//     dbConn.query('SELECT * FROM users WHERE user_id = 1',function(err,rows)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to profile.ejs
//             res.render('profile',{data:''});   
//         } else {
//             // render to profile.ejs
//             res.render('profile',{data: rows[0]});
//         }
//     });
// });

// //display editprofile.ejs
// router.get('/editprofile/(:user_id)', (req,res) => {
//     let id = req.params.user_id;
   
//     dbConn.query('SELECT * FROM users WHERE user_id = ' + id, function(err, rows) {
//         if(err) throw err
         
//         // if user not found
//         if (rows.length <= 0) {
//             req.flash('error', 'Profile not found with id = ' + id)
//             res.redirect('/profile')
//         }
//         // if user profile found
//         else {
//             // render to editprofile.ejs
//             res.render('editprofile', {
//                 full_name: rows[0].full_name, 
//                 id: rows[0].user_id,
//                 display_name: rows[0].display_name,
//                 email_address: rows[0].email_address,
//                 birthday: rows[0].birthday
//             })
//         }
//     })
// });

// //update profile
// router.post('/editprofile/:id', function(req, res) {

//     let id = req.params.id;
//     let full_name = req.body.full_name;
//     let display_name = req.body.display_name;
//     let birthday = req.body.birthday;
//     let email_address = req.body.email_address;
//     let errors = false;

//     if(full_name.length === 0 || display_name.length === 0) {
//         errors = true;
        
//         // set flash message
//         req.flash('error', "Please enter full name and display name");
//         // render to editprofile.ejs with flash message
//         res.render('editprofile', {
//             id: req.params.id,
//             full_name: full_name,
//             display_name: display_name,
//             birthday: birthday,
//             email_address: email_address
//         })
//     }

//     // if no error
//     if( !errors ) {   
 
//         var form_data = {
//             user_id: req.params.id,
//             full_name: full_name,
//             birthday: birthday,
//             display_name: display_name,
//             email_address: email_address
//         }

//         // update query
//         dbConn.query('UPDATE users SET ? WHERE user_id = ' + id, form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 // set flash message
//                 req.flash('error', err)
//                 // render to editprofile.ejs
//                 res.render('editprofile', {
//                     id: req.params.id,
//                     full_name: form_data.full_name,
//                     display_name: form_data.display_name,
//                     email_address: form_data.email_address,
//                     birthday: form_data.birthday
//                 })
//             } else if (result) {
//                 req.flash('success', 'Profile successfully updated');
//                 res.redirect('/profile');
//             }
//         })
//     }
// })

// //change password
// router.get('/changepassword/(:user_id)', (req,res) => {
//     res.render('changepassword');
// })
// // router.get('/changepassword/(:user_id)', (req,res) => {
// //     let id = req.params.user_id;
   
// //     dbConn.query('SELECT * FROM users WHERE user_id = ' + id, function(err, rows) {
// //         if(err) throw err
         
// //         // if user not found
// //         if (rows.length <= 0) {
// //             req.flash('error', 'Profile not found with id = ' + id)
// //             res.redirect('/profile')
// //         }
// //         // if user profile found
// //         else {
// //             // render to editprofile.ejs
// //             res.render('editprofile.ejs', {
// //                 full_name: rows[0].full_name, 
// //                 id: rows[0].user_id,
// //                 display_name: rows[0].display_name,
// //                 email_address: rows[0].email_address,
// //                 birthday: rows[0].birthday
// //             })
// //         }
// //     })
// // });

// //display journals
// router.get("/journals", (req,res) => {
//     dbConn.query('SELECT * FROM journal_posts WHERE user_id = 1',function(err,rows)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to views/books/index.ejs
//             res.render('profile',{data:''});   
//         } else {
//             // render to views/books/index.ejs
//             res.render('journals',{data: rows});
//         }
//     });
// });

// router.get('/journalentry', (req,res) => {
//     res.render('journalentry');
// });

// router.get('/journaladd', (req,res) => {
//     res.render('journaladd',{title:'', description:''});
// });

// router.post('/journaladd', function(req, res) {    

//     let title = req.body.title;
//     let description = req.body.description;
//     let errors = false;

//     if(title.length === 0 || description.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Please enter title and description");
//         // render to add.ejs with flash message
//         res.render('journaladd', {
//             title: title,
//             description: description
//         })
//     }

//     // if no error
//     if(!errors) {

//         var form_data = {
//             user_id: 1,
//             title: title,
//             description: description,
//         }
        
//         // insert query
//         dbConn.query('INSERT INTO journal_posts SET ?', form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
                 
//                 // render to add.ejs
//                 res.render('journaladd', {
//                     user_id: form_data.user_id,
//                     title: form_data.title,
//                     description: form_data.description                    
//                 })
//             } else if(result) {                
//                 req.flash('success', 'Journal successfully added');
//                 res.redirect('/journals');
//             }
//         })
//     }
// })

// // display journal entry
// router.get('/journalentry/(:journal_post_id)', (req,res) => {

//     let id = req.params.journal_post_id;
    
//     dbConn.query('SELECT * FROM journal_posts WHERE journal_post_id = ' + id, function(err, rows) {
//         if(err) {
//             req.flash('error', err);
//             // render to views/journals.ejs
//             res.render('journals',{data:''});   
//         } else {
//             // render to views/journalentry.ejs
//             res.render('journalentry',{id: rows[0].journal_post_id, title: rows[0].title, description: rows[0].description, create: rows[0].created_at, update: rows[0].updated_at});
//         }
//     });
// });

// //display update page
// router.get('/journalupdate/(:id)', function(req, res) {

//     let id = req.params.id;
   
//     dbConn.query('SELECT * FROM journal_posts WHERE journal_post_id = ' + id, function(err, rows) {
//         if(err) throw err
         
//         // if user not found
//         if (rows.length <= 0) {
//             req.flash('error', 'Journal not found with id = ' + id)
//             res.redirect('/journals')
//         }
//         // if journal found
//         else {
//             // render to journalupdate.ejs
//             res.render('journalupdate', {
//                 title: rows[0].title, 
//                 id: rows[0].journal_post_id,
//                 description: rows[0].description,
//                 created_at: rows[0].created_at
//             })
//         }
//     })
// })


// //update journal data
// router.post('/journalupdate/:id', function(req, res) {

//     let id = req.params.id;
//     let title = req.body.title;
//     let description = req.body.description;
//     let updated_at = Date.now();
//     let errors = false;

//     if(title.length === 0 || description.length === 0) {
//         errors = true;
        
//         // set flash message
//         req.flash('error', "Please enter title and description");
//         // render to journalupdate.ejs with flash message
//         res.render('journalupdate', {
//             id: req.params.id,
//             title: title,
//             description: description
//         })
//     }

//     // if no error
//     if( !errors ) {   
 
//         var form_data = {
//             title: title,
//             description: description,
//             updated_at: updated_at
//         }
//         // update query
//         dbConn.query('UPDATE journal_posts SET ? WHERE journal_post_id = ' + id, form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 // set flash message
//                 req.flash('error', err)
//                 // render to journalupdate.ejs
//                 res.render('journalupdate', {
//                     id: req.params.id,
//                     title: form_data.title,
//                     description: form_data.description
//                 })
//             } else {
//                 req.flash('success', 'Journal successfully updated');
//                 res.redirect('/journals');
//             }
//         })
//     }
// })

// //delete journal
// router.get('/delete/(:journal_post_id)', function(req, res) {

//     let id = req.params.journal_post_id;
     
//     dbConn.query('DELETE FROM journal_posts WHERE journal_post_id = ' + id, function(err, result) {
//         //if(err) throw err
//         if (err) {
//             // set flash message
//             req.flash('error', err);
//             // redirect to books page
//             res.redirect('/journals');
//         } else {
//             // set flash message
//             req.flash('success', 'Journal successfully deleted! Journal Post ID = ' + id);
//             // redirect to books page
//             res.redirect('/journals');
//         }
//     })
// })



// module.exports = router;