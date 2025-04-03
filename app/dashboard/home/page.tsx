// app/dashboard/page.tsx
"use client"
import Clock from "@/app/components/ui/clock/clock";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHome() {
    const [nombres, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("")
    const router = useRouter();

    useEffect (() =>{
        //Define async function to fetch data
        const fetch_data = async() =>{
        try{
            //Make the api request
            const response = await  fetch("/api/profile", { credentials: "include" });
            if(!response.ok){
            throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setNombre(result.nombres)
            setApellidos(result.apellidos)
        }catch(error){
            console.log(error);
            router.push("/login"); // Redirect if unauthorized
        }
        };
        fetch_data();
    },[router]);
  
    return (
                <>
                    <div className="container mx-auto mt-0">
                        <div className="bg-gray-50 w-full rounded-lg p-2 text-blue-gray-500">
                            <p>Bienvenido,{nombres} {apellidos}</p>
                            <Clock></Clock>
                        </div>
                        <div className="bg-gray-50 text-2xl mt-4 p-2 text-green-500 rounded-lg">
                            Conoce nuestros servicios
                            <hr color="green"></hr>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            
                        </div>
                        
                    </div>
                    
                </>
    );
}
