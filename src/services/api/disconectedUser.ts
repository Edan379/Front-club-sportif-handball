import { useApi } from "../hooks/useApi";

const api = useApi();

export async function disconectedUser():Promise<number> {
  const {status} = await api.post("auth/logout");
  return status;
}