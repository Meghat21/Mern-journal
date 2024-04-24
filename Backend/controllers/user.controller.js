import User from '../models/user.model.js'
import bcyptjs from 'bcryptjs'
import {errorHandler} from '../utils/errorHandler.js'
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'

export const updateUser=async(req,res,next)=>{
    //todo
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'you are not allowed'))
    }

    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,'Password must be more than 6 letter'))
        }
        req.body.password=bcyptjs.hashSync(req.body.password,10);
    }

    if(req.body.username){
        if(req.body.username.length <7 || req.body.username.length>20){
            return next(errorHandler(400,'username must be  between 7 and 20 characters'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'username dont contain space'))
        }
        
    }
    
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                ProfilePicture:req.body.ProfilePicture

            ,}
        },{new:true});
        const{password,...rest}=updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}