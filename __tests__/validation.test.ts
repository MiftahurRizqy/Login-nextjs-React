import { validateLoginForm, isValidEmail } from '@/lib/validation';

describe('Login Form Validation', () => {
  describe('isValidEmail', () => {
    it('returns true for a valid email', () => {
      expect(isValidEmail('admin@example.com')).toBe(true);
      expect(isValidEmail('test.user@domain.co.id')).toBe(true);
    });

    it('returns false for an invalid email', () => {
      expect(isValidEmail('admin@example')).toBe(false);
      expect(isValidEmail('admin_example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('validateLoginForm', () => {
    it('returns error if email is missing', () => {
      expect(validateLoginForm('', 'password123')).toBe('Email is required');
      expect(validateLoginForm(undefined, 'password123')).toBe('Email is required');
    });

    it('returns error if email is invalid format', () => {
      expect(validateLoginForm('invalid-email', 'password123')).toBe('Please enter a valid email format');
    });

    it('returns error if password is missing', () => {
      expect(validateLoginForm('admin@example.com', '')).toBe('Password is required');
      expect(validateLoginForm('admin@example.com', undefined)).toBe('Password is required');
    });

    it('returns null if both email and password are valid', () => {
      expect(validateLoginForm('admin@example.com', 'password123')).toBeNull();
    });
  });
});
