'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidationProps, loginValidationSchema } from "@/app/utils/loginValidation";
import {z} from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogBox } from "../ui/modal/modal";
import { Button, Input } from "@material-tailwind/react";

export default function LoginForm(){
    const[open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register, 
        handleSubmit, 
        setValue,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<LoginValidationProps>({resolver:zodResolver(loginValidationSchema),});

    async function cerrarModal(){
        if(open == true){
            setOpen(false);
        }
    }; 

    const onSubmit = async(values: LoginValidationProps)=>{
        setMessage("");

        try{
            const response = await fetch("api/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(values)
            })

            const responseData = await response.json();

          if (!response.ok) {
            console.log("falling over")
            setOpen(true);
            setMessage(responseData['message']);
            throw new Error(`response status: ${responseData.status}`);
          }
          else
          {
            console.log(responseData['message'])
            setOpen(true);
            setMessage(responseData['message']);
            reset();
          }
        }catch (err) {
            console.error(err);
        }
    };

    return(
        <>
            <form id="formularioLogin" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                    <Input label="Correo electrónico"  {...register("email")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div className="mt-2">
                    <Input type="password" label="Contraseña"  {...register("password")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    {errors?.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <div className="w-full justify-center text-center content-center col-span-2 mt-4">
                    <Button type="submit" variant="gradient" disabled={isSubmitting} color="light-green" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Iniciar sesión
                    </Button>
                </div>
            </form>
            <DialogBox open={open} size={"xs"} message={message} funcion={cerrarModal}></DialogBox> 
        </>
    )
}