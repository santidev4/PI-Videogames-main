import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      </div>
        <Routes>
            <Route exact path='/' element= {<LandingPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
