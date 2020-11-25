// var mysql = require('mysql');
// const express = require('express');
// const app = express();
const here = require('dotenv').config();
//import mysql from "mysql2";
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'quests'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('MySql connected...');
});

module.exports = connection;