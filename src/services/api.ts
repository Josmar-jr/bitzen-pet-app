import { TOKEN } from "@/utils/constants";
import axios, { type AxiosError } from "axios";

export function getToken() {
  // backwards compatibility
  if (localStorage.getItem(TOKEN) === "undefined") {
    return null;
  }

  const token = JSON.parse(localStorage.getItem(TOKEN) ?? "null") as string | null;

  return token;
}

function setupAPI() {
  const token = getToken();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // localStorage.removeItem(TOKEN);

        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  return api;
}

export const api = setupAPI();
