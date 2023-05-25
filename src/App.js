import './styles/index.scss';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from './components/Header'
import Home from './routes/Home'
import Catalog from './routes/Catalog'
import User from './routes/User'
import Favorites from './routes/User/Favorites'
import Login from './routes/Login'
import Game from './routes/Game'

const queryClient = new QueryClient()

const initializeCache = () => {
  const user = localStorage.getItem('user');
  
  if (user) {
    // L'utilisateur est connecté, stockez les informations dans le cache de React Query
    queryClient.setQueryData('user', JSON.parse(user));
  }
}

function App() {
  initializeCache()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>

            <Routes>
              <Route path="/">
                <Route index element={<Home/>}/>
                <Route path="games" element={<Catalog/>}/>
                <Route path="login" element={<Login/>}/>
                {/* <Route
                    path="/redirect"
                    element={ <Navigate to="/" /> }
                /> */}
              </Route>
              <Route path="/user">
                <Route path="profil" element={<User/>}/>
                <Route path="favorites" element={<Favorites/>}/>
              </Route>
              <Route path="/game/:id" element={<Game />} />
            </Routes>

          </main>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
