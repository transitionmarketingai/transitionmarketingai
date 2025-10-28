/**
 * Phone number utilities for Indian format
 */

/**
 * Format phone number to Indian format (+91 XXXXX XXXXX)
 */
export function formatIndianPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 91, remove it (we'll add it back)
  const withoutCountryCode = digits.startsWith('91') && digits.length === 12
    ? digits.slice(2)
    : digits;
  
  // Must be 10 digits
  if (withoutCountryCode.length !== 10) {
    return phone; // Return original if invalid
  }
  
  // Format as +91 XXXXX XXXXX
  const part1 = withoutCountryCode.slice(0, 5);
  const part2 = withoutCountryCode.slice(5, 10);
  
  return `+91 ${part1} ${part2}`;
}

/**
 * Get clean phone number (digits only with country code)
 */
export function getCleanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  
  // If 10 digits, add 91
  if (digits.length === 10) {
    return `91${digits}`;
  }
  
  // If 12 digits and starts with 91, return as is
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  
  // If already has country code, return as is
  return digits;
}

/**
 * Validate Indian phone number
 */
export function isValidIndianPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  
  // Should be 10 digits (without country code) or 12 digits (with 91)
  if (digits.length === 10) {
    // First digit should be 6-9
    return /^[6-9]\d{9}$/.test(digits);
  }
  
  if (digits.length === 12 && digits.startsWith('91')) {
    const withoutCountryCode = digits.slice(2);
    return /^[6-9]\d{9}$/.test(withoutCountryCode);
  }
  
  return false;
}

/**
 * Extract country code from phone
 */
export function getCountryCode(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length >= 12) {
    return '+91';
  }
  return '+91'; // Default to India
}

