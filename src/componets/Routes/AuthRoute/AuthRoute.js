import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../UI/atoms/auth/AuthAtoms';
import axios from 'axios';
const validatedToken = async(accessToken) => {
    const response = await axios.get("http://localhost:8080/auth/authenticated",{params: {accessToken}});
    console.log("테스트")
    return response.data;
}

const AuthRoute = ({ path,element }) => {
    const [authenticated, setAuthenticated] = useRecoilState(authenticatedState)
    const permitAll = ["/login","/register","/password/forgot"];

    if(!authenticated) {
        const accessToken = localStorage.getItem("accessToken")
        // console.log(accessToken);
        if(accessToken !== null) {
            validatedToken(accessToken).then((flag)=> {
                setAuthenticated(flag);
            });
            if(authenticated) {
                return element;
            }
            console.log("페이지 이동 테스트");
            return <Navigate to={path} />
        } 
        if(permitAll.includes(path)) {
            return element;
        }
        return <Navigate to="/login" />;
    }
    if(permitAll.includes(path)) {
        return <Navigate to="/" />;
    }

    return element;
};


export default AuthRoute;