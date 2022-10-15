import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css';

function App() {
  
  return (
    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
  );
}

export default App;
