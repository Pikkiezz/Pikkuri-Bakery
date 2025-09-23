import { db } from "../db/db.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";
import type { Headers, AddReviewBody, UpdateReviewBody, Store } from "../types/types.js";

// ---Review Services---

// Add review
export const addReview = async ({ body, store }: { body: AddReviewBody, store?: Store }) => {
  try {
    if (!body.productId) {
      throw new ValidationError("Product ID is required");
    }
    if (!body.rating || body.rating < 1 || body.rating > 5) {
      throw new ValidationError("Rating must be between 1 and 5");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    // check if product exists
    const product = await db.product.findUnique({
      where: { id: body.productId }
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    // check if user has already reviewed this product
    const existingReview = await db.review.findFirst({
      where: {
        userId,
        productId: body.productId
      }
    });

    if (existingReview) {
      throw new ValidationError("You have already reviewed this product");
    }

    // create review
    const response = await db.review.create({
      data: {
        userId,
        productId: body.productId,
        rating: body.rating,
        comment: body.comment || null
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        product: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return {
      status: "success",
      message: "Review added successfully",
      data: response
    };
  } catch (error) {
    throw error;
  }
};

// Get product reviews
export const getProductReviews = async ({ params }: { params: { productId: string } }) => {
  try {
    if (!params.productId) {
      throw new ValidationError("Product ID is required");
    }

    const productId = parseInt(params.productId);

    // check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const reviews = await db.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        product: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // average rating
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      status: "success",
      data: {
        reviews,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews.length
      }
    };
  } catch (error) {
    throw error;
  }
};

// Get user reviews
export const getUserReviews = async ({ store }: { store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    const reviews = await db.review.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        product: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      status: "success",
      data: reviews
    };
  } catch (error) {
    throw error;
  }
};

// Update review
export const updateReview = async ({ 
  params, 
  body, 
  store
}: { 
  params: { id: string }, 
  body: UpdateReviewBody, 
  store?: Store
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("Review ID is required");
    }
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      throw new ValidationError("Rating must be between 1 and 5");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const reviewId = parseInt(params.id);

    // check if review belongs to user
    const existingReview = await db.review.findFirst({
      where: {
        id: reviewId,
        userId
      }
    });

    if (!existingReview) {
      throw new NotFoundError("Review not found");
    }

    // update review
    const updatedReview = await db.review.update({
      where: { id: reviewId },
      data: {
        rating: body.rating || existingReview.rating,
        comment: body.comment !== undefined ? body.comment : existingReview.comment
      },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        product: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return {
      status: "success",
      message: "Review updated successfully",
      data: updatedReview
    };
  } catch (error) {
    throw error;
  }
};

// Delete review
export const deleteReview = async ({ 
  params, 
  store
}: { 
  params: { id: string }, 
  store?: Store
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("Review ID is required");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const reviewId = parseInt(params.id);

    // check if review belongs to user
    const existingReview = await db.review.findFirst({
      where: {
        id: reviewId,
        userId
      }
    });

    if (!existingReview) {
      throw new NotFoundError("Review not found");
    }

    // delete review
    await db.review.delete({
      where: { id: reviewId }
    });

    return {
      status: "success",
      message: "Review deleted successfully"
    };
  } catch (error) {
    throw error;
  }
};