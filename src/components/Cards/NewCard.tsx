import './NewCard.css';
import { Card } from 'flowbite-react';
import { NewData } from '../../services/interfaces/NewData';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

interface NewCardProps {
  NewsList?: NewData[];
}

export function NewCard(props: NewCardProps) {
  // recover properties
  const { NewsList } = props;

  const navigate = useNavigate();

  //function redirect to new detail page
  const handleRedirection = (dataNew: NewData) => {
    navigate(`/actualités/detail/${dataNew.id}`, { state: { itemNews: dataNew } });
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-y-8 gap-x-8'>
      {NewsList && [...NewsList].reverse().map((itemNew) => (
        <Card
          key={itemNew.id}
          className="flex cursor-pointer"
          renderImage={() => (
            <img
              src={itemNew.img ? `data:image/png;base64,${itemNew.img}` : "/handball_player.jpg"}
              alt={`image reflétant le titre: ${itemNew.title} de l'actualité`}
              className="w-full h-[321px] object-cover"
            />
          )}
          onClick={() => handleRedirection(itemNew)}
        >
          <div className="flex-1">
            <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2'>
              {itemNew.title}
            </h5>
            <p className="overflow-hidden text-ellipsis hidden">
              {itemNew.content}
            </p>
          </div>
          <div className='flex'>
            <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-custom-287581 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='button' onClick={() => { handleRedirection(itemNew) }}>Détails<FontAwesomeIcon className='ml-2' icon={faArrowRight} /></button>
          </div>
        </Card>
      ))}
    </div>
  );
}
