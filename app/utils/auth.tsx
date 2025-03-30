import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function authMiddleware (req: NextRequest){
    try{

        //1. Get token from cookies
        const token = req.cookies.get("ticscodeToken")?.value;

        if(!token){
            return NextResponse.json({error: "Unauthorized"}, {status:401});
        }
        
        //2. Verify the JWT token
        const decoded= jwt.verify(token, JWT_SECRET) as JwtPayload;

        req.headers.set("x-user-nombres", decoded.nombres);
        req.headers.set("x-user-apellidos", decoded.apellidos);

        return NextResponse.json({error: decoded}, {status:200});

    }catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}