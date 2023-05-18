import './styles/index.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import Catalog from './routes/Catalog'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/games" element={<Catalog/>}/>
          </Routes>

        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
