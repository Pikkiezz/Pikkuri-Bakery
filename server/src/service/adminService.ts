import { NotFoundError, ValidationError } from "../../utils/errors.js";
import { db } from "../db/db.js";
import type { CreateAdminBody, LoginAdminBody, Headers } from "../types/types.js";
import { validatePhoneNumber } from "../../utils/validators.js";
import { hashPassword, generateJWT, comparePassword, verifyJWT } from "../../utils/encrypt.js";


// ---Auth Services---

export const signUpAdmin = async ({ body }: { body: CreateAdminBody }) => {
    try {
      if (!body.username) {
        throw new ValidationError("Username is required");
      }
      if (!body.email) {
        throw new ValidationError("Email is required");
        
      }
      if (!body.password) {
        throw new ValidationError("Password is required");
      }
      if (body.password.length < 8) {
        throw new ValidationError("Password must be at least 8 characters");
      }
      if (!body.phone || !validatePhoneNumber(body.phone)) {
        throw new ValidationError("Invalid phone number format");
      }
      
  
      const [existingemail, existingUsername] = await Promise.all([
        db.admin.findUnique({ where: { email: body.email } }),
        db.admin.findUnique({ where: { username: body.username } })
      ]);
      
      if (existingUsername) {
        throw new ValidationError("Username already exists");
      }
      if (existingemail) {
        throw new ValidationError("Email already exists");
      }
  
      let pwd = await hashPassword(body.password);
      let response = await db.admin.create({
        data: {
          username: body.username,
          email: body.email,
          password: pwd,
          phone: body.phone,
          address: body.address,
        },
      });
      return {
        status: "success",
        message: "Admin created successfully",
        data: response,
      };
    } catch (error) {
      throw error;
    }
  };

  // ---Login Services---

  export const logInAdmin = async ({ body, set }: { body: LoginAdminBody, set?: any }) => {
    if (!body.username && !body.email) {
      throw new ValidationError("Username or email is required");
    }
    if (!body.password) {
      throw new ValidationError("Password is required");
    }

    let response = await db.admin.findFirst({
      where:{
        OR:[
          {email:body.email as string},
          {username:body.username as string}
        ]
      }
    });
    if(!response){
      throw new NotFoundError("Admin not found");
    }
    let isPasswordCorrect = await comparePassword(body.password,response.password);
    if(!isPasswordCorrect){
      throw new ValidationError("Invalid password");
    }
    const token = await generateJWT({
      adminId: response.id,
      username: response.username,
      email: response.email
    })
    
    // Set token in cookie
    if (set) {
      set.headers = {
        ...set.headers,
        'Set-Cookie': `adminToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`
      };
    }
    
    return {
      status: "success",
      message: "Admin logged in successfully",
      data: response,
    }
      };


      // ---Verify Token Services---

      export const verifyTokenAdmin = async ({ headers }: { headers: Headers }) => {
        try {
          if (!headers.authorization) {
          throw new ValidationError("Access token required");
        }
        const token = headers.authorization.split(" ")[1];
        const validToken = await verifyJWT(token as string)
        if(!validToken){
          throw new ValidationError("Invalid token");
        }
        return {
          status: "success",
          message: "Token verified successfully",
          data: validToken,
        }
        
        } catch (error) {
          throw error;
        }
      };  


      // ------------Admin Services------------

      export const getAllAdmins = async () => {
        try {
          let response = await db.admin.findMany();
          if(!response){
            throw new NotFoundError("Admins not found");
          }
          return {
            status: "success",
            data: response,
          }
        } catch (error) {
          throw error;
        }
      };

      export const getAdminById = async ({ params }: { params: { id: string } }) => {
        try {
          let response = await db.admin.findUnique({
            where: { id: parseInt(params.id) },
          });
          if(!response){
            throw new NotFoundError("Admin not found");
          }
          return {
            status: "success",
            data: response,
          }
        } catch (error) {
          throw error;
        }
      }

      export const updateAdminById = async ({ params, body }: { params: { id: string }, body: CreateAdminBody }) => {
        try {
          let response = await db.admin.update({
            where: { id: parseInt(params.id) },
            data: body,
          });
          if(!response){
            throw new NotFoundError("Admin not found");
          }
          return {
            status: "success",
            data: response,
          }
        } catch (error) {
          throw error;
        }
      }

      export const deleteAdminById = async ({ params }: { params: { id: string } }) => {
        try {
          if(!params.id){
            throw new ValidationError("ID is required");
          }
          let response = await db.admin.delete({
            where: { id: parseInt(params.id) },
          });
        if(!response){
          throw new NotFoundError("Admin not found to delete");
        }
        return {
          status: "success",
          data: response,
        }
      } catch (error) {
        throw error;
      }
      };

     