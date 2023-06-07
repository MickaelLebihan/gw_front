import './styles/index.scss';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useQuery} from 'react-query'
import Header from './components/Header'
import Home from './routes/Home'
import Catalog from './routes/Catalog'
import Profile from './routes/User/Profile'
import Favorites from './routes/User/Favorites'
import Register from './routes/User/Register'
import Login from './routes/User/Login'
import Game from './routes/Game'
import AddGame from './routes/Game/Add'
// import { useState } from 'react';



function App() {
  
  
  const {data: user} = useQuery('user')
  // const {loaded, setLoaded} = useState(false)


  if(user){
    // console.log(user)
   if (user.roles.includes("ADMIN")){
      // setLoaded(true)
    }
  }

  return (
    
        <div className="App">
          <Header />
          <main>

            <Routes>
              <Route path="/">
                <Route index element={<Home/>}/>
              </Route>
              <Route path="/user">
                <Route path="login" element={<Login/>}/>
                <Route path="profil" element={<Profile/>}/>
                <Route path="favorites" element={<Favorites/>}/>
                <Route path="register" element={<Register/>}/>
              </Route>
              <Route path="games" element={<Catalog/>}/>
              <Route path="/game/:id" element={<Game />} />
              <Route path="/game/add" element={user !== undefined && user.roles.includes("ADMIN") ? <AddGame /> : <Navigate to="/" replace />} />
              <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>

          </main>
          {/* <Footer /> */}
        </div>

  );
}

export default App;
