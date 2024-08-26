import { useApi } from "../hooks/useApi";
import { NewData } from "../interfaces/NewData";

// Use Pick to create type with proprietie will
type PartialNewData = Pick<NewData, 'id' | 'img' | 'title' | 'content'>;

//instance axios with useApi()
const api = useApi();

//request server
export async function getNewsList(): Promise<NewData[]> {
  const { data } = await api.get(`news/list`);
  return data
}

export async function createNews(art: any) {
  const { data } = await api.post("news/create", art,{headers:{"Content-Type":"multipart/form-data"}});
  return data;
}

export async function deleteNews(news_id: number) {
  //console.log('news_id: ', news_id);
  const response = await api.delete(`news/delete/${news_id}`);
  return response;
}

export async function modifyNews(data: PartialNewData) {
  //console.log('data:', data);
  const response = await api.put(`news/update/id/${data.id}`, data);
  return response;
}

export async function getNewDetail(idNew: string) {
  const response = await api.get(`news/id/${idNew}`);
  return response;
}