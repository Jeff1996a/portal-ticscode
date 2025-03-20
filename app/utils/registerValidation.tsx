import { z } from 'zod';

export const registerTemplateSchema = z.object({
  nombres: z.string().min(1,{ message: 'Nombres is Required' }),
  apellidos: z.string().min(1,{ message: 'Apellidos is Required' } ),
  email: z.string().min(1,{ message: 'Email is Required' }).email(),
  fechaNacimiento: z.string().date(),
  password: z.string().min(6,{ message: 'Must be at least 6 digits' }).max(12),
  confirmPassword: z.string().min(6, { message: 'Must be at least 6 digits' }).max(12),
  politica: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // This points the error to the correct field
});

export type RegisterTemplateProps = z.infer<typeof registerTemplateSchema>;
