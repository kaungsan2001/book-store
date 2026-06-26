import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.email("Invalid email address"),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const OtpSchema = z.object({
  otp: z
    .string({ error: "Invalid Otp" })
    .length(6, "OTP must be exactly 6 characters long"),
});

export type OtpFormData = z.infer<typeof OtpSchema>;

export const SetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must not exceed 100 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SetPasswordType = z.infer<typeof SetPasswordSchema>;
