import { useApi } from "../hooks/useApi";

const api = useApi();

export async function disconectedUser() {
  const response = await api.post("auth/logout");
  console.log(response, response.status, response.data);
  return response.status;
}