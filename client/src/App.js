import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './component/register';
import Login from './component/login';
import Reset from './component/reset';
import Update from './component/update';
function App() {
  return (
    <div className="App">
     <Routes>
       
        <Route path="/" element={<Register />}/>
       
        <Route path='/signin' element={<Login />}/>

        <Route path='/resetpass' element={<Reset />}/>

        <Route path='/updatepass' element={<Update />}/>
      </Routes>
     
    </div>
  );
}

export default App;
