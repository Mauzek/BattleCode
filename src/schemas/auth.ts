import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Enter your username"),
  password: z.string().min(6, "Minimum of 6 characters"),
});

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Enter your email address")
      .email("Invalid email address"),
    username: z.string().min(3, "Username must be 3 characters long"),
    password: z.string().min(6, "Minimum of 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const confirmCodeSchema = z.object({
  code: z
    .string()
    .min(6, "The code must contain 6 digits")
    .max(6, "The code must contain 6 digits")
    .regex(/^\d+$/, "Код должен состоять только из цифр"),
});

const verify2FASchema = z.object({
  code: z
    .string()
    .min(6, "The code must contain 6 digits")
    .max(6, "The code must contain 6 digits")
    .regex(/^\d+$/, "The code must consist of numbers only"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ConfirmCodeFormData = z.infer<typeof confirmCodeSchema>;
type Verify2FAFormData = z.infer<typeof verify2FASchema>;
export {
  loginSchema,
  registerSchema,
  confirmCodeSchema,
  verify2FASchema,
  forgotPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ConfirmCodeFormData,
  type Verify2FAFormData,
  type ForgotPasswordFormData,
};
