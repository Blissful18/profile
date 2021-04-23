// var express = require('express');
// var router = express.Router();
// // const dbconn = require('./../configs/db');
// const dbConn  = require('../configs/db');

// router.get('/journals', function(req, res, next) {
      
//     dbConn.query('SELECT * FROM journal_post WHERE user_id = 1',function(err,rows)     {
 
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

// router.get('/journalentry', function(req, res, _next) {
      
//     dbConn.query('SELECT * FROM journal_post WHERE user_id = 1 AND journal_post_id = 1',function(err,row)     {
 
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