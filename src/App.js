import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Callback from './study/CallbackStudy';
import PromiseStudy from './study/PromiseStudy';
import AuthRoute from './componets/Routes/AuthRoute/AuthRoute';




function App() {
  return (
    <>
      <Global styles = {Reset}></Global>
      <Routes>
        <Route exact path='/login' Component={Login} />
        <Route exact path='/signup' Component={Register} />
        <Route path="/" element ={
            <AuthRoute element={"/main"}/>
        } />
        {/* <Route exact path='/callback' Component={Callback} />
        <Route exact path='/promise' Component={PromiseStudy} /> */}
      </Routes>

    </>
  );
}

export default App;
