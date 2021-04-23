// var express = require('express');
// var router = express.Router();
// const dbConn  = require('./configs/db');
// //const dbconn = require('./../configs/db');
 

// router.get("/journals", function(req, res){

//     dbConn.query('SELECT * FROM journal_post WHERE user_id = 1',function(err,rows)     {

//         if(err) {
//             req.flash('error', err);
//             // render to views/books/index.ejs
//             res.render('profile',{data:''});
//         } else {
//             // render to views/books/index.ejs
//             res.render('journals.ejs',{data: rows.title });
//         }
//     });
// });


// // res.render('journals.ejs',{journal_post_id: rows.journal_post_id,
// //     title: rows.title,
// //     description: rows.description,
// //     image: rows.image,
// //     created_at: rows.created_at,
// //     updated_at: rows.updated_at,});



// // display books page
// router.get('/journalentry', function(req, res) {
      
//     dbConn.query('SELECT * FROM journal_post WHERE user_id = 1',function(err,row)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to views/books/index.ejs
//             res.render('profile',{data:''});   
//         } else {
//             // render to views/books/index.ejs
//             res.render('journalentry',{data: row});
//         }
//     });
// });

// router.get('/', function(req, res, next) {
      
//     dbConn.query('SELECT * FROM quest_user WHERE user_id = 1',function(err,rows)     {
 
//         if(err) {
//             req.flash('error', err);
//             // render to views/books/index.ejs
//             res.render('profile',{data:''});   
//         } else {
//             // render to views/books/index.ejs
//             res.render('profile',{data:rows});
//         }
//     });
// });