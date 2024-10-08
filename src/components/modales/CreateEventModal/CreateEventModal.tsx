import * as yup from 'yup';
import { useFormik } from "formik"
import { useState } from "react";
import { postEvents } from '../../../services/api/Events';
import IEventInterface from '../../../services/interfaces/EventInterface';
import { Button, CustomFlowbiteTheme, Flowbite, Modal } from 'flowbite-react';

interface CreateEventModalProps {
  updateEventsList(): void;
}

export default function CreateEventModal({ updateEventsList }: CreateEventModalProps) {

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        default: "text-white bg-custom-FF7D00 mb-4",
      },
    }
  };

  const [openModal, setOpenModal] = useState(false)

  const [newEvent, _setNewEvent] = useState<Omit<IEventInterface, 'id'>>({
    img: '',
    date: '',
    title: '',
    adress: '',
    start_time: '',
    end_time: '',
    type: '',
    content: ''
  })

  let newEventSchema = yup.object({
    img: yup.mixed(),
    title: yup.string().required(),
    date: yup.string().required(),
    adress: yup.string().required(),
    start_time: yup.string().required(),
    end_time: yup.string().required(),
    type: yup.string().required(),
    content: yup.string().required(),
  });

  const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
    initialValues: newEvent,
    validationSchema: newEventSchema,
    onSubmit: async values => {
      try {
        const imgName = values.img instanceof File ? values.img.name : values.img;

        const updateValues = ({
          ...values,
          start_time:values.date+'T'+values.start_time+":00.000Z",
          end_time:values.date+'T'+values.start_time+":00.000Z",
          img:imgName
        })

        delete updateValues.date;

        await postEvents(updateValues);
        //update events list
        updateEventsList();
        //closed modal
        setOpenModal(false);
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
      {/* Main modal */}
      <Flowbite theme={{ theme: customTheme }}>
        <Button color="default" onClick={() => setOpenModal(true)}>Ajouter un évènement</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Ajouter un évènement</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-4" action="#">
              <div>
                <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 ">Ajouter une image</label>

                <input onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue('img', event.currentTarget.files[0]);
                  }
                }} type="file" name="img" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" accept=".jpg, .png, .svg" />

              </div>
              {errors.img && <div className="error">{errors.img}</div>}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Titre</label>
                <input onChange={handleChange} value={values.title ? values.title : newEvent.title} type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Titre de l'évenement" />
              </div>
              {errors.title && <div className="error">{errors.title}</div>}
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">Date de l'évènement</label>
                <input onChange={handleChange} value={values.date ? values.date : newEvent.date} type="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
              </div>
              {errors.date && <div className="error">{errors.date}</div>}
              <div>
                <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 ">Lieu de l'évènement</label>
                <input onChange={handleChange} value={values.adress ? values.adress : newEvent.adress} type="text" name="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ex: Winterfell" />
              </div>
              {errors.adress && <div className="error">{errors.adress}</div>}

              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label htmlFor="start_time" className="block mb-2 text-sm font-medium text-gray-900 ">Heure de début</label>
                  <input onChange={handleChange} value={values.start_time ? values.start_time : newEvent.start_time} type="time" name="start_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="10h00" />
                  {errors.start_time && <div className="error">{errors.start_time}</div>}
                </div>

                <div className='flex-1'>
                  <label htmlFor="end_time" className="block mb-2 text-sm font-medium text-gray-900 ">Heure de fin</label>
                  <input onChange={handleChange} value={values.end_time ? values.end_time : newEvent.end_time} type="time" name="end_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="12h00" />
                  {errors.end_time && <div className="error">{errors.end_time}</div>}
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 ">Type d'évènement</label>
                <select defaultValue={values.type ? values.type : newEvent.type} onChange={handleChange} name="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="Choose" disabled>Selectionnez un type d'évènement</option>
                  <option value="MATCH">MATCH</option>
                  <option value="ENTRAINEMENT">ENTRAINEMENT</option>
                  <option value="APERO">APERO</option>
                </select>
              </div>
              {errors.type && <div className="error">{errors.type}</div>}
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea onChange={handleChange} value={values.content ? values.content : newEvent.content} name="content" rows={4} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Décrivez l'évènement" />
              </div>
              {errors.end_time && <div className="error">{errors.end_time}</div>}

              <div className="flex gap-4 justify-end">
                <button onClick={() => setOpenModal(false)} type="button" className=" text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Annuler
                </button>
                <button type="submit" className=" text-white bg-custom-287581 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Créer l'évènement
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  )
}