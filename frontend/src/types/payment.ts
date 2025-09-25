// Payment related types

export interface CreditCardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface BankTransferDetails {
  bankName: string;
  accountNumber: string;
}

export interface EWalletDetails {
  walletProvider: string;
  accountNumber: string;
}

export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER" | "CASH_ON_DELIVERY" | "E_WALLET";

export interface PaymentResult {
  method: PaymentMethod;
  amount: number;
  status: "SUCCESS" | "PENDING";
  message: string;
  deliveryDate?: string;
}
