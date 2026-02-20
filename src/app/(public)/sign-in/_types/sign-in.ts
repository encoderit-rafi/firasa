import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Email is invalid"),
  password: z.string().min(1, "Password is required"),
});
export type SignInType = z.infer<typeof SignInSchema>;
