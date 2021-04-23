// var mysql = require('mysql');
// const express = require('express');
// const app = express();
const here = require('dotenv').config();
//import mysql from "mysql2";
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    // if(err) throw err;
    console.log('MySql connected...');
});

module.exports = connection;