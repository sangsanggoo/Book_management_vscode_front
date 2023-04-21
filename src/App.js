import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import AuthRoute from './componets/Routes/AuthRoute/AuthRoute';
import Main from './pages/Main/Main';
import AuthRouteReactQuery from './componets/Routes/AuthRoute/AuthRouteReactQuery';



function App() {
  return (
    <>
      <Global styles = {Reset}></Global>
      <Routes>
        <Route exact path='/login' element={<AuthRouteReactQuery path="/login" element={<Login/>} />} />
        <Route  path='/register' element={<AuthRouteReactQuery path="/register" element={<Register/>} />} />
        <Route path="/" element ={<AuthRouteReactQuery path="/" element={<Main/>} />} />
      </Routes>

    </>
  );
}

export default App;
