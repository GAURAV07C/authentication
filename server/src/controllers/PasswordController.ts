import { Request, Response } from "express";
import { ZodError } from "zod";
import { checkDateHourDiff, formatError, renderEmailEjs } from "../healper.js";
import {
  fogotPasswordSchema,
  resetPasswordSchema,
} from "../validation/passwordValidation.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob.js";

class Password {
  async forgotPassword(req: Request, res: Response) {
    try {
      const body = req.body;

      const payload = fogotPasswordSchema.parse(body);

      let user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user || user === null) {
        return res.status(422).json({
          errors: {
            email: "No User found with this email",
          },
        });
      }

      const salt = await bcrypt.genSalt(10);

      const token = await bcrypt.hash(uuid4(), salt);
      await prisma.user.update({
        data: {
          password_reset_token: token,
          token_send_at: new Date().toISOString(),
        },
        where: {
          email: payload.email,
        },
      });

      const url = `${process.env.CLIENT_URL}/reset-password?email=${payload.email}&token=${token}`;
      const html = await renderEmailEjs("forget-password", { url: url });

      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Reset your password",
        body: html,
      });

      return res.json({
        message:
          "Password reset sent link successfully please cheak your email",
      });
    } catch (err) {
      console.log("the error", err);
      if (err instanceof ZodError) {
        const errors = formatError(err);

        return res.status(422).json({ message: "Invalid Data", errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const body = req.body;
      const payload = resetPasswordSchema.parse(body);
      let user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user || user === null) {
        return res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "Link is not correct mae sure you copied correct link",
          },
        });
      }

      //* cheak token

      if (user.password_reset_token !== payload.token) {
        return res.status(422).json({
          message: "Invalid Data",
          errors: {
            email: "Link is not correct mae sure you copied correct link",
          },
        });
    }

    //* two hour time frame

    const hoursDiff = checkDateHourDiff(user.token_send_at!)

    if(hoursDiff > 2){
        return res.status(422).json({
            message: "Invalid Data",
            errors: {
              email: "Password reset token got expired. please send new token",
            },
          });
    }


    //* update password

    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(payload.password, salt)

    await prisma.user.update({
        data:{
            password:newPass,
            password_reset_token:null,
            token_send_at:null

        },
        where:{
            email:payload.email
        }
    })

    return res.json({Message:"Password reset successfully . Please try to login now."})


    } catch (err) {
      console.log("the error", err);
      if (err instanceof ZodError) {
        const errors = formatError(err);

        return res.status(422).json({ message: "Invalid Data", errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export { Password };
