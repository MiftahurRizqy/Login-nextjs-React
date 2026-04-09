import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signJwt } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Max 5 requests per 60 seconds (1 minute)
    const { success, headers } = checkRateLimit(ip, 5, 60000);

    // Artificial delay to allow loading animation to be visible beautifully
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!success) {
      return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429, headers });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400, headers });
    }

    let user;
    let isPasswordValid = false;

    try {
      // 1. Coba koneksi ke Database (Berfungsi sempurna di Localhost XAMPP)
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401, headers });
      }
      isPasswordValid = await bcrypt.compare(password, user.password);

    } catch (dbError) {
      // 2. FALLBACK MODE: Jika berjalan di Vercel tanpa Cloud DB (Koneksi localhost ditolak)
      console.warn("Database connection failed. Falling back to Demo Mode.", dbError);
      
      if (email === 'admin@example.com' && password === 'password123') {
        user = { id: 999, email: 'admin@example.com' };
        isPasswordValid = true;
      } else {
        return NextResponse.json({ 
          error: 'Invalid email or password. (Demo Mode: use admin@example.com / password123)' 
        }, { status: 401, headers });
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401, headers });
    }

    // Create JWT
    const token = signJwt({ userId: user.id, email: user.email });

    // Set cookie
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200, headers });
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
