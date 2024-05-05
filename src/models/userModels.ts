import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true} ,
    password: {type: String, required: true , select : false},
    googleId : {type: String },
});

const User = mongoose.model?.User || mongoose.model("User" , userSchema);

export default User;