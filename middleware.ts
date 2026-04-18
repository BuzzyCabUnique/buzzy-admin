import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/auth';

const protectedPrefixes = ['/dashboard', '/rides', '/users', '/drivers', '/payments', '/subscriptions', '/support'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get(ADMIN_SESSION_COOKIE)?.value === 'authenticated';
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (pathname === '/') {
    return NextResponse.redirect(new URL(isAuthenticated ? '/dashboard' : '/login', request.url));
  }

  if (pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/rides/:path*', '/users/:path*', '/drivers/:path*', '/payments/:path*', '/subscriptions/:path*', '/support/:path*'],
};
