import { z } from "zod";
 
export const loginformSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, "Password must be at least 7 characters"),
});