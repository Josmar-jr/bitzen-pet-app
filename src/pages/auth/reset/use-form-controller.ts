import { useAuthQueries } from "@/hooks/queries/use-auth-queries";
import { useAuthStore } from "@/stores/use-auth-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

export const schema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type LoginData = z.infer<typeof schema>;

export function useFormController() {
  const navigate = useNavigate();

  const controller = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const { resetPassword, setResetPassword } = useAuthStore();
  const authQueries = useAuthQueries();

  const sendCode = authQueries.sendCodeMutation;
  const resetPasswordMutation = authQueries.resetPasswordMutation;

  const email = resetPassword?.email;
  const code = resetPassword?.code;

  function onSubmit(data: LoginData) {
    if (email && code) {
      resetPasswordMutation.mutate(
        {
          email,
          token: code,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
        {
          onSuccess() {
            navigate("/login");

            setResetPassword(null);
          },
        },
      );
    }
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    sendCodeMutation: sendCode,
  };
}
