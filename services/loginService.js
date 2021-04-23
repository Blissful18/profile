//import DBConnection from "../configs/DBConnection";
const DBConnection = require('./../configs/DBConnection');
//import bcrypt from "bcryptjs";
const bcrypt = require('bcryptjs');

let handleLogin = (email_address, password) => {
    return new Promise(async (resolve, reject) => {
        //check email exists or not
        let user = await findUserByEmail(email_address);
        if (user) {
            //
            //compare password
            await bcrypt.compare(password, user.password).then(async (isMatch) => {
                if (isMatch) {   
                        resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${email_address}" doesn't exist`);
        }
    });
};

let checkStatus = (email_address) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT status FROM `users` WHERE `email_address` = ?  ', email_address,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    //let user = rows[0];
                    resolve(rows[0].status);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserByEmail = (email_address) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `email_address` = ?  ', email_address,
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

let findUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` u WHERE `user_id` = ?  ', user_id,
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

let findUserByDisplayName = (displayName) => {
    return new Promise((resolve, reject) => {
        DBConnection.query(
            ' SELECT * FROM `users` WHERE `display_name` = ?  ', displayName,
            function(err, rows) {
                if (err) {
                    reject(err)
                }else{
                    resolve(rows);

                }
            }
        );
    });
};

let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleLogin: handleLogin,
    checkStatus: checkStatus,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword,
    findUserByDisplayName
};