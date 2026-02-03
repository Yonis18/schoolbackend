import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/request";


export const schoolId = (req: AuthRequest, res: Response, next: NextFunction) =>{

    if(req.schoolId){
        res.status(401).json({
            isSucess: false,
            message:"unathorized scholId"
        })
        return;
    }

    const paramsschoolId = req.params.schoolId? Number(req.params.schoolId): null

    if(paramsschoolId !== null && paramsschoolId !== req.schoolId){
      res.status(403).json({
        isSucess: false,
        message:"access is denaid"
      });
      return
    }

    next();
}