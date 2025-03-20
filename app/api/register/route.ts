//app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";
import { registerTemplateSchema } from "@/app/utils/registerValidation";
import {connectToDatabase} from "@/app/utils/connectiondb" //Conexión con MongoDB

//Método para registrar un usuario
export async function POST(request: NextRequest){
    try{
        // Parse the request body (expected as JSON)
        const body = await request.json();

        //1. Validar los datos entrantes con zod
        const datos_validados = registerTemplateSchema.parse(body);

        //2. Conectar con la base de datos 
        await connectToDatabase();

        //4. Verificar si el usuario existe en la base de datos
        const usuario_verificado = await Usuario.findOne({email: datos_validados.email});
        
        if (usuario_verificado) {
            return NextResponse.json({ message: "User with this email already exists"}, {status:400});
        }
            
        const nuevo_usuario = new Usuario({
            nombres:datos_validados.nombres,
            apellidos:datos_validados.apellidos,
            fecha_nacimiento: datos_validados.fechaNacimiento,
            email: datos_validados.email,
            telefono: "111-111-1111",
            cedula: "1111111111",
            rol: "cliente",
            estado: "offline",
            password: datos_validados.password,
            politica: datos_validados.politica
        })        
        
        await nuevo_usuario.save();

        // 6. Retornar una respuesta
        return NextResponse.json({ message: "Registro exitoso"},{status:200});
    }
    catch (error: any) {
        if (error.name === "ZodError") {
          return NextResponse.json({ errors: error.errors},{status:400});
        }
        return NextResponse.json({ message: "Internal server error" },{status:500});
    }
}
