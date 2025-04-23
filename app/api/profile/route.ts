import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";
import {dbConnect, dbDisconnect} from "@/app/utils/connectiondb" //Conexión con MongoDB
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";
import { ProfileTemplateSchema } from "@/app/utils/profileValidation";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(){
    try{
        // 1. Conectar con la base de datos
        await dbConnect();

        // 2. Obtener el token la cookie 
        const token = (await cookies()).get("ticscodeToken")?.value;

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

        const profile = await Usuario.findById(id_usuario);
        
        if(!profile){
            return NextResponse.json({message: "Profile not found"}, {status:404});
        }

        return NextResponse.json(profile);

    }catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    finally {
        await dbDisconnect(); // Close database connection (only in production)
    }
    
}

export async function PUT(req: NextRequest){
    try{
        //1. Validate token 
        const token = req.cookies.get("ticscodeToken")?.value;

        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }   
        
        //2. Verify the JWT token
        const decoded= jwt.verify(token, JWT_SECRET) as JwtPayload;

        if(!decoded){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //2. Get body request
        const body = await req.json();

        //3. Validate data 
        const validation = ProfileTemplateSchema.safeParse(body);

        if(!validation.success){
            return NextResponse.json({errors: validation.error.errors}, {status:400});
        }

        //4. Connect to database
        await dbConnect();

        const {email, ...updateData } = body;

        //5. Find and update user profile
        const updateUser = await Usuario.findOneAndUpdate({email}, updateData, {new:true});

        if(!updateUser){
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(updateUser);

    }catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}