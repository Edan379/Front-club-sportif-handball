import './App.css'
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginModal } from './components/modales/LoginModal/LoginModal';
import { NavBar } from './components/Navbar/NavBar';
import { ClubIdentity } from './components/ClubIdentity/ClubIdentity';
import { NotFoundPage } from './services/utils/NotFoundPage';
import { Person } from './components/Person/Person';
import SignupModal from './components/modales/SignupModal/SignupModal';
import EventsPage from './pages/Events/EventsPage';
import HomePage from './pages/Home/Home';
import { FooterDown } from './components/FooterDown/FooterDown';
import { NewsPage } from './pages/News/NewsPage';
import { NewDetailsPage } from './pages/News/NewDetailsPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import EventDetailsPage from './pages/Events/EventDetailsPage';
import { PlayersPage } from './pages/Players/PlayersPage';
import { CalendarPage } from './pages/Calendar/CalendarPage';
import { AdminPrivateRoute } from './services/utils/AdminPrivateRoute';
import { BtnDisconect } from './components/BtnDisconnect/BtnDisconect';
import { validateUserToken } from './services/api/validateUserToken';

export interface dataUser {
  id: string,
  role: string,
  firstname: string,
  lastname: string,
  avatar: string,
}

function App() {
  //userData
  const [userData, setUserData] = useState<dataUser>();

  //function to redefine userData
  function handleUserData(data: dataUser): void {
    setUserData({ ...data });
  }

  useEffect(() => {
    const checkToken = async () => {
      let token = localStorage.getItem('token');
      if (token) {
        try {
          token ? token = JSON.parse(token) : null;
          token = `Bearer ${token}`

          //validé le token via l'api
          const data = await validateUserToken(token);
          handleUserData(data);
        } catch (error) {
          console.error("échec validation", error);
        }
      }
    }
    checkToken();
  }, [])

  return (
    <>
      <header className='bg-custom-15616D'>
        <div className='grid grid-cols-1 sm:grid-cols-2 justify-center'>
          <ClubIdentity />
          <div className='flex flex-col gap-4 items-end sm:flex-row sm:items-center sm:justify-end'>
            {(userData?.role === "ADMIN" || userData?.role === "PLAYER" || userData?.role === "SUPPORTER") ? <Person avatar={userData && userData.avatar ? userData.avatar : "/avatar_default.jpg"} firstname={userData?.firstname ? userData.firstname : "John"} lastname={userData?.lastname ? userData.lastname : "Doe"} role={userData?.role} />
              : (
                <>
                  <SignupModal handleUserData={handleUserData} />
                  <LoginModal handleUserData={handleUserData} /* redifineUserRole={redifineUserRole} */ />
                </>
              )
            }
            {(userData?.role === "ADMIN" || userData?.role === "PLAYER" || userData?.role === "SUPPORTER") ? <BtnDisconect statut='Se déconnecter' /> : null}
          </div>
        </div>
        <NavBar userRole={userData ? userData.role : "visiteur"} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/actualités' element={<NewsPage />} />
          <Route path='/actualités/detail/:idNew' element={<NewDetailsPage />} />
          <Route path='/évènements' element={<EventsPage />} />
          <Route path='/évènements/detail/:idEvent' element={<EventDetailsPage />} />
          <Route path='/joueurs' element={<PlayersPage />} />
          <Route path='/calendrier' element={<CalendarPage />} />

          <Route element={<AdminPrivateRoute userRole={userData?.role} />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer >
        <FooterDown />
      </footer>
    </>
  )
}

export default App