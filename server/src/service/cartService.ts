import { db } from "../db/db.js";
import { ValidationError, NotFoundError } from "../../utils/errors.js";
import type { Headers, AddToCartBody, UpdateCartItemBody, Store, SelectCartItemBody, CreateOrderBody, OrderResponse, CancelOrderBody, PaymentMethod } from "../types/types.js";
import { methodsShipping, calculateShippingCost } from "./shippingService.js";
import { processPayment } from "./paymentService.js";

// ---Cart Services---

// Get user's cart
export const getCart = async ({ store }: { store?: Store }) => {
  try {
    console.log('🛒 getCart - store:', store);
    const userId = store ?.userId;
    console.log('🛒 getCart - userId:', userId);
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                stock: true
              }
            }
          }
        }
      }
    });

    if (!cart) {
      // สร้าง cart ใหม่ถ้ายังไม่มี
      const newCart = await db.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  imageUrl: true,
                  stock: true
                }
              }
            }
          }
        }
      });
      return {
        status: "success",
        data: newCart
      };
    }

    return {
      status: "success",
      data: cart
    };
  } catch (error) {
    throw error;
  }
};

// Add item to cart
export const addToCart = async ({ body, store }: { body: AddToCartBody, store?: Store }) => {
  try {
    if (!body.productId) {
      throw new ValidationError("Product ID is required");
    }
    if (!body.quantity || body.quantity <= 0) {
      throw new ValidationError("Quantity must be greater than 0");
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

    if (product.stock < body.quantity) {
      throw new ValidationError("Insufficient stock");
    }

    // find cart of user
    let cart = await db.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      // create cart if not exists
      cart = await db.cart.create({
        data: { userId }
      });
    }

    // check if product is in cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: body.productId
      }
    });

    if (existingItem) {
      // update quantity
      const updatedItem = await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + body.quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
              stock: true
            }
          }
        }
      });

      return {
        status: "success",
        message: "Item quantity updated in cart",
        data: updatedItem
      };
    } else {
      // add new item
      const newItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: body.productId,
          quantity: body.quantity
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
              stock: true
            }
          }
        }
      });

      return {
        status: "success",
        message: "Item added to cart",
        data: newItem
      };
    }
  } catch (error) {
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async ({ 
  params, 
  body, 
  store 
}: { 
  params: { id: string }, 
  body: UpdateCartItemBody, 
  store?: Store 
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("Item ID is required");
    }
    if (!body.quantity || body.quantity <= 0) {
      throw new ValidationError("Quantity must be greater than 0");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    const itemId = parseInt(params.id);

    // check if item is in cart of user
    const cartItem = await db.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId }
      },
      include: {
        product: true
      }
    });

    if (!cartItem) {
      throw new NotFoundError("Cart item not found");
    }

    if (cartItem.product.stock < body.quantity) {
      throw new ValidationError("Insufficient stock");
    }

    if (cartItem.quantity + body.quantity > cartItem.product.stock) {
      throw new ValidationError("Insufficient stock");
    }

    if (cartItem.quantity + body.quantity < 0) {
        const deletedItem = await db.cartItem.delete({
            where: { id: itemId }
        });
        return {
            status: "success",
            message: "Cart item deleted",
        };
    }

    // update quantity
    const updatedItem = await db.cartItem.update({
      where: { id: itemId },
      data: { quantity: body.quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            stock: true
          }
        }
      }
    });

    return {
      status: "success",
      message: "Cart item updated",
      data: updatedItem
    };
  } catch (error) {
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async ({ 
  params, 
    store 
}: { 
  params: { id: string }, 
  store?: Store 
}) => {
  try {
    if (!params.id) {
      throw new ValidationError("Item ID is required");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const itemId = parseInt(params.id);

    // check if item is in cart of user
    const cartItem = await db.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId }
      }
    });

    if (!cartItem) {
      throw new NotFoundError("Cart item not found");
    }

    // delete item
    await db.cartItem.delete({
      where: { id: itemId }
    });

    return {
      status: "success",
      message: "Item removed from cart"
    };
  } catch (error) {
    throw error;
  }
};

// Clear cart
export const clearCart = async ({ store }: { store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    // find cart of user
    const cart = await db.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new NotFoundError("Cart not found");
    }

    // delete all items in cart
    await db.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return {
      status: "success",
      message: "Cart cleared"
    };
  } catch (error) {
    throw error;
  }
};

// Get cart total
export const getAllCartTotal = async ({ store }: { store?: Store }) => {
  try {
    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }

    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                price: true
              }
            }
          }
        }
      }
    });

    if (!cart) {
      return {
        status: "success",
        data: {
          total: 0,
          itemCount: 0
        }
      };
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const itemCount = cart.items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    return {
      status: "success",
      data: {
        total,
        itemCount
      }
    };
  } catch (error) {
    throw error;
  }
};

export const selectCartItem = async ({ body, store }: { body: SelectCartItemBody, store?: Store }) => {
  try {
    if (!body.itemIds) {
      throw new ValidationError("Item ID is required");
    }
    if (!body.itemIds.length) {
      throw new ValidationError("Item must select at least one");
    }

    const userId = store?.userId;
    if (!userId) {
      throw new ValidationError("User not authenticated");
    }
    const selectedItems = await db.cartItem.findMany({
        where: {id: {in: body.itemIds}},
        include: {
            product: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    imageUrl: true,
                    stock: true
                }
            },
            cart: {
                select: {
                    id: true,
                    userId: true,
                    items: {
                        select: {
                            id: true,
                            quantity: true
                        }
                    }
                }
            }
        }
    });

    const total = selectedItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);  

    const itemCount = selectedItems.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    return {
        status: "success",
        data: {
            items: selectedItems,
            total,
            itemCount
        }
    };
  } catch (error) {
    throw error;
  }
};


// -----checkout-----


// -----Helper function for validate checkout data-----
const validateCheckoutData = (body: CreateOrderBody, userId: number | undefined) => {
  if (!body.itemIds || !body.itemIds.length) {
    throw new ValidationError("Item IDs are required");
  }
  if (!body.shippingAddress) {
    throw new ValidationError("Shipping address is required");
  }
  if (!body.phone) {
    throw new ValidationError("Phone number is required");
  }
  if (!body.paymentMethod) {
    throw new ValidationError("Payment method is required");
  }
  if (!userId) {
    throw new ValidationError("User not authenticated");
  }
  
  // Validate shipping method if provided
  if (body.shippingMethod && !["STANDARD", "EXPRESS", "OVERNIGHT"].includes(body.shippingMethod)) {
    throw new ValidationError("Invalid shipping method");
  }
};

// -----Helper function to get selected items-----
const getSelectedItems = async (itemIds: number[], userId: number, tx?: any) => {
  const dbClient = tx || db;
  
  const selectedItems = await dbClient.cartItem.findMany({
    where: {
      id: { in: itemIds },
      cart: { userId }
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          stock: true
        }
      }
    }
  });

  if (selectedItems.length === 0) {
    throw new ValidationError("No valid items found");
  }

  return selectedItems;
};

// -----Helper function to check stock-----
const checkStock = (selectedItems: any[]) => {
  for (const item of selectedItems) {
    if (item.product.stock < item.quantity) {
      throw new ValidationError(`Insufficient stock for product: ${item.product.name}`);
    }
  }
};

// Helper function to calculate total
const calculateTotal = (selectedItems: any[]) => {
  return selectedItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
};

export const previewCheckout = async ({ body, store }: { body: CreateOrderBody, store?: Store }) => {
  try {
    const userId = store?.userId;
    validateCheckoutData(body, userId);

    // Get selected items
    const selectedItems = await getSelectedItems(body.itemIds, userId!);
    
    // Check stock
    checkStock(selectedItems);
    
    // Calculate total price
    const total = calculateTotal(selectedItems);

    return {
      status: "success",
      message: "Preview checkout successfully",
      data: {
        selectedItems,
        total
      }
    };
  } catch (error) {
    throw error;
  }
};

// -----Checkout-----

export const checkout = async ({ body, store }: { body: CreateOrderBody, store?: Store }) => {
  try {
    const userId = store?.userId;
    validateCheckoutData(body, userId);

    // Start Transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Get selected items
      const selectedItems = await getSelectedItems(body.itemIds, userId!, tx);

      // 2. Check stock
      checkStock(selectedItems);

      // 3. Calculate subtotal
      const subtotal = calculateTotal(selectedItems);
      
      // 4. Calculate shipping cost (Backend calculation!)
      const shippingInfo = calculateShippingCost(
        body.shippingMethod || "STANDARD",
        subtotal
      );
      
      const total = subtotal + shippingInfo.cost;

      // 5. Process Payment
      const paymentResult = processPayment(
        body.paymentMethod as any,
        total,
        body.shippingMethod || "STANDARD"
      );

      // For COD, allow pending status
      if (paymentResult.status !== "SUCCESS" && body.paymentMethod !== "CASH_ON_DELIVERY") {
        throw new ValidationError(`Payment failed: ${paymentResult.message}`);
      }

      // 6. Create Order 
      const order = await tx.order.create({
        data: {
          userId: userId!,
          total,
          status: "PENDING"
        }
      });

      // 7. Create OrderItems
      const orderItems = await Promise.all(
        selectedItems.map((item: any) =>
          tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            }
          })
        )
      );

      // 8. Delete selected items from cart
      await tx.cartItem.deleteMany({
        where: {
          id: { in: body.itemIds }
        }
      });

      // 9. Update stock of products
      await Promise.all(
        selectedItems.map((item: any) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        )
      );

      // 10. Create Shipping record
      await tx.shipping.create({
        data: {
          orderId: order.id,
          address: body.shippingAddress,
          phone: body.phone,
          method: shippingInfo.method, // Use calculated method name
          cost: shippingInfo.cost, // Use calculated cost (secure!)
          status: "PENDING",  
          shippedAt: new Date(),
          deliveredAt: new Date(new Date().getTime() + shippingInfo.duration * 24 * 60 * 60 * 1000)
        }
      });

      return {
        order,
        orderItems,
        total,
        shippingInfo,
        paymentResult
      };
    });

    // Schedule auto-confirm after 5 seconds
    setTimeout(async () => {
      try {
        await db.order.update({
          where: { id: result.order.id },
          data: { status: "CONFIRMED" }
        });
        console.log(`Order ${result.order.id} auto-confirmed after 5 seconds`);
      } catch (error) {
        console.error(`Failed to auto-confirm order ${result.order.id}:`, error);
      }
    }, 5000); 

    return {
      status: "success",
      message: "Order created successfully",
      data: {
        orderId: result.order.id,
        total: result.total,
        itemCount: result.orderItems.length,
        shippingInfo: result.shippingInfo,
        paymentResult: result.paymentResult
      }
    };
  } catch (error) {
    throw error;
  }
};
        