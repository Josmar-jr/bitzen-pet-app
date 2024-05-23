import { z } from "zod";
import * as validation from "@/utils/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/services/user";
import { toast } from "sonner";
import { queryClient } from "@/providers";

export const schema = z.object({
  fullname: validation.fullname,
  email: z
    .string({
      message: "E-mail é um campo obrigatório",
    })
    .trim()
    .email({
      message: "E-mail inválido",
    }),
});

type FormProfileData = z.infer<typeof schema>;

export function useFormController() {
  const { user, setUser } = useAuthStore();

  const controller = useForm<FormProfileData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.name,
      email: user?.email,
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  });

  function onSubmit(data: FormProfileData) {
    updateUserMutation.mutate(
      {
        name: data.fullname,
        email: data.email,
      },
      {
        onSuccess() {
          setUser((prevState) => {
            if (prevState) {
              return {
                ...prevState,
                email: data.email,
                name: data.fullname,
              };
            }

            return user;
          });
          toast.success("Informações do perfil atulizadas com sucesso");
          queryClient.invalidateQueries({
            queryKey: [""],
          });
        },
      },
    );
  }

  return {
    controller,
    onSubmit,
  };
}
