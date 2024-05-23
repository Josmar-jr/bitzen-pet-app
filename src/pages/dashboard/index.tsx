import { TableDemo } from "./components/table";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useManipulateData } from "./use-manipulates-data";
import { cn } from "@/lib/utils";
import { PageTitleArea } from "@/components/page-title-area";

export default function Dashboard() {
  const {
    petsQuery,
    pureSearch,
    page,
    onChangeSearchPetValue,
    onNextPage,
    onPrevPage,
    onConfirmSearchPet,
  } = useManipulateData();

  const petsData = petsQuery.data;

  const hasPrevPage = page > 1;
  const hasNextPage = petsData?.data.total / petsData?.data.per_page > page;

  const navigate = useNavigate();

  return (
    <div className="h-full">
      <PageTitleArea title="Seus Pets" />

      <main className="w-full max-w-[1352px] mx-auto mt-14 space-y-8 px-4 py-6">
        <div className="flex-col gap-6 flex justify-between lg:flex-row items-start lg:items-center">
          <div className="flex items-center lg:max-w-[520px] w-full relative">
            <Search className="absolute size-6 grid place-content-center ml-[10px] text-[#737373]" />
            <Input
              value={pureSearch}
              onChange={onChangeSearchPetValue}
              className="rounded-r-none pl-11"
              placeholder="Pesquisar um pet"
            />
            <Button onClick={onConfirmSearchPet} className="rounded-l-none" size="lg">
              Buscar
            </Button>
          </div>

          <Button onClick={() => navigate("/add")} size="lg" className="w-full lg:w-auto">
            <CirclePlus className="mr-2" />
            Cadastrar pet
          </Button>
        </div>

        <TableDemo />

        <div className={cn(petsData?.data.total === 0 && "opacity-0", "flex justify-end gap-4")}>
          <Button variant="outline" onClick={onPrevPage} disabled={!hasPrevPage}>
            Anterior
          </Button>
          <Button variant="outline" onClick={onNextPage} disabled={!hasNextPage}>
            Próximo
          </Button>
        </div>
      </main>
    </div>
  );
}
