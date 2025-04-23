// app/dashboard/page.tsx
"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHome() {
 
    return (
                <>
                    <div className="container mx-auto mt-0">
                       
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
