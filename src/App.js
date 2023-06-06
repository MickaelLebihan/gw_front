import './styles/index.scss';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useQuery} from 'react-query'
import Header from './components/Header'
import Home from './routes/Home'
import Catalog from './routes/Catalog'
import User from './routes/User'
import Favorites from './routes/User/Favorites'
import Login from './routes/Login'
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
                <Route path="login" element={<Login/>}/>
              </Route>
              <Route path="/user">
                <Route path="profil" element={<User/>}/>
                <Route path="favorites" element={<Favorites/>}/>
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
