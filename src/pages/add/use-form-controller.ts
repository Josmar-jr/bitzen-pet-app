import { usePetQueries } from "@/hooks/queries/use-pet-queries";

import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { z } from "zod";

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  name: z.string({
    message: "Nome é um campo obrigatório",
  }),
  color: z.string({
    message: "Cor é um campo obrigatório",
  }),
  birthday: z.date({
    message: "Data de nascimento é um campo obrigatório",
  }),
  description: z.string({
    message: "Descrição é um campo obrigatório",
  }),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg and .png formats are supported.",
    ),
});

export type FormAddData = z.infer<typeof schema>;

export function useFormController() {
  const navigate = useNavigate();

  const controller = useForm<FormAddData>({
    resolver: zodResolver(schema),
  });

  const { createPetMutation } = usePetQueries();

  function onSubmit(data: FormAddData) {
    const formData = new FormData();

    formData.append("birthdate", dayjs(data.birthday).format("YYYY-MM-DD").toString());
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", data.image);
    }

    createPetMutation.mutateAsync(formData, {
      onSuccess() {
        navigate("/");
      },
    });
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    createPetMutation,
  };
}
