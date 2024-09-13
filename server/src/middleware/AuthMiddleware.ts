import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {

    return res.status(401).json({ message: "Unauthorized" });

  }


  const token = authHeader.split(" ")[1];

const key = process.env.SECREAT_KEY!
  //* verify Token
  jwt.verify(token, key, (err, user) => {



    if (err) {

      return res.status(403).json({ message: "Invalid Token" });

    }

    req.user = user as AuthUser;


    next();
  });
};

export default authMiddleware





