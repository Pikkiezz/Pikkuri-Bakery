// Validation utilities

/**
 * Validates Thai phone number format
 * Supports: 0812345678, +66812345678, 08123456789
 */
export const validatePhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  
  // Remove all spaces and dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Thai phone number regex
  const phoneRegex = /^(\+66|0)[0-9]{8,9}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * Minimum 8 characters, at least 1 letter and 1 number
 */
// export const validatePassword = (password: string): boolean => {
//   if (!password) return false;
  
//   // อย่างน้อย 8 ตัวอักษร
//   return password.length >= 8;
// };

/**
 * Validates Thai ID number (13 digits)
 */
export const validateThaiId = (id: string): boolean => {
  if (!id) return false;
  
  // Remove all non-digits
  const cleanId = id.replace(/\D/g, '');
  
  // Must be exactly 13 digits
  if (cleanId.length !== 13) return false;
  
  // Thai ID validation algorithm
  const digits = cleanId.split('').map(Number);
  let sum = 0;
  
  for (let i = 0; i < 12; i++) {
    sum += digits[i]! * (13 - i);
  }
  
  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === digits[12]!;
};
