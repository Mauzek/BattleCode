import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Введите логин"),
  password: z.string().min(6, "Минимум 6 символов"),
});

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Введите email")
      .email("Некорректный формат email"),
    username: z.string().min(3, "Логин не короче 3 символов"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const confirmCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Код должен содержать 6 цифр")
    .max(6, "Код должен содержать 6 цифр")
    .regex(/^\d+$/, "Код должен состоять только из цифр"),
});

const verify2FASchema = z.object({
  code: z
    .string()
    .min(6, "Код должен содержать 6 цифр")
    .max(6, "Код должен содержать 6 цифр")
    .regex(/^\d+$/, "Код должен состоять только из цифр"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ConfirmCodeFormData = z.infer<typeof confirmCodeSchema>;
type Verify2FAFormData = z.infer<typeof verify2FASchema>;;
export {
  loginSchema,
  registerSchema,
  confirmCodeSchema,
  verify2FASchema,
  type LoginFormData,
  type RegisterFormData,
  type ConfirmCodeFormData,
  type Verify2FAFormData
};
