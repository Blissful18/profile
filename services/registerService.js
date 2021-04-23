//import DBConnection from "./../configs/DBConnection";
const DBConnection = require('./../configs/DBConnection');
const mailer = require('./../configs/mailConfig');
//import bcrypt from "bcryptjs";
const bcrypt = require('bcryptjs');
const {v4 : uuidv4} = require('uuid');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email_address);
        let isDisplayNameExist = await checkDisplayEmail(data.display_name);
        if (isEmailExist) {
            reject(`This email "${data.email_address}" already exists. Please choose another email`);
        } else if (isDisplayNameExist){
            reject(`This display name "${data.display_name}" already exists. Please choose another display name`);
        }
        else {
            // hash password
            const tok = uuidv4();
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                full_name: data.full_name,
                display_name: data.display_name,
                birthday: data.birthday,
                email_address: data.email_address,
                password: bcrypt.hashSync(data.password, salt),
                status: 'inactive',
                token: tok,
            };
            
            //create a new account
            DBConnection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                    handleSubmitForm(data.email_address);
                }
            );
        }
    });
};

let handleSubmitForm = (email) => {
    return new Promise(async () => {
      //  let email = data.email_address;
        let findtoken = await findUserToken(email);// you need find the user's token by their email
        if (findtoken){
            let htmlContent = 
            `<div> 
                This is an automated reply from Journals.me. Please do not reply.
                You are receiving this email because your email was just registered to an account on Journals.me.
                Verify your account through this link. http://localhost:8080/verify/${findtoken.token}
                
              
            <div>`;
            //<a href="http://localhost:8080/verify/${findtoken.token}>Click this link to verify your account. </a>
            await sendEmailNormal(email, "You just created an account!",htmlContent);
        }
        
    });
}

let sendEmailNormal = (to, subject, htmlContent) => {
    let options = {
        from: process.env.MAIL_USERNAME,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return mailer.sendMail(options);
};

let findUserToken = (email_address) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT `token` FROM `users` WHERE `email_address` = ?  ', email_address,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserEmail = (token) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT `email_address` FROM `users` WHERE `token` = ?  ', token,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let checkDisplayEmail = (display_name) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `display_name` = ?  ', display_name,
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
            );
        } catch (err) {
            reject(err);
        }
    });
};

let checkExistEmail = (email_address) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email_address` = ?  ', email_address,
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
            );
        } catch (err) {
            reject(err);
        }
    });
};


module.exports = {
    createNewUser: createNewUser,
    handleSubmitForm: handleSubmitForm,
    findUserToken: findUserToken,
    findUserEmail: findUserEmail,
    sendEmailNormal: sendEmailNormal
};
