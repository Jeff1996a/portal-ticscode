//app/dashboard/profile/page.tsx
import jwt, { JwtPayload } from "jsonwebtoken";
import Clock from "@/app/components/ui/clock/clock";
import { cookies } from "next/dist/server/request/cookies";

const JWT_SECRET = process.env.JWT_SECRET || "";

export default async function DashboardProfile(){

        const token = (await cookies()).get("ticscodeToken")?.value;

        if (!token) {
            return <h1><p>Unauthorized. Please try to login again.</p></h1>;
        }
                
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload ;

            
            return (
                <>
                    <div className="container mx-auto mt-0">
                        <div className="bg-gray-50 w-full rounded-lg p-2 text-blue-gray-500">
                                            <p>Bienvenido, {decoded.nombres} {decoded.apellidos}</p>
                                            <Clock></Clock>
                         </div>
                        <div className="bg-gray-50 text-2xl mt-4 p-2 text-green-500 rounded-lg">
                            Mi Perfil
                            <hr color="green"></hr>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                                            
                        </div>
                                        
                    </div>
                                    
                 </>
            );
                
        } catch (error) {
                return <p>Invalid token</p>;
        }
}

        
