export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatZip(value: string): string {
  return value.replace(/\D/g, "").slice(0, 5);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidCardNumber(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  return digits.length >= 15 && digits.length <= 16;
}

export function isValidExpiry(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = parseInt(`20${match[2]}`, 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month);
  return exp > now;
}

export function isValidCvv(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

export interface FieldError {
  field: string;
  message: string;
}

export function validateShippingForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}): FieldError[] {
  const errors: FieldError[] = [];
  if (!data.firstName.trim()) errors.push({ field: "firstName", message: "First name is required" });
  if (!data.lastName.trim()) errors.push({ field: "lastName", message: "Last name is required" });
  if (!isValidEmail(data.email)) errors.push({ field: "email", message: "Valid email is required" });
  if (data.phone.replace(/\D/g, "").length < 10)
    errors.push({ field: "phone", message: "Valid phone number is required" });
  if (!data.address.trim()) errors.push({ field: "address", message: "Address is required" });
  if (!data.city.trim()) errors.push({ field: "city", message: "City is required" });
  if (!data.state.trim()) errors.push({ field: "state", message: "State is required" });
  if (data.zip.length < 5) errors.push({ field: "zip", message: "Valid ZIP code is required" });
  return errors;
}
