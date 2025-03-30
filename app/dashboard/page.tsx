// app/dashboard/page.tsx
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Clock from "../components/ui/clock/clock";

const JWT_SECRET = process.env.JWT_SECRET || "";

export default async function DashboardPage() {
  const token = (await cookies()).get("ticscodeToken")?.value;
  if (!token) {
    return <p>Unauthorized</p>;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload ;
    return (
        <>
            <p>Bienvenido, {decoded.nombres} {decoded.apellidos}</p> 
            <Clock></Clock>          
        </>
    );

  } catch (error) {
    return <p>Invalid token</p>;
  }
}
