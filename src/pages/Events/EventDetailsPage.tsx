import { useParams } from "react-router-dom";
import { getEventById } from "../../services/api/Events";
import { useEffect, useState } from "react";
import IEventInterface from "../../services/interfaces/EventInterface";
import CategoryTag from "../../components/CategoryTag/CategoryTag";

export default function EventDetailsPage() {

  const { idEvent } = useParams()
  const [eventInfo, setEventInfo] = useState<IEventInterface>()

  useEffect(() => {
    try {
      async function loadEvent() {
        const response = await getEventById(Number(idEvent))
        setEventInfo(response)
      }
      loadEvent()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <div className="applied-padding">
        <article className="my-4 flex flex-col gap-4 max-w-screen-md m-auto">
          <h2 className="text-4xl font-semibold">{eventInfo?.title}</h2>
          <img className="rounded-lg" src={
            typeof eventInfo?.img === 'string'
              ? eventInfo.img
              : eventInfo?.img
                ? URL.createObjectURL(eventInfo.img)
                : "/news_handball_player.jpg"
          } alt="" />
          <div className="flex justify-between items-center">
            <div><CategoryTag eventCategory={eventInfo} /></div>
            <time>{eventInfo?.date}</time>
          </div>
          <p>{eventInfo?.content}</p>
        </article>
      </div>

    </>
  )
}