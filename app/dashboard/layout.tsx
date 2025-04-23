"use client";
import { useEffect, useState } from "react";
import Clock from "../components/ui/clock/clock";
import { ComplexNavbar } from "./navbar";
import SideNav from "./sidenav";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/solid";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
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
        setNombres(result.nombres);
        setApellidos(result.apellidos);
      }catch(error){
        console.log(error);
        router.push("/login"); // Redirect if unauthorized
      }
    };
    fetch_data();
  },[router]);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      
      <div className="flex-grow p-2 md:overflow-y-auto md:p-2">
        <ComplexNavbar></ComplexNavbar>
        <br></br>
        <div className="bg-gray-50 w-full rounded-lg p-1 text-blue-gray-500">
          <a
            href={usePathname()}
            className="flex grow items-center gap-2 rounded-md hover:bg-sky-100 hover:text-green-600 md:flex-none "
          >
            {usePathname()}
          </a>
          <p>Bienvenido,{nombres} {apellidos}</p>
          <Clock></Clock>
        </div>
        <div className="mt-0">
        {children}
        </div>
      </div>
    </div>
  );
}