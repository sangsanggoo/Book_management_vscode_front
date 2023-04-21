import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import AuthRoute from './componets/Routes/AuthRoute/AuthRoute';
import Main from './pages/Main/Main';




function App() {
  return (
    <>
      <Global styles = {Reset}></Global>
      <Routes>
        <Route exact path='/login' element={<AuthRoute path="/login" element={<Login/>} />} />
        <Route  path='/register' element={<AuthRoute path="/register" element={<Register/>} />} />
        <Route path="/" element ={<AuthRoute path="/" element={<Main/>} />} />
      </Routes>

    </>
  );
}

export default App;
