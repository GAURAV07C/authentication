import {z} from 'zod'




export const fogotPasswordSchema = z.object({
    email:z.string({message:"Email is require"})
    .email({message:"email must be correct long"}),

})


export  const resetPasswordSchema = z.object({
    email:z.string({message:"email is require"})
    .email({message:"email must be correct long"}),
    token:z.string({message:"email is require"}),
    password:z.string({message:"token is require"})
    .min(6,{message:"Password must be 6 character long"}),
    confirm_password:z.string({message:"confirm Password is require"})
    .min(6,{message:"confirm Password must be 6 character long"}),

}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not matched",
    path: ["confirm_password"],
  });
