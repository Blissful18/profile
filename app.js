require('dotenv').config();
const express = require('express');
//import configViewEngine from "./configs/viewEngine";
const configViewEngine = require('./configs/viewEngine');
const db = require('./configs/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const mysql = require('mysql');
const path = require('path');
const createError = require('http-errors');

const cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    session = require("express-session"),
	methodOverride = require("method-override"),
    ejsLint = require('ejs-lint');
    
var indexRoutes = require("./routes/index");
// var usersRouter = require("./routes/users");
// var journalRouter = require("./routes/journal");
 
const app = express();

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+ '/static'));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//app.engine('html',require('ejs').renderFile); //__express
//app.use(express.static(path.join(__dirname+ 'public')));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "It is a secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
// app.use('/users', usersRouter);
// app.use('/journals', journalsRouter);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on Journal Post started on port ${port}`));