import {
  logout,
  refreshToken,
  resetPassword,
  sendCode,
  signIn,
  signUp,
  validateToken,
} from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export function useAuthQueries() {
  const login = useMutation({
    mutationFn: signIn,
    onSuccess() {
      toast.success("Login realizado", {
        description: "Bem-vindo de volta! Você entrou com sucesso 🎉",
      });
    },
    onError(error: AxiosError) {
      if (error.response?.status === 403) {
        toast.error("Credenciais incorretas", {
          description: "Por favor, verifique suas credenciais e tente novamente 😥",
        });

        return;
      }

      toast.error("Erro na autenticação", {
        description:
          "Ocorreu um problema ao tentar autenticar. Por favor, tente novamente mais tarde 😥",
      });
    },
  });

  const refreshTokenMutation = useMutation({
    mutationKey: ["REFRESH_TOKEN"],
    mutationFn: refreshToken,
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess() {
      toast.success("Conta criada", {
        description: "A conta foi criada com sucesso, faça login com suas credenciais 🎉",
      });
    },
    onError(error: AxiosError) {
      if (error.response?.status === 422) {
        toast.error("Ops! Já e-mail informado já está em uso 😥");

        return;
      }

      toast.error("Ops! Ocorreu um erro ao criar a conta. Por favor, tente novamente 😥");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess() {
      toast.success("Você foi deslogado com sucesso!");
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: sendCode,
    onSuccess() {
      toast.success("Um código de redefinição de senha foi enviado para o seu e-mail!");
    },
    onError() {
      toast.success("Opss! Error ao tentar enviar o e-mail, tente novamente mais tarde");
    },
  });

  const validateTokenMutation = useMutation({
    mutationFn: validateToken,
    onSuccess() {
      toast.success("Código verificado com sucesso!");
    },
    onError() {
      toast.success("Opss! Error ao validar o código, verifique os dados");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess() {
      toast.success("Senha redefinida com sucesso 🎉");
    },
    onError() {
      toast.success("Opss! Error ao redefinir a senha, verifique os dados");
    },
  });

  return {
    signUpMutation,
    login,
    refreshTokenMutation,
    logoutMutation,
    sendCodeMutation,
    validateTokenMutation,
    resetPasswordMutation,
  };
}
