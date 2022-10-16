import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route exact path='/product::id' element={<ProductPage/>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  );
}

export default App;
