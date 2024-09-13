import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../healper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
import jwt from "jsonwebtoken";
class AuthController {
    async login(req, res) {
        try {
            const body = req.body;
            const payload = loginSchema.parse(body);
            let user = await prisma.user.findUnique({
                where: { email: payload.email },
            });
            if (!user || user === null) {
                return res.status(422).json({
                    errors: {
                        message: "Invalid email or password",
                    },
                });
            }
            // * Check email verified or not
            if (user.email_verified_at === null) {
                return res.status(422).json({
                    errors: {
                        email: "Email is not verified yet.please check your email and verify your email.",
                    },
                });
            }
            //* cheak password
            const compare = await bcrypt.compare(payload.password, user.password);
            if (!compare) {
                return res.status(422).json({
                    errors: {
                        message: "Invalid Credntitials",
                    },
                });
            }
            //* jwt payload
            let JWTPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            //* ! means not null or we can use SECREAT_KEY as string .. then its understand it is string
            const token = jwt.sign(JWTPayload, process.env.SECREAT_KEY, {
                expiresIn: "365d",
            });
            const resPayload = {
                id: user.id,
                email: user.email,
                name: user.name,
                token: `Bearer ${token}`,
            };
            return res.json({
                message: "Logged in successfully!",
                data: resPayload,
            });
        }
        catch (err) {
            console.log("the error", err);
            if (err instanceof ZodError) {
                const errors = formatError(err);
                return res.status(422).json({ message: "Invalid Data", errors });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async checkCreditionals(req, res) {
        try {
            const body = req.body;
            const payload = loginSchema.parse(body);
            let user = await prisma.user.findUnique({
                where: { email: payload.email },
            });
            if (!user || user === null) {
                return res.status(422).json({
                    errors: {
                        email: "No user found with this email.",
                    },
                });
            }
            // * Check email verified or not
            if (user.email_verified_at === null) {
                return res.status(422).json({
                    errors: {
                        email: "Email is not verified yet.please check your email and verify your email.",
                    },
                });
            }
            //* cheak password
            const compare = await bcrypt.compare(payload.password, user.password);
            if (!compare) {
                return res.status(422).json({
                    errors: {
                        message: "Invalid Credntitials",
                    },
                });
            }
            return res.json({
                message: "logged in successfully",
                data: {},
            });
        }
        catch (err) {
            console.log("the error", err);
            if (err instanceof ZodError) {
                const errors = formatError(err);
                return res.status(422).json({ message: "Invalid Data", errors });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async register(req, res) {
        try {
            const body = req.body;
            const payload = registerSchema.parse(body);
            let user = await prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });
            if (user) {
                return res.status(422).json({
                    errors: {
                        email: "Email already taken, Please use another one.",
                    },
                });
            }
            // Register the Password
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
            const token = await bcrypt.hash(uuid4(), salt);
            const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
            const emailBody = await renderEmailEjs("email-verify", {
                name: payload.name,
                url: url,
            });
            // send email
            await emailQueue.add(emailQueueName, {
                to: payload.email,
                subject: "Clash Email Verification",
                body: emailBody,
            });
            await prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    email_verified_token: token,
                },
            });
            return res.json({
                message: "Please check your email. We have sent you a verification email.",
            });
        }
        catch (err) {
            if (err instanceof ZodError) {
                const errors = formatError(err);
                return res.status(422).json({ message: "Invalid Data", errors });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
export { AuthController };
