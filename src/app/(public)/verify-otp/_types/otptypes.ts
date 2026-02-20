import { z } from "zod";

export const VerifyOtpSchema = z.object({
  email: z.string().email("Invalid email"),
  otp_code: z
    .number()
    .min(100000, "OTP must be 6 digits")
    .max(999999, "OTP must be 6 digits"),
});

export type VerifyOtpType = z.infer<typeof VerifyOtpSchema>;
