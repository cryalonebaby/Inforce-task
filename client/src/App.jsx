import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/HomePage/Home';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './pages/HeroPage/Hero';
import Create from './pages/CreatePage/Create';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/create' element={<Create/>}/>
      <Route exact path='/hero/:id' element={<Hero/>}/>
      <Route  path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  );
}

export default App;
