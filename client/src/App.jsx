import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/HomePage/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route  path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  );
}

export default App;
