  
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
      
    });

    return User;
}





// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

// var UserSchema = new mongoose.Schema({
//     name: String,
//     displayname: String,
//     email: String,
//     password: String
// });

// UserSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", UserSchema);