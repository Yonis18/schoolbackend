
import jwt from "jsonwebtoken";
export const generateToken =(userId : string) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY as string,{
        expiresIn:"6d"
    });

}


export const generateRefereshToken =(userId: string)=>{
  return jwt.sign({userId}, process.env.JWT_REFERESHTOKEN_KEY as string, {
    expiresIn:"2m"
  }  
)

}