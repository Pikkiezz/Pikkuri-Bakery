import { db } from "../db/db.js";
import { ValidationError } from "../../utils/errors.js";

export const methodsShipping = {
    STANDARD: {
        name: "Standard Shipping",
        duration: 5,
        baseCost: 0
    },
    EXPRESS: {
        name: "Express Shipping", 
        duration: 3,
        baseCost: 50
    },
    OVERNIGHT: {
        name: "Overnight Shipping",
        duration: 1,
        baseCost: 100
    }
} as const;

// Calculate shipping cost (Backend only!)
export const calculateShippingCost = (
    method: string,
    orderValue: number
): { method: string; cost: number; duration: number } => {
    // Validate shipping method
    if (!Object.keys(methodsShipping).includes(method)) {
        throw new ValidationError("Invalid shipping method");
    }

    const methodInfo = methodsShipping[method as keyof typeof methodsShipping];
    

    return {
        method: methodInfo.name,
        cost: methodInfo.baseCost,
        duration: methodInfo.duration
    };
};
