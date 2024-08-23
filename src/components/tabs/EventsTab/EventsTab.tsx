import CreateEventModal from "../../modales/CreateEventModal/CreateEventModal";
import { getEvents } from "../../../services/api/Events";
import { useEffect, useState } from "react";
import IEventInterface from "../../../services/interfaces/EventInterface";
import CategoryTag from "../../CategoryTag/CategoryTag";
import ModifyEventModal from "../../modales/ModifyEventModal/ModifyEventModal";
import DeleteEventModal from "../../modales/DeleteEventModal/DeleteEventModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function EventsTab() {

  const [events, setEvents] = useState<IEventInterface[]>([]);

  //sort events by id décroissant
  const eventsSort = events.sort((a, b) => b.id - a.id);

  const [startIndex, setStartIndex] = useState<number>(0);

  const eventNbrPerPage: number = 4;

  //extract element quantity to show them in TableBody
  const visibleevents: IEventInterface[] | undefined = eventsSort?.slice(startIndex, startIndex + eventNbrPerPage);

  useEffect(() => {

    async function loadEvents() {
      const eventList = await getEvents();
      setEvents(eventList)
    }

    loadEvents()

  }, [])

  const updateEventsList = async () => {
    const eventList = await getEvents()
    setEvents([...events, ...eventList]);
  };

  //function to add event
  const addEventModified = (eventModified: IEventInterface) => {
    const index = events.findIndex((event) => event.id == eventModified.id);
    if (index === 0) {//insert to index 0
      setEvents([
        eventModified, ...events.slice(index + 1)
      ])
    }
    else if (index === events.length - 1) {//insert to index last
      setEvents([
        ...events.slice(0, index), eventModified
      ])
    }
    else if (index !== -1) {//insert between stevent and end
      setEvents([
        ...events.slice(0, index), eventModified, ...events.slice(index + 1)
      ])
    }
    else {
      console.log("Index de l'evenement pas trouvé dans eventList");
    }
  }

  //function to handle page next of table
  const handleNext = () => {
    setStartIndex(startIndex + eventNbrPerPage);
  }

  //function to handle page previous of table
  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - eventNbrPerPage));
    if (Math.max(0, startIndex - eventNbrPerPage) === 0) {
    }
  }

  //function to delete News
  const deleteItem = (event_id: number) => {
    const eventsListModified = events.filter((event) => event.id !== event_id);

    //reassign state newsList
    setEvents(eventsListModified)
  }

  return (
    <>
      <CreateEventModal updateEventsList={updateEventsList} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-custom-15616D dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titre
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleevents.map((event: IEventInterface, index: number) =>
            (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {event?.title}
                </th>
                <td className="px-6 py-4">
                  <CategoryTag eventCategory={event} />
                </td>
                <td className="text-black">
                  {event.start_time ? event.start_time.split('T')[0].split("-").reverse().join("-") : null}
                </td>
                <td className="px-6 py-4 text-right flex gap-2 justify-end">
                  <ModifyEventModal event={event} addEventModified={addEventModified} />
                  <DeleteEventModal eventId={event.id} deleteItem={deleteItem} />
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>

      </div>

      <div className='flex justify-between mt-4'>

        <button
          className='bg-custom-818181 rounded-md text-white p-1'
          type='button'
          onClick={handlePrevious}
          disabled={startIndex === 0}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Précédent
        </button>

        <button
          className='bg-custom-818181 rounded-md text-white p-1'
          type='button'
          onClick={handleNext}
          disabled={startIndex + eventNbrPerPage >= events?.length}>
          Suivant
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>

      </div>
    </>
  );
}


