// api/logout/route.ts
import {NextResponse} from "next/server";

export async function POST(){
    const response = NextResponse.json({message: "Logged out"}, {status:200});
    response.headers.set("Set-Cookie", "ticscodeToken=; HttpOnly; Path=/; Max-Age=0");
    return response;
}