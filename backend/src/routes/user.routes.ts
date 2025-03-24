import { Router } from "express";
import userController from "../controller/user.controller";

const userRouter = Router()

userRouter.post('/login', userController.loginUser)
userRouter.post('/signup', userController.addUser)
userRouter.get('/logout', userController.logout)
userRouter.get('/check-auth', userController.getUserByUsername)
userRouter.get('/check-users', userController.checkUsers)

export default userRouter