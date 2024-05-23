import { api } from "./api";

export async function getUser() {
  const response = await api.get("/user");
  const data = await response.data;

  return data;
}

interface UpdateUserParam {
  name: string;
  email: string;
}

export async function updateUser(body: UpdateUserParam) {
  const response = await api.put("/user", body);
  const data = await response.data;

  return data;
}
