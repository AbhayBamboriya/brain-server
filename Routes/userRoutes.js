import { Router } from "express";
import upload from '../middleware/multer.middleware.js'
import { allUser, checkUser, detail, forgotPassword, login, logout, register, resetPassword } from "../Controller/userController.js";
import { allMessage, send } from "../Controller/messageController.js";
const router =Router(); //creating instance
// accept update user all are working correctly
router.post('/register',upload.single("profile"),register)   //in upload single file orhow many file u have to upload
router.post('/login',login) 
router.get('/logout',logout)
router.post('/reset',forgotPassword);
router.post('/check',checkUser)
router.post('/password/:resetToken',resetPassword) 
router.post('/user/:id',allUser)
router.post('/message/:id',send)
router.get('/message',allMessage)
router.get('/detail',detail)
export default router