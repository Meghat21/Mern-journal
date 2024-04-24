import express from "express";
import {verifyToken} from '../utils/verifyUser.js'

const router=express.Router();
import {updateUser} from '../controllers/user.controller.js'

router.put('/update/:userId',verifyToken,updateUser);


export default router