import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-for-challenge-login-2026';

export function signJwt(payload: object, expiresIn: string | number = '1h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn as any });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
