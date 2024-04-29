import Comment from '../models/comment.model.js'
import { errorHandler } from '../utils/errorHandler.js';
export const createComment=async(req,res,next)=>{
    try {
        const {content,postId,userId}=req.body;

        if(userId != req.user.id){
            return next(errorHandler(404,'unauthorized'))
        }

        const newCOmment=await Comment.create({
            content,
            postId,
            userId
        });

        res.status(200).json(newCOmment)
    } catch (error) {
        next(error)
    }
}

export const getPostComment=async(req,res,async)=>{
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
          });
          res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}

export const likeComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'No comment found'))
        }

        const userIndex=comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes +=1
            comment.likes.push(req.user.id);
        }else{
            comment.numberOfLikes -=1
            comment.likes.splice(userIndex,1)

        }
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

export const editComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'No comment found'))
        }
        if(comment.userId !== req.user.id && req.user.isAdmin){
            return next(errorHandler(403,'you are not allowed to edit this comment'))
        }

        const editedComment=await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content:req.body.content
            },
            {new:true}
        );

        res.status(200).json(editedComment)
       
    } catch (error) {
        next(error)
    }
}

export const deleteComment=async(req,res,next)=>{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'No comment found'))
        }
        if(comment.userId !== req.user.id && req.user.isAdmin){
            return next(errorHandler(403,'you are not allowed to edit this comment'))
        }
        
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('comment deleted')
    } catch (error) {
        next(error)
    }
}