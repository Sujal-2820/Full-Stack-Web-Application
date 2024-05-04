// src/middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || "";

  // Allow access to /signup and /signin without a token
  if (pathname === '/signup' || pathname === '/signin') {
    return NextResponse.next();
  }

  // If there's no token and the user tries to access /dashboard, redirect to /signin
  if (!token && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }

  // If there's no token, redirect to the home page for any other path
  if (!token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If a token exists, allow the user to proceed to the requested URL
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/signin', '/signup'],
};