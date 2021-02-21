const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const PasswordSchema=new Schema({
    username:String,
    password:String,
})

module.exports = mongoose.model("Password",PasswordSchema);