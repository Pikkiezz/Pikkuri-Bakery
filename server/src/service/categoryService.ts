import { db } from "../db/db.js";
import { ValidationError, NotFoundError, DatabaseError } from "../../utils/errors.js";
import type { CreateCategoryBody, CategoryResponse } from "../types/types.js";

// ------------ Category Services --------

export const getCategories = async () => {
  try {
    let response = await db.category.findMany();
    return {
      status: "success",
      data: response
    };
  } catch (error) {
    throw error;
  }
};

export const addCategory = async ({ body }: { body: CreateCategoryBody }) => {
  try {
    if (!body.name) {
      throw new ValidationError("Name is required");
    }
    if (!body.description) {
      throw new ValidationError("Description is required");
    }
    const [existingName] = await Promise.all([
      db.category.findUnique({ where: { name: body.name } }),
    ]);
    if (existingName) {
      throw new ValidationError("Name already exists");
    }
    
    let response = await db.category.create({
      data: {
        name: body.name,
        description: body.description,
        
      },
    });
    return {
      status: "Inserted data successfully",
      data: response as CategoryResponse,
    };
  } catch (error) {
    throw error;
  }
};

