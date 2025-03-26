'use client';
import { RegisterTemplateProps, registerTemplateSchema } from "@/app/utils/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input,Typography} from "@material-tailwind/react";
import Select from "react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { DialogBox } from "../ui/modal/modal";

// Country code options
const countryOptions = [
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

export default function RegisterForm(){
    //Controlar el popup de alerta 
    const[open, setOpen] = React.useState(false);
    const[mensaje, setMensaje] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("+1");
    const [telefono, setPhone] = React.useState("");

    //Validación de los datos del formulario
    const {reset, handleSubmit, setValue, register, formState: { errors },
        } = useForm<RegisterTemplateProps>({
        resolver: zodResolver(registerTemplateSchema)});
  
    const handleCountryChange = (selectedOption: any) => {
      setCountryCode(selectedOption.value);
      setValue("countryCode", selectedOption.value, { shouldValidate: true });
    };

    async function cerrarModal(){
        if(open == true){
            setOpen(false);
        }
    }; 
        
    
    //Función para enviar el formulario de registro
    const submitRegisterForm = async (values :RegisterTemplateProps) =>{ 
      /*
      const formData = new FormData();

      console.log("Registrando usuario");
      console.log(values);

      formData.append("nombres", values.nombres);
      formData.append("apellidos", values.apellidos)
      formData.append("email", values.email);
      formData.append("telefono", values.fechaNacimiento);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      */


      try {
      
          const response = await fetch('/api/register', {
             method: 'POST',
             headers: {
              "Content-Type": "application/json",
             },
             body: JSON.stringify(values),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.log("falling over")
            setOpen(false);
            throw new Error(`response status: ${responseData.status}`);
          }
          else
          {
            console.log(responseData['message'])
            setOpen(true);
            setMensaje("¡Registro exitoso!");
            reset();
          }
      } catch (err) {
          console.error(err);
      }
    };

    return(
        <>
           <form id="formularioRegistro" onSubmit={handleSubmit(submitRegisterForm)} className="gap-2 md:grid md:grid-cols-2">
           <div className="mt-2">
                <Input label="Documento de identidad"  {...register("cedula")}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.cedula && <span className="text-red-500 text-xs">{errors.cedula.message}</span>}
              </div>
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

              <div className="mt-2 md:col-span-2 gap-2 md:grid md:grid-cols-2">
                <div className="mt-2">
                  <Select
                    options={countryOptions}
                    defaultValue={countryOptions[0]}
                    onChange={handleCountryChange}
                    className="text-sm"
                  />
                  {errors?.countryCode && <span className="text-red-500 text-xs">{errors.countryCode.message}</span>}
                </div>
                <div className="mt-2">
                <Input
                  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label="Teléfono"
                  type="number"
                  placeholder="1234567890"
                  {...register("telefono")}
                  className="text-sm"/>
                {errors?.telefono && <span className="text-red-500 text-xs">{errors.telefono.message}</span>}
                </div>
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
                <Checkbox {...register("politica")}
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
                <Button type="submit" variant="gradient" color="light-green" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Registrarse
                </Button>
              </div>
            </form>
            <DialogBox open={open} size={"xs"} message={mensaje} funcion={cerrarModal}></DialogBox>    
        </>
    );
}


