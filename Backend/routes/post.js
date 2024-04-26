import express from "express";
import {verifyToken} from '../utils/verifyUser.js'

const router=express.Router();
import {createPost,getAllPost} from '../controllers/post.controller.js'

router.post('/create',verifyToken,createPost);
router.get('/getposts',getAllPost)



export default router