import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || null;
  const userCookie = request.cookies.get('user')?.value || null;

  const url = request.nextUrl;
  const pathname = url.pathname;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // Not logged in → block admin
  if (isAdminRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → block login/register
  if (isAuthPage && token && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      const redirectUrl = user.role === 'admin' ? '/admin' : '/';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  // Only admins may access /admin
  if (isAdminRoute && userCookie) {
    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
