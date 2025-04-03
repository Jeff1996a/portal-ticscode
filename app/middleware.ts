import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function middleware(req:NextRequest) {
    const protectedRoutes = ["/dashboard", "/profile", "/services", "/api/profile"];

    if(protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))){

        //1. Get token from cookies
         const token = req.cookies.get("ticscodeToken")?.value;
        
        if(!token){
            return NextResponse.json({error: "Unauthorized"}, {status:401});
        }
        
        try{        
            //2. Verify the JWT token
            const decoded= jwt.verify(token, JWT_SECRET) as JwtPayload;
        
            return NextResponse.json({message: decoded}, {status:200});
        
        }catch (error) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
             
    }

    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
    matcher: ["/dashboard", "/profile/:path*","/api/:path*"],
  };