import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("session_token");
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname.startsWith('/login') && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
}
export const config: MiddlewareConfig = {
    matcher: ['/dashboard/:path*', '/login']
}