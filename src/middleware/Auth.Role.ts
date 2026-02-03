import { NextFunction, Response, Request} from "express";
import { AuthRequest } from "../types/request";



export const requireRole = (...roles: AuthRequest["role"][]) =>( req: AuthRequest, res:Response, next:NextFunction) =>{

    if(!req.role){
        res.status(401).json({
            isSucces:false,
            message:"unathorized role"
        });
        return;

    }

    if(!roles.includes(req.role)) {
        res.status(403).json({
            isSucess:false,
            message:"forbiden"
        });
        return
    }
 
    next();
}