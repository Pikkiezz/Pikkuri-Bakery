import { db } from "../db/db.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";
import type { Headers, CancelOrderBody, Store, OrderResponse, CreateOrderBody } from "../types/types.js";

// ---Order Services---

// Get user's orders
export const getUserOrders = async ({ store }: { store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    const orders = await db.order.findMany({
      where: { userId },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        payment: true,
        shipping: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      status: "success",
      data: orders
    };
  } catch (error) {
    throw error;
  }
};

// Get order by ID
export const getOrderById = async ({ params, store }: { params: { id: string }, store?: Store }) => {
  try {
    const orderId = parseInt(params.id);
    if (!orderId) {
      throw new ValidationError("Order ID is required");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    const order = await db.order.findFirst({
      where: {
        id: orderId,
        userId // ตรวจสอบว่าเป็นของ user นี้
      },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                imageUrl: true
              }
            }
          }
        },
        payment: true,
        shipping: true
      }
    });

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    return {
      status: "success",
      data: order
    };
  } catch (error) {
    throw error;
  }
};

// Cancel order
export const cancelOrder = async ({ body, store }: { body: CancelOrderBody, store?: Store }) => {
  try {
    if (!body.orderId) {
      throw new ValidationError("Order ID is required");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    // เริ่ม Transaction
    const result = await db.$transaction(async (tx) => {
      // 1. หา Order และตรวจสอบว่าเป็นของ user นี้
      const order = await tx.order.findFirst({
        where: {
          id: body.orderId,
          userId
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      if (!order) {
        throw new NotFoundError("Order not found");
      }

      // 2. ตรวจสอบสถานะ Order
      if (order.status === "CANCELED") {
        throw new ValidationError("Order is already canceled");
      }

      if (order.status === "SHIPPED" || order.status === "COMPLETED") {
        throw new ValidationError("Cannot cancel order that has been shipped or completed");
      }

      // 3. อัปเดตสถานะ Order เป็น CANCELED
      const updatedOrder = await tx.order.update({
        where: { id: body.orderId },
        data: { status: "CANCELED" }
      });

      // 4. คืน Stock ของสินค้าทั้งหมด
      await Promise.all(
        order.items.map(item =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          })
        )
      );

      // 5. อัปเดต Payment status (ถ้ามี)
      const payment = await tx.payment.findUnique({
        where: { orderId: body.orderId }
      });
      if (payment) {
        await tx.payment.update({
          where: { orderId: body.orderId },
          data: { status: "FAILED" }
        });
      }

      // 6. อัปเดต Shipping status (ถ้ามี)
      const shipping = await tx.shipping.findUnique({
        where: { orderId: body.orderId }
      });
      if (shipping) {
        await tx.shipping.update({
          where: { orderId: body.orderId },
          data: { status: "CANCELED" }
        });
      }

      return {
        order: updatedOrder,
        items: order.items
      };
    });

    return {
      status: "success",
      message: "Order canceled successfully",
      data: {
        orderId: result.order.id,
        status: result.order.status,
        itemCount: result.items.length
      }
    };
  } catch (error) {
    throw error;
  }
};

// Update order status (สำหรับ Admin)
export const updateOrderStatus = async ({ 
  params, 
  body, 
  store 
}: { 
  params: { id: string }, 
  body: { status: string }, 
  store?: Store 
}) => {
  try {
    const orderId = parseInt(params.id);
    if (!orderId) {
      throw new ValidationError("Order ID is required");
    }

    if (!body.status) {
      throw new ValidationError("Status is required");
    }

    // ตรวจสอบ valid status
    const validStatuses = ["PENDING", "PAID", "SHIPPED", "COMPLETED", "CANCELED"];
    if (!validStatuses.includes(body.status)) {
      throw new ValidationError("Invalid status");
    }

    const adminId = store?.adminId;
    if (!adminId) {
      throw new ValidationError("Admin authentication required");
    }

    const order = await db.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status: body.status as any }
    });

    return {
      status: "success",
      message: "Order status updated successfully",
      data: updatedOrder
    };
  } catch (error) {
    throw error;
  }
};
