import {NextRequest, NextResponse} from "next/server";
import { Usuario } from "@/app/types/usuario"
import {conn} from "@/app/utils/connectiondb"
import { ObjectId } from "mongodb";

//Obtener lista de usuarios
export async function GET(request: NextRequest){

    const searchParams = request.nextUrl.searchParams;

    const id_usuario = searchParams.get('id')

    try {
        await conn.connect();

        // Choose a name for your database
        const database = conn.db("ticscodeApp");

        // Choose a name for your document
        const collection = database.collection("usuario");

        //Select all users if url params is null
        if(id_usuario == null){
            const usuarios = await collection.find({}).toArray();
            return NextResponse.json(usuarios);
        }
        //Select a user is url params is not null
        else{
            const usuario = await collection.find({_id: new ObjectId(id_usuario)}).toArray();

            return NextResponse.json(usuario[0]);   
        }  

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" });
    } finally {
        await conn.close();
    }
}

//Insert a user in document usuarios
export async function POST(request: NextRequest){

        const userData = await request.json();

        try {
            await conn.connect();
    
            // Choose a name for your database
            const database = conn.db("ticscodeApp");
    
            // Choose a name for your collection
            const collection = database.collection("usuario");
            const result = await collection.insertOne(userData);

            if(result != 0){
                return NextResponse.json({message:"Registro ingresado correctamente"});
            }
            else{
                return NextResponse.json({message:"Error al ingresar el registro"});
            }   
    
        } catch (error) {
            return NextResponse.json({ message: "Something went wrong!" });
        } finally {
            await conn.close();
        }
}

//Update user information
export async function PUT(request: NextRequest){

    const userData = await request.json();

    try {
        await conn.connect();

        // Choose a name for your database
        const database = conn.db("ticscodeApp");

        // Choose a name for your collection
        const collection = database.collection("usuario");
        const result = await collection.updateOne({_id: new ObjectId(userData._id) },
        {$set:{
                      nombres:userData.nombres,
                apellidos:userData.apellidos,
                fecha_nacimiento: userData.fecha_nacimiento,
                email: userData.email,
                telefono: userData.telefono,
                cedula:userData.cedula,
                id_empresa: userData.id_empresa
            }
        });

  if(result != 0){
            return NextResponse.json({message:"Registro actualizado correctamente"});
        }
        else{
            return NextResponse.json({message:"Error al ingresar el registro"});
        }   

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" });
    } finally {
        await conn.close();
    }
}

//Delete user information
export async function DELETE(request: NextRequest){

    const userData = await request.json();

    try {
        await conn.connect();

        // Choose a name for your database
        const database = conn.db("ticscodeApp");

        // Choose a name for your collection
        const collection = database.collection("usuario");
        const result = await collection.deleteOne({_id: new ObjectId(userData._id) });
  if(result != 0){
            return NextResponse.json({message:"Registro eliminado correctamente"});
        }
        else{
            return NextResponse.json({message:"Error al eliminar el registro"});
        }   

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" });
    } finally {
        await conn.close();
    }
}




