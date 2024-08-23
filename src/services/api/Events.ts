import IEventInterface from "../interfaces/EventInterface";
import { useApi } from "../hooks/useApi";

const api = useApi()

export async function getEvents(): Promise<IEventInterface[]> {
  const { data } = await api.get(`event/list`);
  return data;
}

export async function getEventById(eventId: number): Promise<IEventInterface> {
  const { data } = await api.get(`event/${eventId}`)
  return data
}

export async function postEvents(event: any): Promise<IEventInterface> {
  const { data } = await api.post('event/create', event)
  return data
}

export async function putEvents(modifiedEvent: IEventInterface): Promise<IEventInterface> {
  const eventId = modifiedEvent.id;
  const { data } = await api.put(`event/${eventId}`, modifiedEvent);
  return data
}

export async function deleteEvent(eventId: number): Promise<IEventInterface> {
  const { data } = await api.delete(`event/${eventId}`);
  return data
}