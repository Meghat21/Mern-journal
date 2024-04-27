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


export const deleteUser=async(req,res,next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'you are not allowed to delete this account'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('user deleted')
    } catch (error) {
        next(error)
    }
}

export const signoutUser=async(req,res,next)=>{
    try {
        res.clearCookie('access_token').status(200).json('User has been signout')
    } catch (error) {
        next(error)
    }

}

export const getUsers=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(404,'You are not admin'))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    
        const users = await User.find()
          .sort({ createdAt: sortDirection })
          .skip(startIndex)
          .limit(limit);
    
        const usersWithoutPassword = users.map((user) => {
          const { password, ...rest } = user._doc;
          return rest;
        });
    
        const totalUsers = await User.countDocuments();
    
        const now = new Date();
    
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
    
        res.status(200).json({
          users: usersWithoutPassword,
          totalUsers,
          lastMonthUsers,
        });
      } catch (error) {
        next(error);
      }
}

