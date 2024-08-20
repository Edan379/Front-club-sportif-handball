import { useApi } from "../hooks/useApi";
import { dataUser } from "../../App";
import { ISignupForm } from "../interfaces/SignupForm";

const api = useApi();

export async function addUser(newUser: Partial<ISignupForm>): Promise<{user:Partial<dataUser>,token:string,refreshToken:string}> {
  const { data } = await api.post(`auth/signup`, newUser);
  return  data;
}