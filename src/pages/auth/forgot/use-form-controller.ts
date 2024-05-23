import { useAuthQueries } from "@/hooks/queries/use-auth-queries";
import { useAuthStore } from "@/stores/use-auth-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

export const schema = z.object({
  email: z
    .string({
      message: "E-mail é um campo obrigatório",
    })
    .trim()
    .email({
      message: "E-mail inválido",
    }),
});

export type LoginData = z.infer<typeof schema>;

export function useFormController() {
  const navigate = useNavigate();

  const controller = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const { setResetPassword } = useAuthStore();
  const authQueries = useAuthQueries();

  const sendCode = authQueries.sendCodeMutation;

  function onSubmit(data: LoginData) {
    sendCode.mutate(data.email, {
      onSuccess() {
        navigate("/code");
        setResetPassword({
          email: data.email,
          code: undefined,
        });
      },
    });
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    sendCodeMutation: sendCode,
  };
}
