import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    username:{
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
    ProfilePicture:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema);

export default User