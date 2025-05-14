// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define rutas que necesitan autenticación
const protectedRoutes = [
    '/dashboard',
    '/dashboard/competitions',
    '/dashboard/teams',
    '/dashboard/drivers',
    '/dashboard/races',
    '/dashboard/tracks',
];

// Define rutas públicas de autenticación
const authRoutes = ['/login', '/registro'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // Verificar si la ruta requiere autenticación
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname === route);

    // Si es una ruta protegida y no hay token, redirigir a login
    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
    }

    // Si es una ruta de autenticación y hay token, redirigir al dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, videos, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|images|videos|fonts).*)',
    ],
};