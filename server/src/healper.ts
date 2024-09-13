import { ZodError } from "zod";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportMines } from "./config/filesystem.js";
import type { UploadedFile } from "express-fileupload";
import { v4 as uuid4 } from 'uuid';
import fs from 'fs'

export const formatError = (error: ZodError): any => {
  let errors: any = {};

  error.errors?.map((issue) => {
    errors[issue.path?.[0]] = issue.message;
  });

  return errors;
};

export const renderEmailEjs = async (
  fileName: string,
  payload: any
): Promise<string> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const html: string = await ejs.renderFile(
    __dirname + `/views/emails/${fileName}.ejs`,
    payload
  );

  return html;
};


export const checkDateHourDiff = (date:Date | string):number =>{
  const now = moment()

  const tokensendAt = moment(date)
  const diffrence = moment.duration(now.diff(tokensendAt))

  return diffrence.asHours()
}

export const imageValidator = (size:number , mime:string):string | null => {
  if(bytesTomB(size) > 2){
    return "Image must bevless than 2 mb "
  } else if(!supportMines.includes(mime)){
    return "Image must be type of png, jpg,jpeh,webp....."
    }

    return null

}

export const bytesTomB = (bytes:number):number => {
  return bytes/(1024*1024)
}


export const uploadFile =  (image:UploadedFile) => {
  const imgExt = image?.name.split(".")
  const imageName  = uuid4() + "." + imgExt[1]
  const uploadPath = process.cwd() +"/public/images/"+imageName
  image.mv(uploadPath , (err) => {
    if (err) throw err
  })

  return imageName
}



export const removeImage = (imageName:string) =>{
  const path = process.cwd() +"/public/images/"+imageName
  if(fs.existsSync(path)){
    fs.unlinkSync(path)
  }




}





