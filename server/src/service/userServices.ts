import { db } from "../db/db.js";
import type { CreateUserBody } from "../types/types.js";
import { validatePhoneNumber } from "../../utils/validators.js";
import {ValidationError,NotFoundError,DatabaseError} from "../../utils/errors.js";
import { hashPassword, generateJWT, comparePassword, verifyJWT } from "../../utils/encrypt.js";
import type { LoginUserBody, Headers } from "../types/types.js";

// ------------ Auth Services --------

// Signup User

export const signUpUser = async ({ body }: { body: CreateUserBody }) => {
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
      db.user.findUnique({ where: { email: body.email } }),
      db.user.findUnique({ where: { username: body.username } })
    ]);
    
    if (existingUsername) {
      throw new ValidationError("Username already exists");
    }
    if (existingemail) {
      throw new ValidationError("Email already exists");
    }

    let pwd = await hashPassword(body.password);
    let response = await db.user.create({
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
      message: "User created successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};



// Login User
export const logInUser = async ({ body, set }: { body: LoginUserBody, set?: any }) => {
  if (!body.username && !body.email) {
    throw new ValidationError("Username or email is required");
  }
  if (!body.password) {
    throw new ValidationError("Password is required");
  }
  // Find user by username or email
  let response = await db.user.findFirst({
    where: {
      OR: [
        { username: body.username as string },
        { email: body.email as string }
      ]
    }
  });

  if (!response) {
    throw new NotFoundError("User not found");
  }
  let isPasswordCorrect = await comparePassword(body.password, response.password);
  if (!isPasswordCorrect) {
    throw new ValidationError("Invalid password");
  }
  
  const token = await generateJWT({ 
    userId: response.id,
    username: response.username, 
    email: response.email 
  });
  
  // Set token in cookie
  if (set) {
    set.headers = {
      ...set.headers,
      'Set-Cookie': `userToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`
    };
  }
  
  return {
    status: "success",
    message: "User logged in successfully",
    token: token,
    data: response,
  };
}

// Logout User
export const logOutUser = async ({ set }: { set?: any }) => {
  try {
    // Clear cookie by setting it to expire
    if (set) {
      set.headers = {
        ...set.headers,
        'Set-Cookie': 'userToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
      };
    }
    
    return {
      status: "success",
      message: "User logged out successfully"
    };
  } catch (error) {
    throw error;
  }
};

// ------------ Verify Token Services --------

export const verifyTokenUser = async ({ headers }: { headers: Headers }) => {
  console.log("�� verifyToken called"); // เพิ่ม log นี้
  console.log("Headers:", headers.authorization); // ดู headers ที่ส่งมา
  
  try {
    if (!headers.authorization) {
      console.log("No authorization header");
      throw new ValidationError("Access token required");
    }

    const token = headers.authorization.split(" ")[1];

    const tokenValid = await verifyJWT(token as string);
    if (!tokenValid) {
      throw new ValidationError("Invalid token");
    }
  
    console.log("Token valid:", tokenValid);
    return {
      status: "success",
      message: "Token verified successfully",
      data: tokenValid,
    };
  
  } catch (error) {
    if (error && typeof error === 'object' && 'name' in error && error.name === 'TokenExpiredError') {
      console.log("Token expired at:", error && typeof error === 'object' && 'expiredAt' in error && error.expiredAt);
    }
    console.log("Error in verifyToken:", error);
    throw error;
  }
};



// ------------ User Services --------


export const getAllUsers = async () => {
  try {
    let response = await db.user.findMany();
    if (!response) {
      throw new NotFoundError("Users not found");
    }
    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserById = async ({ params }: { params: { id: string } }) => {
  try {
    let response = await db.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!response) {
      throw new NotFoundError("User not found");
    }
    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async ({
  params,
  body,
}: {
  params: { id: string };
  body: CreateUserBody;
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("ID is required");
    }
    let response = await db.user.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        phone: body.phone,
        address: body.address,
        updatedAt: new Date(),
      },
    });
    return {
      status: "success",
      message: "User updated successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("ID is required");
    }
    let response = await db.user.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return {
      status: "success",
      message: "User deleted successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};
