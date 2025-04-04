"use client";
import { ComplexNavbar } from "./navbar";
import SideNav from "./sidenav";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden ">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      
      <div className="flex-grow p-2 md:overflow-y-auto md:p-2">
        <ComplexNavbar></ComplexNavbar>
        <br></br>
        <div className="mt-0">
        {children}
        </div>
      </div>
    </div>
  );
}