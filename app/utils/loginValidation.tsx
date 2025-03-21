import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


export const loginValidationSchema = z.object({
  email: z.string().min(2).email(),
  password: z.string().min(9).max(12),
 
});


export type LoginValidationProps = z.infer<typeof loginValidationSchema>;
