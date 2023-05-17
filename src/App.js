import './styles/index.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>

          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>

        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
