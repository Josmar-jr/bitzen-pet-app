import { getAllPets } from "@/services/pets";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useState } from "react";

export const petQueryParamsAtom = atom({
  search: "",
  page: 1,
});

export function useManipulateData() {
  const [pureSearch, setPureSearch] = useState("");
  const [petQueryParams, setPetQueryParams] = useAtom(petQueryParamsAtom);

  const petsQuery = useQuery({
    queryKey: ["GET_ALL_PETS", petQueryParams],
    queryFn: () => {
      const { page, search } = petQueryParams;

      return getAllPets({
        page: page,
        search: search,
      });
    },
    enabled: true,
  });

  function handleSearchPet(event: React.ChangeEvent<HTMLInputElement>) {
    setPureSearch(event.target.value);
  }

  function handleConfirmSearchPet() {
    setPetQueryParams(() => ({
      page: 1,
      search: pureSearch,
    }));
  }

  function handleNextPage() {
    setPetQueryParams((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  }

  function handlePrevPage() {
    setPetQueryParams((prevState) => ({
      ...prevState,
      page: prevState.page - 1,
    }));
  }

  return {
    pureSearch,
    search: petQueryParams.search,
    page: petQueryParams.page,
    onChangeSearchPetValue: handleSearchPet,
    onConfirmSearchPet: handleConfirmSearchPet,
    onNextPage: handleNextPage,
    onPrevPage: handlePrevPage,
    petsQuery,
  };
}
