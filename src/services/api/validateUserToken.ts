import { useApi } from "../hooks/useApi";

const api = useApi();

export const validateUserToken = async (token:string) => {
  const {data} = await api.post('auth/keepLogin',{},{
    headers:{
      'Authorization': `${token}`
    }
  });
  return data;
}