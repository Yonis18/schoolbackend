import { Request } from "express"
 
 
 export interface AuthRequest extends Request{
userId? : Number
role?: "ADMIN" | "TEACHER" | "STUDENT";
schoolId?: number;
}