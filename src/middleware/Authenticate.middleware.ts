import { NextFunction,  Response } from "express";
import jwt from "jsonwebtoken"
import { AuthRequest } from "../types/request";



export const authenticate = async(req: AuthRequest, res: Response, next: NextFunction)=>{
    try {
        const AuthHeader = req?.headers.authorization

        if(!AuthHeader){
            res.status(401).json({
                isSucess: false,
                message:"not authorize(no header)"
            })
            return
        }

        const token = AuthHeader.split("")[1];
        if(!token){
         res.status(401).json({
            isSucess: false,
            message:"no token "
         })
         return
        }
        
     const result:any = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as{userId: Number}
      if(!result){
        res.status(401).json({
            isSucess: false,
            message:"unAthourazid(no result)"
        })
        return;
      }

      req.userId = result.userId
      next()
    } catch (error) {
     console.log(error);
     res.status(500).json({
        isSuccess: false,
        message:"something wrong with the server"
     })

    }
}