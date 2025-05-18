import { z } from 'zod';

export const ProfileTemplateSchema = z.object({
  nombres: z.string().min(1,{ message: 'Nombres is Required' }),
  apellidos: z.string().min(1,{ message: 'Apellidos is Required' } ),
  email: z.string().min(1,{ message: 'Email is Required' }).email(),
  fechaNacimiento: z.string().date(),
  telefono: z.string().regex(/^\d{7,15}$/, "Invalid phone number format"),
  countryCode: z.string().min(1, "Country code is required"),
  password: z.string().min(6,{ message: 'Must be at least 6 digits' }).max(12),
  cedula: z.string().min(10, "Número de documento inválido"),
  politica: z.boolean()
})

export type ProfileTemplateProps = z.infer<typeof ProfileTemplateSchema>;
