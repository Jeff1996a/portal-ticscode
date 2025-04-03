// app/dashboard/page.tsx
"use client"
import DashboardHome from "./home/page";

export default function DashboardPage() {
  
/*
  useEffect(() => {
     fetch("/api/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
      if (data.error) {
        router.push("/login"); // Redirect if unauthorized
      } else {
        setProfile(data)
        console.log(profile)
      }
    });
  });*/
  
  return (
    <>
      <DashboardHome></DashboardHome>            
    </>
  );
}
