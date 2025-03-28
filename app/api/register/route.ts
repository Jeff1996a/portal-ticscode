//app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/app/models/usuario";
import { registerTemplateSchema } from "@/app/utils/registerValidation";
import {dbConnect, dbDisconnect} from "@/app/utils/connectiondb" //Conexión con MongoDB
import { validarCedula } from "@/app/utils/validarCedula";

//Método para registrar un usuario
export async function POST(request: NextRequest){
    try{
        // Parse the request body (expected as JSON)
        const body = await request.json();

        //1. Validar los datos entrantes con zod
        const datos_validados = registerTemplateSchema.safeParse(body);

        if (!datos_validados.success) {
            return NextResponse.json(
              { errors: datos_validados.error.format() },
              { status: 400 }
            );
        }

        const{
            nombres,
            apellidos,
            fechaNacimiento,
            email,
            telefono,
            countryCode,
            password,
            cedula,
            politica
        } = datos_validados.data;

        //2. Conectar con la base de datos 
         await dbConnect();

        //4. Verificar si el usuario existe en la base de datos
        const usuario_verificado = await Usuario.findOne({email: email});
        
        if (usuario_verificado) {
            return NextResponse.json({ message: "User already exists"}, {status:400});
        }

        if(!validarCedula(cedula)){
            return NextResponse.json({ message: "Documento de identidad no válido"}, {status:400});
        }
            
        const nuevo_usuario = new Usuario({
            nombres:nombres,
            apellidos:apellidos,
            fecha_nacimiento: fechaNacimiento,
            email: email,
            telefono:telefono,
            codigo_pais: countryCode,
            cedula: cedula,
            rol: "cliente",
            estado: "offline",
            password: password,
            politica: politica
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
    finally {
        await dbDisconnect(); // Close database connection (only in production)
    }
}
