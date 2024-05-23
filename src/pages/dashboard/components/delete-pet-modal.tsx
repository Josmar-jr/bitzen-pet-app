import type { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deletePet } from "@/services/pets";
import { toast } from "sonner";

import { queryClient } from "@/providers";
import { Loader2 } from "lucide-react";

interface DeletePetModalProps {
  children: ReactNode;
  id: number;
}

export function DeletePetModal({ children, id }: DeletePetModalProps) {
  const deletePetMutation = useMutation({
    onMutate: () => deletePet(id),
  });

  function handleDeletePet() {
    deletePetMutation.mutate();

    queryClient.invalidateQueries({
      queryKey: ["GET_ALL_PETS"],
    });

    toast.success("Pet deletado com sucesso");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover esse pet?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o pet da sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={deletePetMutation.isPending} onClick={handleDeletePet}>
            {deletePetMutation.isPending && <Loader2 />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
