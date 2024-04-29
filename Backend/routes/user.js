import express from "express";
import {verifyToken} from '../utils/verifyUser.js'

const router=express.Router();
import {updateUser,deleteUser,signoutUser,getUsers,getUser} from '../controllers/user.controller.js'

router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout/:userId',signoutUser);
router.get('/getUsers',verifyToken,getUsers);
router.get('/:userId',getUser)




export default router