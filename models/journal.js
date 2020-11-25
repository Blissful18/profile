var mongoose = require("mongoose");

var journalSchema = new mongoose.Schema({
   title: String,
   description: String,
   created_at: Date,
   updated_at: Date
});

module.exports = mongoose.model("Journal", journalSchema);