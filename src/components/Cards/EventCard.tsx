import { NavLink, useNavigate } from "react-router-dom";
import CategoryTag from "../CategoryTag/CategoryTag";
import IEventInterface from "../../services/interfaces/EventInterface";
import '../Cards/EventCard.css';

interface PropsEventCard {
  eventInfo: IEventInterface
}

export default function EventCard(props: PropsEventCard) {

  const { eventInfo } = props;

  const navigate = useNavigate();

  //function redirect to event detail page
  const handleRedirection = (eventId: string) => {
    navigate(`/évènements/detail/${eventId}`)
  }

  return (
    <>
      <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="absolute z-10 top-4 left-4">
          <CategoryTag eventCategory={eventInfo} />
        </div>
        <a href={`/évènements/detail/${eventInfo.id}`}>
          <img className="rounded-t-lg" src={
            typeof eventInfo.img === 'string'
              ? "/news_handball_player.jpg"
              : eventInfo.img
                ? URL.createObjectURL(eventInfo.img)
                : "/news_handball_player.jpg"
          } alt="image de l'évènement" />
        </a>

        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{eventInfo.title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{eventInfo.content}</p>
          <div className="flex align-middle justify-between">
            <NavLink to={`/évènements/detail/${eventInfo.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-custom-287581 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleRedirection(eventInfo.id.toString())}>
              Détails
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </NavLink>
            <p className="self-center">{eventInfo.date}</p>
          </div>
        </div>
      </div>
    </>
  )
}