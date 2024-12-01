'use client';
import RegisterForm from "@/app/components/forms/register-form";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import Image from "next/image";
   
  export default function RegisterCard() {
    return (
      <div className="relative w-full flex h-screen content-center items-center justify-center">
        <Card className="w-96 border border-green-500 md:w-2/4 content-center items-center " placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardHeader
                  variant="gradient"
                  color="white"
                  className="sm:w-1/2 w-1/2 grid h-28 place-items-center border border-green-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Typography variant="h3" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Image
                            className="h-100 w-100 mt-0 mb-0 mx-auto object-cover object-center opacity-90"
                            src="/img/logo-no-background.png"
                            width={250}
                            height={250}
                            alt="logo image"/>
            </Typography>
          </CardHeader>
          <CardBody className="relative flex flex-col gap-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Typography
                          as="a"
                          href="#signup"
                          variant="h4"
                          color="green"
                          className="ml-1 font-bold text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Crear cuenta
            </Typography>
            <RegisterForm></RegisterForm> 
          </CardBody>
          <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            
            <Typography variant="small" className="mt-2 flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Don&apos;t have an account?
              <Typography
                          as="a"
                          href="/login"
                          variant="small"
                          color="green"
                          className="ml-1 font-bold" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      
    );
  }