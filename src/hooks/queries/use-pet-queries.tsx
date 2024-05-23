/* eslint-disable react-hooks/rules-of-hooks */
import { createPet, getPetById, updatePet } from "@/services/pets";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePetQueries() {
  function getPetByIdQuery(id: number) {
    return useQuery({
      queryKey: ["GET_PET_BY_ID"],
      queryFn: () => getPetById(id),
      enabled: !!id,
    });
  }

  const createPetMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await createPet(formData); // Assume that createPet is configured to handle FormData
    },
    onError() {
      toast.error("Oops! Ocorreu um error ao adicionar um novo pet 😥");
    },
    onSuccess() {
      toast.success("Pet adicionado com sucesso 🐶");
    },
  });

  function updatePetMutation(id: string) {
    return useMutation({
      mutationFn: async (formData: FormData) => {
        await updatePet(id, formData); // Assume that createPet is configured to handle FormData
      },
      onError() {
        toast.error("Oops! Ocorreu um error ao editar esse pet 😥");
      },
      onSuccess() {
        toast.success("Pet adicionado com sucesso 🐶");
      },
    });
  }

  return {
    getPetByIdQuery,
    createPetMutation,
    updatePetMutation,
  };
}
