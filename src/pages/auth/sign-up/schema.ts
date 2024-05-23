import * as validation from "@/utils/validations";
import z from "zod";

export const schema = z
  .object({
    fullname: validation.fullname,
    email: z
      .string({
        message: "E-mail é um campo obrigatório",
      })
      .trim()
      .email({
        message: "E-mail inválido",
      }),
    document: z
      .string({
        message: "CPF é um campo obrigatório",
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");

        return replacedDoc.length === 11;
      }, "CPF inválido")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");

        return !!Number(replacedDoc);
      }, "CPF inválido")
      .transform((doc) => doc.replace(/\D/g, "")),
    phone: validation.phone.transform((phone) => phone.replace(/\D/g, "")),
    password: z
      .string({
        message: "Senha é um campo obrigatório",
      })
      .min(8, {
        message: "Senha deve ter ao menos 8 caracteres",
      }),
    confirmPassword: z.string({
      message: "Senha é um campo obrigatório",
    }),
    termsConfirm: z.boolean().refine((value) => value, {
      message: "Você deve aceitar os Termos e Condições",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof schema>;
