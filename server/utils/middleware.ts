import type { Elysia } from "elysia";
import * as userServices from "../src/service/userServices.js"; 
import * as adminServices from "../src/service/adminService.js";
import { ValidationError } from "./errors.js";
import type { Headers, Store } from "../src/types/types.js";

export const checkId = ({ params }: { params: { id: string } }) => {
    try {
      const id = params.id;
      if (!id || isNaN(Number(id)) || Number(id) < 0) {
        throw new ValidationError("Invalid ID parameter");
      }
  
      return { message: "ID is valid" };
    } catch (error) {
      throw error;
    }
  };

export const checkIdMiddleware = () => (app: Elysia) => app
  .onBeforeHandle(({ params, set }: { params: any, set: any }) => {
    try {
      if (!params || !params.id) {
        set.status = 400;
        return { status: "fail", message: "ID parameter is required" };
      }
      checkId({ params: { id: params.id } });
    } catch (error) {
      set.status = 400;
      return { status: "fail", message: "Invalid ID parameter" };
    }
  });

export const verifyUserTokenMiddleware = () => (app: Elysia) => app
  .onBeforeHandle(async ({ headers, set, cookie, store }: { headers: Headers, set: any, cookie: any, store?: Store }) => {
    try {
      console.log('🔐 verifyUserTokenMiddleware - cookie:', cookie);
      console.log('🔐 verifyUserTokenMiddleware - headers.authorization:', headers.authorization);
      
      let tokenData;
      
      // check token from cookie first
      if (cookie?.userToken) {
        console.log('🔐 Using cookie token:', cookie.userToken);
        const token = cookie.userToken;
        const mockHeaders = { authorization: `Bearer ${token}` };
        tokenData = await userServices.verifyTokenUser({ headers: mockHeaders });
      } else if (headers.authorization) {
        console.log('🔐 Using header token:', headers.authorization);
        // check header if no cookie
        tokenData = await userServices.verifyTokenUser({ headers });
      } else {
        console.log('🔐 No token provided');
        throw new ValidationError("No token provided");
      }
      
      // store userId in store for use in service
      if (tokenData && tokenData.data && store) {
        const userData = tokenData.data as any;
        store.userId = userData.userId || userData.id;
        store.username = userData.username;
        store.userData = {
          userId: userData.userId || userData.id,
          username: userData.username,
          email: userData.email
        };
      }
    } catch (error) {
      set.status = 401;
      return { status: "fail", message: "Invalid token" };
    }
  });

export const verifyAdminTokenMiddleware = () => (app: Elysia) => app
  .onBeforeHandle(async ({ headers, set, cookie, store }: { headers: any, set: any, cookie: any, store?: Store }) => {
    try {
      let tokenData;
      
      // ตรวจสอบ token จาก cookie ก่อน
      if (cookie?.adminToken) {
        const token = cookie.adminToken;
        const mockHeaders = { authorization: `Bearer ${token}` };
        tokenData = await adminServices.verifyTokenAdmin({ headers: mockHeaders });
      } else if (headers.authorization) {
        // ถ้าไม่มี cookie ให้ตรวจสอบ header
        tokenData = await adminServices.verifyTokenAdmin({ headers });
      } else {
        throw new ValidationError("No admin token provided");
      }
      
      // store adminId in store for use in service
      if (tokenData && tokenData.data && store) {
        const adminData = tokenData.data as any;
        store.adminId = adminData.adminId || adminData.id;
        store.adminData = {
          adminId: adminData.adminId || adminData.id,
          username: adminData.username,
          email: adminData.email
        };
      }
    } catch (error) {
      set.status = 401;
      return { status: "fail", message: "Invalid admin token" };
    }
  });