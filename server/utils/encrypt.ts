import bcrypt from 'bcrypt';
import { DatabaseError, ValidationError } from "./errors.js";
import jwt from 'jsonwebtoken';


export const hashPassword = async (paintextpassword: string, saltRounds: number = 10) => {
    try {
        const hash = await bcrypt.hash(paintextpassword, saltRounds);
        return hash;
    } catch (error) {
        console.log(error);
        throw new DatabaseError("Failed to hash password");
    }
}


export const generateJWT = async (data: any) => {
    const secret = process.env.JWT_SECRET || 'Pleasedontchangemypassword@';
    const token = jwt.sign(data, secret, { expiresIn: 60 * 60 });
    return token;
}




export const comparePassword = async (paintextpassword: string, hash: string) => {
    try {
        const result = await bcrypt.compare(paintextpassword, hash);
        return result;
    } catch (error) {
        console.log(error);
        throw new DatabaseError("Failed to compare password");
    }
}


export const verifyJWT = async (token: string) => {
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET || 'Pleasedontchangemypassword@')
        return result;
    } catch (error) {
        console.log("JWT verification failed:", error);
        throw new ValidationError("Failed to verify token");
    }
}