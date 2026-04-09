export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateLoginForm(email?: string, password?: string): string | null {
  if (!email) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email format';
  }

  if (!password) {
    return 'Password is required';
  }

  return null; // Return null if valid
}
