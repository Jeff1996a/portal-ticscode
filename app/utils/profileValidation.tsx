import { z } from 'zod';

export const ProfileTemplateSchema = z.object({
  nombres: z.string().min(1,{ message: 'Nombres is Required' }),
  apellidos: z.string().min(1,{ message: 'Apellidos is Required' } ),
  email: z.string().min(1,{ message: 'Email is Required' }).email(),
  fecha_nacimiento: z.string().date(),
  telefono: z.string().regex(/^\d{7,15}$/, "Invalid phone number format"),
  codigo_pais: z.string().min(1, "Country code is required"),
  cedula: z.string().min(10, "Número de documento inválido"),
  politica: z.boolean()
})

export type ProfileTemplateProps = z.infer<typeof ProfileTemplateSchema>;
