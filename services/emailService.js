//import DBConnection from "../configs/DBConnection";
const DBConnection = require('./../configs/DBConnection');
require('dotenv').config();
//import bcrypt from "bcryptjs";
const nodeMailer = require ('nodemailer');
const bcrypt = require('bcryptjs');

let transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // use SSL-TLS
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

let sendEmailNormal = (to, subject, htmlContent) => {
    let options = {
        from: process.env.MAIL_USERNAME,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return transporter.sendMail(options);
};

// let findUserToken = (email_address) => {
//     return new Promise((resolve, reject) => {
//         try {
//             DBConnection.query(
//                 ' SELECT `token` FROM `users` WHERE `email_address` = ?  ', email_address,
//                 function(err, rows) {
//                     if (err) {
//                         reject(err)
//                     }
//                     let user = rows[0];
//                     resolve(user);
//                 }
//             );
//         } catch (err) {
//             reject(err);
//         }
//     });
// };
let verifyAccount = (token, email_address) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `token` = ?  ', token,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            )
            DBConnection.query(
                ' UPDATE users SET status="active" WHERE `email_address` = ?  ', email_address,
                function(err, rows) {
                    if (!err) {
                        console.log("Your account is now active!");
                    }else{
                        resolve(false)
                    }
                }
            )
            ;
        } catch (err) {
            reject(err);
        }
    });
};

let updateStatus = (email_address) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' UPDATE users SET status="active" WHERE `email_address` = ?  ', email_address,
                function(err, rows) {
                    if (!err) {
                        console.log("Your account is now active!");
                    }else{
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    sendEmailNormal: sendEmailNormal,
  //  findUserToken: findUserToken,
    verifyAccount: verifyAccount,
    updateStatus: updateStatus
};