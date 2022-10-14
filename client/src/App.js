import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route exact path='/create' element={<CreatePage/>}/>
      <Route exact path='/hero::id' element={<HeroPage/>}/>
      <Route exact path='/edit::id' element={<EditPage/>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  );
}

export default App;
