import { errorHandler } from "../utils/errorHandler.js"
import Post from '../models/post.model.js'

export const createPost=async(req,res,next)=>{
    //   console.log('create post', req.body);
    if(!req.user.isAdmin){
        return next(errorHandler(401,'Youa re not allowed'))
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'please provide all fields'))
    }

    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g,'-');
    const newPost=new Post({
        ...req.body,slug,userId:req.user.id
    })

    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        next(error)
    }
}


export const getAllPost=async(req,res,next)=>{
    try {
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit=parseInt(req.query.limit) || 9;
        const sortDirection=req.query.order === 'asc' ? 1 : -1;

        const posts=await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {postId:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm,$options:'i'}},
                    {content:{$regex:req.query.searchTerm,$options:'i'}},
                ],
            }),
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

        const totalPost=await Post.countDocuments();
        const now=new Date();

        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )

        const lastMonthPosts=await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo},
        });

        res.status(200).json({
            posts,
            totalPost,
            lastMonthPosts
        })
    } catch (error) {
        next(error);
    }
}