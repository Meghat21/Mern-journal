import User from '../models/user.model.js'
import bcyptjs from 'bcryptjs'
import {errorHandler} from '../utils/errorHandler.js'
import {ApiError} from '../utils/ApiError.js'

export const signUp=async(req,res,next)=>{
    
    const {username,email,password}=req.body;

    //check if all fields are  filled 
    if(username === '' || email === '' || password === '' || !username || !email || !password){
        return res.status(401).json({error:"All fields must be filled"});
    }

    //check if user a;ready exist
    let user = await User.findOne({email:email})
    if (user) {
        next(errorHandler(400,'email already registered with us'))
    }

    //hash the password before saving it to database
    const hasPassword=bcyptjs.hashSync(password,10)

    const createUser=await User.create({username,email,password:hasPassword});
    
    
    try {
        res.status(200).json(createUser);
    } catch (error) {
        next(error)
    }
}