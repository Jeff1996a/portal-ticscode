import { z } from 'zod';

export const registerTemplateSchema = z.object({
  nombres: z.string().min(1,{ message: 'Nombres is Required' }),
  apellidos: z.string().min(1,{ message: 'Apellidos is Required' } ),
  email: z.string().min(1,{ message: 'Email is Required' }).email(),
  fechaNacimiento: z.string().date(),
  password: z.string().min(6,{ message: 'Must be at least 6 digits' }).max(12),
  confirmPassword: z.string().min(6, { message: 'Must be at least 6 digits' }).max(12),
  politica: z.boolean()
}).superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password is not the same as confirm password',
      path: ['confirmPassword'],
    })
  }
});

export type RegisterTemplateProps = z.infer<typeof registerTemplateSchema>;
