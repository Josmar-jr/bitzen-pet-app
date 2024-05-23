import { usePetQueries } from "@/hooks/queries/use-pet-queries";
import { getPetById } from "@/services/pets";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { useParams } from "react-router";
import { useState } from "react";
import type { Pet } from "../[details]";

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z
  .object({
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
      )
      .optional(),
    imageUrl: z.string().nullable(),
  })
  .refine(
    (data) => {
      return data.imageUrl !== null;
    },
    {
      message: "Only .jpg, .jpeg and .png formats are supported.",
      path: ["image"],
    },
  );

export type FormAddData = z.infer<typeof schema>;

export function useFormController() {
  const { petId } = useParams() as { petId: string };
  const [imageGenerate, setImageGenerate] = useState<string | null>(null);

  const controller = useForm<FormAddData>({
    resolver: zodResolver(schema),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValues: async () => {
      const petResult = await getPetById(Number(petId));
      const pet: Pet = petResult.data!;
      setImageGenerate(pet.image_url);

      if (pet) {
        return {
          name: pet.name,
          birthday: dayjs(new Date(pet.birthdate)).toDate(),
          color: pet.color,
          imageUrl: pet.image_url,
          description: pet.observation ?? "",
        };
      }
    },
  });

  const { updatePetMutation } = usePetQueries();

  const updatePet = updatePetMutation(petId);

  function onSubmit(data: FormAddData) {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("birthdate", dayjs(data.birthday).format("YYYY-MM-DD").toString());
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", data.image);
    }

    updatePet.mutateAsync(formData);
  }

  return {
    controller,
    errors: controller.formState.errors,
    onSubmit,
    updatePet,
    imageGenerate,
    setImageGenerate,
  };
}
