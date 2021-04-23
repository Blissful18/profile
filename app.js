require('dotenv').config();

//import express from "express";
const express = require('express');

//import configViewEngine from "./configs/viewEngine";
const configViewEngine = require('./configs/viewEngine');
//import initWebRoutes from "./routes/web";
const initWebRoutes = require('./routes/index');
//import bodyParser from "body-parser";
const bodyParser = require('body-parser');

//import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

//import session from "express-session";
const session = require('express-session');

//import connectFlash from "connect-flash";
const connectFlash = require('connect-flash');

//import passport from "passport";
const passport = require('passport');
const fileUpload = require('express-fileupload');

const app = express();

// app.use(express.static(__dirname + '/public')); aysa ha
app.use(express.static('public'))
app.use(express.static(__dirname));

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());
app.use('/static', express.static('public'))

// init all web routes
initWebRoutes(app);


let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Login and Signup for Journals.me! Running on port ${port}!`));


// require('dotenv').config();
// const express = require('express');
// //import configViewEngine from "./configs/viewEngine";
// const configViewEngine = require('./configs/viewEngine');
// const db = require('./configs/db');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const mysql = require('mysql');
// const path = require('path');
// const createError = require('http-errors');

// const cookieParser = require("cookie-parser"),
//     LocalStrategy = require("passport-local"),
//     flash        = require("connect-flash"),
//     session = require("express-session"),
// 	methodOverride = require("method-override"),
//     ejsLint = require('ejs-lint');
    
// var indexRoutes = require("./routes/index");
// // var usersRouter = require("./routes/users");
// // var journalRouter = require("./routes/journal");
 
// const app = express();


// // Enable body parser post data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname+ '/static'));
// app.use(methodOverride('_method'));
// app.use(cookieParser('secret'));

// //app.engine('html',require('ejs').renderFile); //__express
// //app.use(express.static(path.join(__dirname+ 'public')));


// // PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "It is a secret.",
//     resave: false,
//     saveUninitialized: false
// }));

// //Config view engine
// configViewEngine(app);

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", indexRoutes);
// // app.use('/users', usersRouter);
// // app.use('/journals', journalsRouter);

// let port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server on Journal Post started on port ${port}`));