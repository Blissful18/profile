var express = require("express");
var router  = express.Router();
var passport = require("passport");
require('../configs/viewEngine');

router.get('/profile', (req, res) => {
    res.render('profile.ejs');
});

router.get("/journals", (req,res) => {
    res.render("journals.ejs");
});

router.get('/editprofile', (req,res) => {
    res.render('editprofile.ejs');
});

router.get('/journaladd', (req,res) => {
    res.render('journaladd.ejs');
});

router.get('/journalentry', (req,res) => {
    res.render('journalentry.ejs');
});

router.get('/journalupdate', (req,res) => {
    res.render('journalupdate.ejs');
});


module.exports = router;