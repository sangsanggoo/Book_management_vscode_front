import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticatedState } from '../../UI/atoms/auth/AuthAtoms';
import axios from 'axios';


const AuthRoute = async ({  element }) => {
    if(!useRecoilValue(authenticatedState)) {
        const accessToken = localStorage.getItem("accessToken")

        if(accessToken !== null) {
             const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
        }
        return element;
    }
    
    return <Navigate to="/login" />;
};


export default AuthRoute;