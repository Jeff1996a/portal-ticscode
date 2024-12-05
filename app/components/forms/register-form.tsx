'use client';
import { RegisterTemplateProps, registerTemplateSchema } from "@/app/types/zodValidation/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Typography} from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";


export default function RegisterForm(){

    const {reset, handleSubmit, register, formState: { errors },
        } = useForm<RegisterTemplateProps>({
        resolver: zodResolver(registerTemplateSchema)});
    
    const submitForm = async (data:RegisterTemplateProps) =>{ 
      console.log(data)
      alert(JSON.stringify(data))
      reset();
    };
    
    return(
        <>
           <form id="formularioRegistro" onSubmit={handleSubmit(submitForm)} className="gap-2 md:grid md:grid-cols-2">
              <div className="mt-2">
                <Input label="Nombres"  {...register("nombres")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.nombres && <span className="text-red-500 text-xs">{errors.nombres.message}</span>}
              </div>
              <div className="mt-2">
                <Input label="Apellidos" {...register("apellidos")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.apellidos && <span className="text-red-500 text-xs">{errors.apellidos.message}</span>}
              </div>
              
              <div className="mt-2">
                <Input type="date" label="Fecha de nacimiento" {...register("fechaNacimiento")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />       
                {errors?.fechaNacimiento && <span className="text-red-500 text-xs">{errors.fechaNacimiento.message}</span>}
              </div>
              <div className="md:col-span-2 mt-2" >
                <Input label="Email" size="md" {...register("email")}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="mt-2">
                <Input  type="password" label="Contraseña" {...register("password")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>
              <div className="mt-2">
                <Input type="password" {...register("confirmPassword")}  label="Repetir contraseña" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
              </div>
              <div className="-ml-2.5 w-full col-span-2">
                <Checkbox
                  label={<Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>}
                  containerProps={{ className: "-ml-2.5" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}   required           />
              </div>
              <div className="w-full justify-center text-center content-center col-span-2">
                <Button type="submit" variant="gradient" color="green" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Registrarse
                </Button>
              </div>
            </form>
        </>
    );
}


