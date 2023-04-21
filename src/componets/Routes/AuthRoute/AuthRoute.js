import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../UI/atoms/auth/AuthAtoms';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getAuthenticated } from '../../../api/authFolder/authApi';
const validatedToken = async(accessToken) => {
    const response = await axios.get("http://localhost:8080/auth/authenticated",{params: {accessToken}});
    console.log("테스트")
    return response.data;
}

const AuthRoute = ({ path,element }) => {
    const accessToken = localStorage.getItem("accessToken")
    const [authenticated, setAuthenticated] = useRecoilState(authenticatedState)
    // 비동기 처리하고 갔다옴 ..?
    // "authenticatedApi" get요청을 받으면 data에 값을 넣어줌
    const [data, isLoading, isError] = useQuery(() => getAuthenticated(accessToken));
    const permitAll = ["/login","/register","/password/forgot"];

    if(!authenticated) {

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