import { useAuthQueries } from "@/hooks/queries/use-auth-queries";
import { useAuthStore } from "@/stores/use-auth-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

export const schema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
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
  const validateToken = authQueries.validateTokenMutation;

  const email = resetPassword?.email;

  function onSubmit(data: LoginData) {
    if (email) {
      validateToken.mutate(
        {
          email,
          token: data.code,
        },
        {
          onSuccess() {
            navigate("/reset");
            setResetPassword({
              email,
              code: data.code,
            });
          },
        },
      );
    }
  }

  function resendEmail() {
    if (email) {
      sendCode.mutate(resetPassword.email);
    }
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    sendCodeMutation: sendCode,
    resendEmail,
  };
}
