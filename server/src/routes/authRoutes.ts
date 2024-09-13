import { Router, Request , Response } from "express";

const router = Router();

import {AuthController} from "../controllers/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";



const authController = new AuthController();

router.route("/login").post(authLimiter,authController.login)

router.route("/cheak/credentials").post(authLimiter,authController.checkCreditionals)

router.route("/register").post(authLimiter,authController.register);



router.get("/user", authMiddleware , async (req:Request , res:Response) => {
  const user = req.user
  console.log(user)
  return res.json({ data: user})
})






export default router
