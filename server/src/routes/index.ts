import { Router } from "express";
import AuthRoutes from './authRoutes.js'
import VerifyRoutes from './verifyRoutes.js'
import PasswordRoutes from './PasswordRoute.js'
import ClashRoutes from './clashRoute.js'

const router = Router();

router.use("/api/auth",AuthRoutes)
router.use("/api/auth",PasswordRoutes)
router.use("/",VerifyRoutes);
router.use("/api/clash", ClashRoutes);

export default router
