import { db } from "../db/db.js";
import { NotFoundError, ValidationError } from "../../utils/errors.js";
import type { AddToWishListBody, Store } from "../types/types.js";

// ---WishList Services---
export const addToWishList = async ({ body, store }: { body: AddToWishListBody, store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const product = await db.product.findUnique({
      where: { id: body.productId }
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    const wishList = await db.wishlist.create({
      data: { userId, productId: body.productId }
    }); 
    return {
      status: "success",
      message: "Product added to wish list",
      data: wishList
    };
  } catch (error) {
    throw error;
  }
};

export const getWishList = async ({ store }: { store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const wishList = await db.wishlist.findMany({
      where: { userId }
    });
    return {
      status: "success",
      data: wishList
    };
  } catch (error) {
    throw error;
  }
};