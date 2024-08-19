export default interface IEventInterface {
  id: number,
  img?: File | string,
  title: string,
  content: string,
  type: string,
  date?: string,
  adress: string,
  start_time: string,
  end_time: string,
}