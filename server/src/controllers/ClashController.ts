import { Request, Response } from "express";
import { number, ZodError } from "zod";

import {
  formatError,
  imageValidator,
  removeImage,
  uploadFile,
} from "../healper.js";
import { clashSchema } from "../validation/clashValidation.js";
import type { FileArray, UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";

class ClashController {


  async createclash(req: Request, res: Response) {
    try {
      const body = req.body;
      const payload = clashSchema.parse(body);

      if (req.files?.image) {
        const image = req.files?.image as UploadedFile;
        const validMsg = imageValidator(image.size, image.mimetype);

        if (validMsg) {
          return res.status(422).json({ errors: { image: validMsg } });
        }

        payload.image = uploadFile(image);
      } else {
        return res
          .status(422)
          .json({ errors: { image: "Image fields is require" } });
      }

      await prisma.clash.create({
        data: {
          title: payload.title,
          description: payload?.description,
          image: payload?.image,
          user_id: req.user?.id!,
          expire_at: new Date(payload.expire_at),
        },
      });

      return res.json({
        message: "Clash created successfully",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatError(err);

        return res.status(422).json({ message: "Invalid Data", errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const clash = await prisma.clash.findMany({
        where: {
          user_id: req.user?.id!,
        },

      });
      return res.json({
        message: "Classify fetched successfully",
        data: clash,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      //Get old image name
      const clash = await prisma.clash.findUnique({
        select: {
          image: true,
          id: true,
        },
        where: {
          id: Number(id),
        },
      });

      if (clash) removeImage(clash?.image);
      await prisma.clash.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({
        message: "Classify deleted successfully",
        data: clash,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateClash(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const payload = clashSchema.parse(body);

      if (req.files?.image) {
        const image = req.files?.image as UploadedFile;
        const validMsg = imageValidator(image.size, image.mimetype);

        if (validMsg) {
          return res.status(422).json({ errors: { image: validMsg } });
        }

        //Get old image name
        const clash = await prisma.clash.findUnique({
          select: {
            image: true,
            id: true,
          },
          where: {
            id: Number(id),
          },
        });

        if (clash) removeImage(clash?.image);

        payload.image = await uploadFile(image);
      }

      await prisma.clash.update({
        where: {
          id: Number(id),
        },
        data: {
          ...payload,
          expire_at: new Date(payload.expire_at),
        },
      });

      return res.json({
        message: "Clash created successfully",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatError(err);

        return res.status(422).json({ message: "Invalid Data", errors });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSingle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clash = await prisma.clash.findUnique({
        where: {
          id: Number(id),
        },
        include:{
          ClashItem:{
            select:{
              image:true,
              id:true,
              count:true
            }
          },
          ClashComments:{
            select:{
              id:true,
              comment:true,
              created_at:true
            },
            orderBy: {
              id: "desc",
            },
          }
        }
      });
      return res.json({
        message: "Classify fetched successfully",
        data: clash,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //*  Clash Items routes






  async items(req: Request, res: Response) {
    try {
      const {id} = req.body



      const files: FileArray | null | undefined = req.files;
      let imgErros: Array<string> = [];
      const images = files?.["images[]"] as UploadedFile[];
      if (images.length >= 2) {
        // * Check validation
        images.map((img) => {
          const validMsg = imageValidator(img?.size, img?.mimetype);
          if (validMsg) {
            imgErros.push(validMsg);
          }
        });
        if (imgErros.length > 0) {
          return res.status(422).json({ errors: imgErros });
        }

        // * Upload images to items
        let uploadedImages: string[] = [];
        images.map((img) => {
          uploadedImages.push(uploadFile(img));
        });



        uploadedImages.map(async (item) => {
          await prisma.clashItem.create({
            data: {
              image: item,
              clash_id: 1,

            },
          });
        });



        return res.json({ message: "Clash Items updated successfully!" });
      }

      return res
        .status(404)
        .json({ message: "Please select at least 2 images for clashing." });
    } catch (error) {
      // logger.error({ type: "Clash Item", body: JSON.stringify(error) });
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again" });
    }
  }

}

export { ClashController };
