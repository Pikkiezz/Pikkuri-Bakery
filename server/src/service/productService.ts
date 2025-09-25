import { latestRequestTime } from "../router/productRouter.js";
import { db } from "../db/db.js";
import type { CreateProductBody, ProductResponse } from "../types/types.js";
import { ValidationError, NotFoundError, DatabaseError } from "../../utils/errors.js";


export const getAllProducts = async () => {
  try {
    let response = await db.product.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    });
    
    // คำนวณ popular products จาก OrderItem
    let productsWithOrders = await db.product.findMany({
      include: {
        orders: {
          select: {
            quantity: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      }
    });

    // คำนวณ total sold สำหรับแต่ละ product
    const productsWithSold = productsWithOrders.map(product => {
      const totalSold = product.orders.reduce((sum, order) => sum + order.quantity, 0);
      return {
        ...product,
        totalSold: totalSold
      };
    });

    // เรียงตาม totalSold จากมากไปน้อย และเอาแค่ 5 อันดับแรก
    let popularProducts = productsWithSold
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    let newProducts = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    });
    
    console.log(response);
    if (!response) {
      throw new NotFoundError("No products found");
    } else {
      return {
        status: "success",
        requestTime: latestRequestTime,
        data: {
          response,
          popularProducts,
          productsWithSold,
          newProducts, 
        },
      };
    }
  } catch (error) {
    throw error;
  }
};

export const addProduct = async ({ body }: { body: CreateProductBody }) => {
  console.log(body);
  try {
    // Validate required fields
    if (!body.name) {
      throw new ValidationError("Name is required");
    }
    if (!body.price || isNaN(Number(body.price))) {
      throw new ValidationError("Price is required and must be a valid number");
    }
    if (!body.categoryId || isNaN(Number(body.categoryId))) {
      throw new ValidationError("Category ID is required and must be a valid number");
    }
    if (!body.createdById || isNaN(Number(body.createdById))) {
      throw new ValidationError("Updated By ID is required and must be a valid number");
    }

    let response = await db.product.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: Number(body.price),
        stock: Number(body.stock) || 0,
        imageUrl: null,
        categoryId: Number(body.categoryId),
        updatedById: Number(body.createdById),
      },
    });

    return {
      status: "Inserted data successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const searchProductByName = async ({ body }: { body: any }) => {
  try {
    if (!body.name) {
      throw new ValidationError("Name is required");
    }
    let response = await db.product.findMany({
      where: {
        name: {
          contains: body.name,
        },
      },
    });
    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const getProductById = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    let response = await db.product.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!response) {
      throw new NotFoundError("Product not found");
    }
    return {
      status: "success",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const updateProductById = async ({
  params,
  body,
}: {
  params: { id: string };
  body: any;
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("ID is required");
    }
    let response = await db.product.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
        updatedById: body.updatedById,
        updatedAt: new Date(),
      },
    });

    return {
      status: "updated data successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("ID is required");
    }

    let response = await db.product.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return {
      status: "deleted data successfully",
      data: response,
    };
  } catch (error) {
    throw error;
  }
};
