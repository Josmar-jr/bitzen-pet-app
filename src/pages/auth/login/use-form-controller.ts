import { useAuthQueries } from "@/hooks/queries/use-auth-queries";
import { useAuthStore } from "@/stores/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  password: z
    .string({
      message: "Senha é um campo obrigatório",
    })
    .min(7, {
      message: "Senha deve ter ao menos 7 caracteres",
    }),
  connected: z.boolean().default(false),
});

export type LoginData = z.infer<typeof schema>;

export function useFormController() {
  const controller = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const authQueries = useAuthQueries();
  const auth = useAuthStore();

  const login = authQueries.login;

  function onSubmit(data: LoginData) {
    login.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess({ data: { token, user } }) {
          auth.userAuthentication(user, token);
        },
      },
    );
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    loginMutation: login,
  };
}
