import { useEffect, useState } from "react";
import EventCard from "../../components/Cards/EventCard";
import { getEvents } from "../../services/api/Events";
import IEventInterface from "../../services/interfaces/EventInterface";


export default function EventsPage() {

  const [events, setEvents] = useState<IEventInterface[]>([])

  useEffect(() => {
    const handleEvenList = async () => {
      try {
        const eventList = await getEvents()
        setEvents(eventList)
      } catch (error) {
        console.error("La requête a échoué", error);
      }
    }
    handleEvenList();
  }, [])


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-y-8 gap-x-8">
        {events.map((event: IEventInterface, index: number) =>
        (
          <EventCard key={index} eventInfo={event} />
        ))
        }
      </div>
    </>
  )
}