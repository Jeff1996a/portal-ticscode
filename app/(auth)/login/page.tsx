'use client';
import LoginForm from "@/app/components/forms/login-form";
import { LoginValidationProps, loginValidationSchema } from "@/app/utils/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
   
  export default function LoginCard() {
    const {reset, handleSubmit, register,getValues, formState: { errors },
     } = useForm<LoginValidationProps>({
    resolver: zodResolver(loginValidationSchema)});

    return (
      <div className="relative w-full flex h-screen content-center items-center justify-center">
        <Card className="w-96 border border-green-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardHeader
                    variant="gradient"
                    color="white"
                    className="mb-2 grid h-28 place-items-center border border-green-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Typography variant="h3" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Image
                              className="h-100 w-100 mt-0 mb-0 mx-auto object-cover object-center opacity-90"
                              src="/img/logo-no-background.png"
                              width={250}
                              height={250}
                              alt="logo image"/>
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Typography
                            as="a"
                            href="#signup"
                            variant="h4"
                            color="green"
                            className="ml-1 font-bold text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
                  Portal TicsCode
                </Typography>
                <LoginForm></LoginForm>
            </CardBody>
            <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Typography variant="small" className="mt-6 flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Don&apos;t have an account?
                <Typography
                            as="a"
                            href="/register"
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