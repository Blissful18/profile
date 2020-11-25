//import express from "express";
const express = require('express');
/**
 * Config view engine for app
 */
let configViewEngine = (app)=> {
    app.use(express.static("./public"));
    app.engine('html', require('ejs').renderFile);
    app.set("view engine", "ejs");
    app.set("views","./views");
};

module.exports = configViewEngine;
