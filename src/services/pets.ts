import { api } from "./api";

interface GetAllPetsQueryParams {
  search: string;
  page: number;
}

export async function getAllPets(params?: GetAllPetsQueryParams) {
  const response = await api.get("/pets", {
    params,
  });
  const data = await response.data;

  return data;
}

export async function getPetById(id: number) {
  const response = await api.get(`/pets/${id}`);
  const data = await response.data;

  return data;
}

export async function createPet(body: FormData) {
  const response = await api.post("/pets", body);
  const data = await response.data;

  return data;
}

export async function deletePet(id: number) {
  const response = await api.delete(`/pets/${id}`);
  const data = await response.data;

  return data;
}

export async function updatePet(id: string, body: FormData) {
  const response = await api.put(`/pets/${id}`, body);
  const data = await response.data;

  return data;
}
