import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableBody as TableBodyPrimitive, TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EyeIcon, Trash2 } from "lucide-react";
import { DeletePetModal } from "./delete-pet-modal";

import type { Pet } from "./table";
import { useNavigate } from "react-router";

interface TableBodyProps {
  pets: Pet[];
}

export function TableBody({ pets }: TableBodyProps) {
  const navigate = useNavigate();

  return (
    <TableBodyPrimitive>
      {pets.map((pet) => (
        <TableRow key={pet.id}>
          <TableCell>
            <Avatar className="size-[84px] rounded-md">
              <AvatarImage className="size-full rounded-md" src={pet.image_url} alt="Cat" />
            </Avatar>
          </TableCell>
          <TableCell>{pet.name}</TableCell>
          <TableCell className="text-center">-</TableCell>
          <TableCell className="text-center">-</TableCell>
          <TableCell className="text-right">
            <div className="inline-flex gap-3 lg:gap-6">
              <Button
                onClick={() => navigate(`/details/${pet.id}`)}
                variant="outline"
                className="size-11 p-0"
              >
                <EyeIcon className="size-[18px]" />
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <DeletePetModal id={pet.id}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="size-11 p-0">
                        <Trash2 className="text-destructive size-[18px]" />
                      </Button>
                    </TooltipTrigger>
                  </DeletePetModal>
                  <TooltipContent>Remover</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBodyPrimitive>
  );
}
