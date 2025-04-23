//app/dashboard/profile/page.tsx
"use client";
import ProfileForm from "@/app/components/forms/profile-form";

export default function DashboardProfile(){
       
    return (
                <>
                    <div className="container mx-auto mt-0">
                        <div className="bg-gray-50 text-2xl mt-4 p-2 text-green-500 rounded-lg">
                            Mi Perfil
                            <hr color="green"></hr>
                        </div>
                        <div className="bg-gray-50 p-6 mt-4">
                            <ProfileForm></ProfileForm>            
                        </div>              
                    </div>
                                    
                 </>
    );
                
       
}

        
