const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
},{
    timestamps:true,
    versionKey:false
})

const userModel = mongoose.model("user",schema);
module.exports = userModel;