import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      </div>
        <Routes>
            <Route exact path='/' element= {<LandingPage/>} />
            <Route  path='home' element= {<Home/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
