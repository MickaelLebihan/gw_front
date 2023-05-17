import './styles/index.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
