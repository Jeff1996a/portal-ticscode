'use client';
import { Button, Checkbox, Input, Typography} from "@material-tailwind/react";
import React from "react";

export default function RegisterForm(){

    return(
        <>
           
           <form id="formularioRegistro" className="gap-2 md:grid md:grid-cols-2">
              <div className="mt-2">
                <Input label="Nombres" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
              </div>
              <div className="mt-2">
                <Input label="Apellidos" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
              </div>
              
              <div className="mt-2">
                <Input type="date" label="Fecha de nacimiento" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />       
              </div>
              <div className="md:col-span-2 mt-2" >
                <Input label="Email" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
              </div>
              <div className="mt-2">
                <Input  type="password" label="Contraseña" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
              </div>
              <div className="mt-2">
                <Input type="password" label="Repetir contraseña" size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
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
                  containerProps={{ className: "-ml-2.5" }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}              />
              </div>
              <div className="w-full justify-center text-center content-center col-span-2">
                <Button variant="gradient" color="green" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Registrarse
                </Button>
              </div>
            </form>
        </>
    );
}