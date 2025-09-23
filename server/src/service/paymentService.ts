import type { PaymentMethod, PaymentResult } from "../types/types.js";
import { methodsShipping } from "./shippingService.js";
import { ValidationError } from "../../utils/errors.js";

// simulate delivery date 
const getDeliveryDate = (days: number): Date => {
  const today = new Date();
  today.setDate(today.getDate() + days);
  return today;
};

const durationShipping = (shippingMethod: string): number => {
  return methodsShipping[shippingMethod as keyof typeof methodsShipping].duration;
};

export const processPayment = (
  method: PaymentMethod,
  amount: number,
  shippingMethod: string
): PaymentResult => {
  if (!shippingMethod) {
    throw new ValidationError("Shipping method is required");
  }
  const today = new Date();
  const deliveryDate = getDeliveryDate(durationShipping(shippingMethod));
  const deliveryDateString = deliveryDate.toLocaleDateString();

  if (method === "CASH_ON_DELIVERY") {
    const isDeliveryDay = today.toDateString() === deliveryDate.toDateString();

    return {
      method,
      amount,
      status: isDeliveryDay ? "SUCCESS" : "PENDING",
      message: isDeliveryDay
        ? `COD success! please pay ${amount} baht with the delivery staff`
        : `COD pending! waiting for delivery ${amount} baht will be delivered on ${deliveryDateString}`,
      deliveryDate: deliveryDateString,
    };
  }

  // other method: just give success
  return {
    method,
    amount,
    status: "SUCCESS",
    message: `${method} success! payment successful ${amount} baht`,
    deliveryDate: deliveryDateString,
  };
};
