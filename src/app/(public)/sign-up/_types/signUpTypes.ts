// _types/index.ts (add alongside SignInSchema/SignInType)
import { z } from "zod";

export const SignUpSchema = z
    .object({
        name: z
            .string()
            .min(1, "Full name is required")
            .min(2, "Name must be at least 2 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters"),
        password_confirmation: z
            .string()
            .min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type SignUpType = z.infer<typeof SignUpSchema>;