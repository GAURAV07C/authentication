import { Router, Request, Response } from "express";
import { Password } from "../controllers/PasswordController.js";
import { authLimiter } from "../config/rateLimit.js";

const router = Router();
const passwordController = new Password();

router
  .route("/forget-password")
  .post(authLimiter, passwordController.forgotPassword);


router
  .route("/reset-password")
  .post(authLimiter, passwordController.resetPassword);

export default router;









