import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isAuthPage = ['/login', '/register'].includes(request.nextUrl.pathname);

  // If there's no token and user is trying to access admin page, redirect to login
  if (isAdminPage && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries to access auth pages, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not admin and tries to access admin page, redirect to home
  if (isAdminPage && user) {
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
