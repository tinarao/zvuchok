import { z } from "zod";

const validators = {
  username: z
    .string({ message: "Имя пользователя не может быть пустым" })
    .min(2, "Слишком короткое имя пользователя")
    .max(96, "Слишком длинное имя пользователя"),
  password: z
    .string({ message: "Пароль не может быть пустым" })
    .min(8, "Слишком короткий пароль")
    .max(96, "Слишком длинный пароль"),
  email: z
    .string({ message: "адрес электронной почты не может быть пустым" })
    .min(2, "Слишком короткий адрес электронной почты")
    .max(96, "Слишком длинный адрес электронной почты"),
};

export const loginFormValidation = z.object({
  username: validators.username,
  password: validators.password,
});

export type LoginFormDTO = z.infer<typeof loginFormValidation>;
