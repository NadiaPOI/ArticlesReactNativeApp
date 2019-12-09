const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");

const config = require("../config/config");

const userShema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true }
});

userShema.methods = {
  authenticate: (password, userPassword, callback) => {
    return bcrypt.compare(password, userPassword, (err, samePassword) => {
      if (err) {
        return callback(err, samePassword);
      } else {
        return callback(null, samePassword);
      }
    });
  },
  getToken: user => {
    const payload = {
      username: user.username,
      email: user.email
    };

    return jwt.encode(payload, config.secret);
  }
};

const myDB = mongoose.connection.useDb("usersArticlesApp");

module.exports = myDB.model("user", userShema);
