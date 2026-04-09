import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: standard jsonwebtoken doesn't work in Edge runtime.
// For simplicity in this challenge, we will simply check if the cookie exists.
// In a real prod app, use `jose` to properly verify the token signature in edge middleware,
// or verify it in a Nextx API route and return custom headers.

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
