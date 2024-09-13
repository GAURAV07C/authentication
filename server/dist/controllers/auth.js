import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEjs } from "../healper.js";
import prisma from "../config/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";
class AuthController {
    async register(req, res) {
        try {
            const body = req.body;
            const payload = registerSchema.parse(body);
            let user = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            });
            if (user) {
                return res.status(422).json({
                    errors: {
                        email: "Email already taken, Please use another one."
                    }
                });
            }
            // Register the Password
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
            const token = await bcrypt.hash(uuid4(), salt);
            const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
            const emailBody = await renderEmailEjs("email-verify", { name: payload.name, url: url });
            // send email
            await emailQueue.add(emailQueueName, { to: payload.email, subject: "Clash Email Verification", body: emailBody });
            await prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    email_verified_token: token,
                }
            });
            return res.json({ message: "Please check your email. We have sent you a verification email." });
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
}
export default AuthController;
