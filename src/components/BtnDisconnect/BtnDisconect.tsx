import { disconectedUser } from '../../services/api/disconectedUser';

interface BtnDisconectProps {
  statut: string;
  //redifineUserRole: (role: string) => void;
  redifineIsAuthenticated: (boolean: boolean) => void;
}

export function BtnDisconect(props: BtnDisconectProps) {
  const { statut } = props;


  async function handleDisconect() {
    //request
    const response = await disconectedUser();
    if (response === 201) {
      //remove token and refreshToken in localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // reload page
      location.reload();
    }
    else {
      //show error modale
      console.log("La déconnexion s'est mal passée")
    }
  }

  return (
    <button
      className="btn-disconect block text-white bg-custom-FF7D00 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-3 mb-3 mr-14"
      type="button" onClick={handleDisconect}>
      {statut}
    </button>
  )
}