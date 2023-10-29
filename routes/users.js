const mongoose= require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/instaGram",{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  // # Print a message to the console
  console.log("Connected to MongoDB...");
}).catch(error => {
  // Handle the error, or provide a message to the user
  console.error(`Error picking color: ${error.message}`);
});

const userSchema=mongoose.Schema({
  username:{type:String,required: true},
  fullname:{type:String,required: true},
  email:{type:String,required: true},
  password:{type:String,required: true},

});



module.exports =mongoose.model("user",userSchema)