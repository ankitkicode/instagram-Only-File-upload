const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    // Other fields as needed
    imagePath: {
        type: String,
        required: true
    },
    caption:String,
  });
  
  module.exports = mongoose.model('Post', postSchema);