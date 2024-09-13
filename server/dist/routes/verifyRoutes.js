import { Router } from "express";
import prisma from "../config/database.js";
const router = Router();
router.get("/verify-email", async (req, res) => {
    const { email, token } = req.query;
    if (email && token) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            if (token === user.email_verified_token) {
                await prisma.user.update({
                    data: {
                        email_verified_token: null,
                        email_verified_at: new Date().toISOString(),
                    },
                    where: {
                        email: email,
                    },
                });
                return res.redirect(`${process.env.CLIENT_URL}/login`);
            }
        }
        return res.redirect("/verify-error");
    }
    return res.redirect("/verify-error");
});
router.get("/verify-error", (req, res) => {
    return res.render("auth/emailVerifyError");
});
export default router;
