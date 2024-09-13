import {z} from 'zod'

export  const registerSchema = z.object({
    name:z.string({message:"Name is require"})
    .min(3,{message:"Name must be 3 character long"}),
    email:z.string({message:"email is require"})
    .email({message:"email must be correct long"}),
    password:z.string({message:"Password is require"})
    .min(6,{message:"Password must be 6 character long"}),
    confirm_password:z.string({message:"confirm Password is require"})
    .min(6,{message:"confirm Password must be 6 character long"}),

}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not matched",
    path: ["confirm_password"],
  });


export const loginSchema = z.object({
    email:z.string({message:"Email is require"})
    .email({message:"email must be correct long"}),
    password:z.string({message:"Password is require"})
    .min(6,{message:"Password must be true"}),

})
