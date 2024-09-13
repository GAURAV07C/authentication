import { z } from "zod";
export const clashSchema = z.object({
    title: z
        .string({ message: "Title is require" })
        .min(3, { message: "Name must be 3 character long" })
        .max(60, { message: "Title must be less than 60 character long." }),
    description: z
        .string({ message: "Description is require" })
        .min(3, { message: "Description must be 3 character long" })
        .max(60, { message: "Description must be less than 60 character long." }),
    expire_at: z
        .string({ message: "Expire at  is require" })
        .min(5, { message: "Name must be 3 character long" }),
    image: z
        .string().optional(),
});
