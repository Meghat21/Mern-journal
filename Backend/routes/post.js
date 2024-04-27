import express from "express";
import {verifyToken} from '../utils/verifyUser.js'

const router=express.Router();
import {createPost,getAllPost,deletePost,updatePost} from '../controllers/post.controller.js'

router.post('/create',verifyToken,createPost);
router.get('/getposts',getAllPost)
router.delete('/deletepost/:postId/:userId',verifyToken,deletePost)
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)




export default router