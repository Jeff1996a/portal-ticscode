import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";
import {dbConnect, dbDisconnect} from "@/app/utils/connectiondb" //Conexión con MongoDB
import jwt, { JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest){
    try{
        // 1. Conectar con la base de datos
        await dbConnect();

        // 2. Obtener el token la cookie 
        const token = req.cookies.get("ticscodeToken")?.value;

        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }   
        
        //2. Verify the JWT token
        const decoded= jwt.verify(token, JWT_SECRET) as JwtPayload;

        if(!decoded){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 3. Obtener el id de 
        const id_usuario = decoded.id;

        if(!id_usuario){
            return NextResponse.json({message: "User ID is required"}, {status:404});
        }

        const profile_data = await Usuario.findOne({_id:id_usuario});
        
        if(!profile_data){
            return NextResponse.json({message: "Profile not found"}, {status:404});
        }

        return NextResponse.json(profile_data);
    }catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    finally {
        await dbDisconnect(); // Close database connection (only in production)
    }
    
}