import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useManipulateData } from "../use-manipulates-data";
import { Loader } from "./loader";
import { TableBody } from "./table-body";
import { CirclePlus, Dog } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export interface Pet {
  id: number;
  name: string;
  user_id: number;
  image_url: string;
}

export function TableDemo() {
  const navigate = useNavigate();

  const { petsQuery } = useManipulateData();
  const petsData = petsQuery.data;

  if (petsData?.data.total === 0 && !petsQuery.isLoading) {
    return (
      <div className="gap-6 flex flex-col justify-center items-center w-full border rounded border-slate-200 py-12 px-8">
        <span className="border border-slate-200 rounded p-2 block">
          <Dog className="size-10 text-slate-500" />
        </span>

        <div className="flex flex-col items-center max-w-[280px] text-center">
          <p className="font-medium text-lg">Adicione um Pet</p>
          <p className="text-sm text-slate-600">
            Adicione pelo menos um Pet para que possa ver a listagem dos seus Pets
          </p>
        </div>

        <Button
          onClick={() => navigate("/add")}
          variant="secondary"
          size="lg"
          className="w-full lg:w-auto"
        >
          <CirclePlus className="mr-2" />
          Cadastrar pet
        </Button>
      </div>
    );
  }

  return (
    <Table className="min-w-[720px] w-full">
      <TableHeader className="w-full">
        <h2 className="m-5 w-full font-semibold">Lista de pets</h2>
        <TableRow className="border-y border-slate-200">
          <TableHead className="w-[180px]">Pet</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Idade</TableHead>
          <TableHead className="text-center">Cor</TableHead>
          <TableHead className="text-right" />
        </TableRow>
      </TableHeader>

      {petsQuery.isLoading ? <Loader /> : <TableBody pets={petsData.data.data as Pet[]} />}
    </Table>
  );
}
