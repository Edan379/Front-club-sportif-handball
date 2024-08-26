import { useParams } from "react-router-dom"
import { getNewDetail } from "../../services/api/News";
import { useEffect, useState } from "react";

interface newDetail {
  id: string;
  img: string;
  title: string;
  content: string;
  created_at: string;
  creator_id: number;
  updated_at: string;
}

export function NewDetailsPage() {
  const { idNew } = useParams();

  const [newDetail, setNewDetail] = useState<newDetail>();

  useEffect(() => {
    if (idNew) {
      const requestApi = async () => {
        try {
          const response = await getNewDetail(idNew);
          setNewDetail(response.data);
        }
        catch (error) {
          console.log("La requête a échoué");
        }
      }
      requestApi();
    }
  }, [])

  return (
    <div className="flex flex-col my-10 w-1/2 p-0 mx-auto">
      <h2 className="text-left text-2xl mb-4 font-bold">
        {newDetail?.title}
      </h2>
      <img className="rounded" src={newDetail && newDetail.img ? `data:image/png;base64,${newDetail.img}` : "/handball_player.jpg"} alt="Il s'agit d'une illustration de l'actualité" />
      <time className="text-right mt-2">{newDetail?.created_at.split("T")[0].split("-").reverse().join("-")}</time>
      <p className="mt-2">{newDetail?.content}</p>
    </div>
  )
}