import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "./utils/auth";

export async function middleware(req:NextRequest) {
    const protectedRoutes = ["/dashboard", "/profile"];

    if(protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))){
        return authMiddleware(req);
    }

    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
  };