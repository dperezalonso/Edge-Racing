// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configuración para desarrollo
const DEV_MODE = process.env.NODE_ENV === 'development';
const BYPASS_AUTH_IN_DEV = true; // Cambiar a false cuando quieras probar la autenticación en desarrollo

// Define rutas que necesitan autenticación
const protectedRoutes: any[] = [
   
];

// Define rutas públicas de autenticación
const authRoutes = ['/login', '/registro'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // IMPORTANTE: En modo desarrollo con bypass activado, permitir acceso a todas las rutas
    if (DEV_MODE && BYPASS_AUTH_IN_DEV) {
        console.log(`[DEV MODE] Acceso permitido a ruta protegida: ${pathname}`);
        return NextResponse.next();
    }
    
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
        return NextResponse.redirect(new URL('', request.url));
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