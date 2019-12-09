const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true }
});

const myDB = mongoose.connection.useDb("posts");

module.exports = myDB.model("post", postShema);
