import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
// import CreateVideogame from "./components/CreateVideogame/CreateVideogame"
// import Detail from "./components/Detail/Detail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      </div>
        <Routes>
            <Route exact path='/' element= {<LandingPage/>} />
            {/* <Route  path='/create' element= {<CreateVideogame/>} /> */}
            <Route  path='/home' element= {<Home/>} />
            {/* <Route  path='/:id' element= {<Detail/>} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
