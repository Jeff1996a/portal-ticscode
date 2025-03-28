import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";
import { loginValidationSchema } from "@/app/utils/loginValidation";
import { dbConnect, dbDisconnect } from "@/app/utils/connectiondb";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    try{
        //1. Obtener las credenciales de acceso enviadas por el cliente
        const body = await req.json();

        //2. Validar los datos enviados por el cliente con zod
        const datos_validados = loginValidationSchema.safeParse(body);

        if (!datos_validados.success) {
            return NextResponse.json(
              { errors: datos_validados.error.format() },
              { status: 400 }
            );
        }

        const{
            email,
            password
        } = datos_validados.data;

        //3. Conectar con la base de datos 
        await dbConnect();

        //4. Verificar si el usuario existe en la base de datos
        const usuario_verificado = await Usuario.findOne({email: email});

        if (!usuario_verificado) {
            return NextResponse.json({ message: "Invalid credentials"}, {status:400});
        }

        const isMatch = await usuario_verificado.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials"}, {status:400});
        }

        //5. Generar JWT token
        //const token = jwt.sign({ userId: usuario_verificado._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        //6. Retornar una respuesta exitosa con el token
        return NextResponse.json({ message: "Login Sucessful"},{status:200});
    }
    catch (error: any) {
            if (error.name === "ZodError") {
              return NextResponse.json({ errors: error.errors},{status:400});
            }
            return NextResponse.json({ message: "Internal server error" },{status:500});
    }
    finally {
        await dbDisconnect(); // Close database connection (only in production)
    }
}