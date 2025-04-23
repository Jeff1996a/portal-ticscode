'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Checkbox, Input,Typography} from "@material-tailwind/react";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DialogBox } from "../ui/modal/modal";
import { useRouter } from "next/navigation";
import { ProfileTemplateProps, ProfileTemplateSchema } from "@/app/utils/profileValidation";

// Country code options
const countryOptions = [
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
  { value: "+501", label: "🇧🇿 +501 (Belize)" },
  { value: "+502", label: "🇬🇹 +501 (Guatemala)" },
  { value: "+503", label: "🇸🇻 +503 (El Salvador)" },
  { value: "+504", label: "🇭🇳 +504 (Honduras)" },
  { value: "+505", label: "🇳🇮 +505 (Nicaragua)" },
  { value: "+506", label: "🇨🇷 +506 (Costa Rica)" },
  { value: "+507", label: "🇵🇦 +507 (Panamá)" },
  { value: "+500", label: "🇫🇰 +502 (Islas Malvinas)" },
  { value: "+51", label: "🇵🇪 +51 (Perú)" },
  { value: "+54", label: "🇦🇷 +54 (Argentina)" },
  { value: "+55", label: "🇧🇷 +55 (Brasil)" },
  { value: "+56", label: "🇨🇱 +56 (Chile)" },
  { value: "+57", label: "🇨🇴 +57 (Colombia)" },
  { value: "+58", label: "🇻🇪 +58 (Venezuela)" },
  { value: "+591", label: "🇧🇴 +591 (Bolivia)" },
  { value: "+592", label: "🇬🇾 +592 (Guyana)" },
  { value: "+593", label: "🇪🇨 +593 (Ecuador)" },
];

export default function ProfileForm(){
  //Controlar el popup de alerta 
  const[open, setOpen] = React.useState(false);
  const[mensaje, setMensaje] = React.useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [countryCode2, setCountryCode] = useState<any>({});
    
  //Validación de los datos del formulario
  const {reset, handleSubmit, setValue, register, formState: { errors },
  } = useForm<ProfileTemplateProps>({
  resolver: zodResolver(ProfileTemplateSchema)});

  const [form, setForm] =  useState<ProfileTemplateProps>({
        nombres:"",
        apellidos:"",
        fecha_nacimiento: "",
        email: "",
        telefono: "",
        cedula: "",
        codigo_pais: "",
        politica: false,
  });
 const router = useRouter();
    
  //Get user data
  useEffect (() =>{
        //Define async function to fetch data
        const load_profile = async() =>{
            try{
                //Make the api request
                const response = await  fetch("/api/profile", {
                    method:"GET",
                    credentials: "include"
                });
                
                if(!response.ok){
                    throw new Error("Failed to load profile");
                }

                const result = await response.json();

                //Get User data
                setForm({
                    nombres: result.nombres,
                    apellidos: result.apellidos,
                    email: result.email,
                    fecha_nacimiento: result.fecha_nacimiento,
                    telefono: result.telefono,
                    codigo_pais: result.codigo_pais,
                    cedula: result.cedula,
                    politica: result.politica,
                });

                setValue("nombres", result.nombres);
                setValue("apellidos", result.apellidos);
                setValue("telefono", result.telefono);
                setValue("email", result.email);
                setValue("cedula", result.cedula);


                //Get user birth date 
                const fecha_nacimiento = new Date(result.fecha_nacimiento).toISOString().split('T')[0]
                setSelectedDate(fecha_nacimiento)
                setValue("fecha_nacimiento", fecha_nacimiento);
                
                const country = countryOptions.find((country) => country.value===result.codigo_pais)
                console.log(country)

            }catch(error){
                console.log(error);
                router.push("/login"); // Redirect if unauthorized
            }
        };
        load_profile();
  },[router]);
  
  const handleCountryChange = async (selectedOption: any) => {
      setCountryCode(selectedOption.value);
      setValue("codigo_pais", selectedOption.value, { shouldValidate: true });
  };

  const handleDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function cerrarModal(){
        if(open == true){
            setOpen(false);
        }
  }; 
        
    
  //Función para enviar el formulario de registro
  const submitProfileForm = async (values : ProfileTemplateProps) =>{ 
      try {
      
          const response = await fetch('/api/profile', {
             method: 'PUT',
             headers: {
              "Content-Type": "application/json",
             },
             body: JSON.stringify(values),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.log("falling over")
            setOpen(true);
            setMensaje(responseData['message']);
            throw new Error(`response status: ${responseData.status}`);
          }
          else
          {
            console.log(responseData['message'])
            setOpen(true);
            setMensaje("¡Perfil actualizado!");
            reset();
          }
      } catch (err) {
          console.error(err);
      }
  };


    return(
        <>
           <form id="profileForm" onSubmit={handleSubmit(submitProfileForm)} className="gap-2 md:grid md:grid-cols-2">
              <div className="mt-2 md:col-span-2 text-center">
                <Avatar
                            variant="circular"
                            size="xxl"
                            alt=""
                            
                            className="border border-green-500 p-0.5"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
              </div>
              <div className="md:col-span-2 text-center text-2xl text-green-500">
                <hr className="h-px bg-green-900 border-1 dark:bg-green-700"/>
                <h3>Datos personales</h3> 
                <hr className="h-px bg-green-900 border-1 dark:bg-green-700"/>
              </div>
              <div className="mt-2">
                <Input label="Documento de identidad"  readOnly {...register("cedula")}  value={form.cedula} size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.cedula && <span className="text-red-500 text-xs">{errors.cedula.message}</span>}
              </div>
              <div className="mt-2">
                <Input label="Nombres" {...register("nombres")} value={form.nombres} onChange={handleChange} size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.nombres && <span className="text-red-500 text-xs">{errors.nombres.message}</span>}
              </div>
              <div className="mt-2">
                <Input label="Apellidos"  {...register("apellidos")} value={form.apellidos} onChange={handleChange} size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.apellidos && <span className="text-red-500 text-xs">{errors.apellidos.message}</span>}
              </div>
              
              <div className="mt-2">
                <Input type="date" label="Fecha de nacimiento"  {...register("fecha_nacimiento")} value={selectedDate} onChange={handleDateChange}  size="md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />       
                {errors?.fecha_nacimiento && <span className="text-red-500 text-xs">{errors.fecha_nacimiento.message}</span>}
              </div>

              <div className="mt-2 md:col-span-2 gap-2 md:grid md:grid-cols-2">
                <div className="mt-2">
                  <Select
                    options={countryOptions}
                    defaultValue={countryOptions[0]}
                    onChange={handleCountryChange}
                    className="text-sm"
                  />
                  {errors?.codigo_pais && <span className="text-red-500 text-xs">{errors.codigo_pais.message}</span>}
                </div>
                <div className="mt-2">
                <Input
                  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} label="Teléfono"
                  type="number"
                  placeholder="1234567890"
                  {...register("telefono")}
                  value={form.telefono}
                  onChange={handleChange}
                  className="text-sm"/>
                {errors?.telefono && <span className="text-red-500 text-xs">{errors.telefono.message}</span>}
                </div>
              </div>
              <div className="md:col-span-2 mt-2" >
                <Input label="Email" size="md" readOnly {...register("email")} value={form.email} onChange={handleChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                {errors?.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="mt-6 mb-4 md:col-span-2 text-end">
                <Button type="submit" variant="gradient" color="light-green"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Actualizar
                </Button>
              </div>
            </form>
                
        </>
    );
}


