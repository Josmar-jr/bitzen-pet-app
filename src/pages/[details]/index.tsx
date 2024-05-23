import { Card, CardContent } from "@/components/ui/card";
import { InfoText } from "./components/info-text";
import { PageTitleArea } from "@/components/page-title-area";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePetQueries } from "@/hooks/queries/use-pet-queries";
import { Loader } from "./components/loader";

export interface Pet {
  id: number;
  name: string;
  color: string;
  birthdate: string;
  observation: string | null;
  user_id: number;
  image_url: string;
  age: string;
}

export function Details() {
  const { petId } = useParams() as { petId: string };

  const navigate = useNavigate();

  const { getPetByIdQuery } = usePetQueries();

  const petQuery = getPetByIdQuery(Number(petId));

  const pet: Pet = petQuery.data?.data;

  if (petQuery.error) {
    navigate("/not-found");
  }

  return (
    <div className="h-full">
      <PageTitleArea title="Detalhes" />

      <main className="w-full max-w-[1352px] mx-auto space-y-8 px-4 py-6">
        <div className="w-full max-w-[1352px] mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex gap-2 text-primary font-semibold text-base hover:opacity-70 transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </Link>

          <Button onClick={() => navigate(`/edit/${petId}`)} size="lg" className="w-[213px]">
            <SquarePen className="mr-2" />
            Editar
          </Button>
        </div>

        {petQuery.isLoading ? (
          <Loader />
        ) : (
          <div className="flex-col lg:flex-row flex gap-8 w-full">
            <div className="w-[336px] h-[280px] rounded-lg relative gap-2 flex flex-col justify-center items-center">
              <img src={pet.image_url} alt="Pet" className="aspect-square size-full rounded-lg" />
            </div>

            <Card className="w-full">
              <CardContent className="lg:px-10 px-7 py-6 lg:py-11 gap-y-14 grid grid-cols-3">
                <InfoText label="Nome">{pet.name}</InfoText>
                <InfoText label="Cor">{pet.color}</InfoText>
                <InfoText label="Idade">{pet.age}</InfoText>
                <InfoText className="col-span-3" label="Sobre o pet">
                  {pet.observation ?? "-"}
                </InfoText>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
