import React, { useEffect } from 'react';
import {  Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../UI/atoms/auth/AuthAtoms';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getAuthenticated } from '../../../api/authFolder/authApi';
// const validatedToken = async(accessToken) => {
//     const response = await axios.get("http://localhost:8080/auth/authenticated",{params: {accessToken}});
//     console.log("테스트")
//     return response.data;
// }

const AuthRouteReactQuery = ({ path, element }) => {
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const { data, isLoading } = useQuery(["authenticated"],async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:8080/auth/authenticated",{ params: { accessToken }});
            return response.data;
        },{enabled: refresh}
    );

    useEffect(()=> {
        if(!refresh) {
            setRefresh(true);
        }
    }, [refresh]);

    if(isLoading) {
        return (<div>로딩중...</div>)
    }

    if(!isLoading) {
        const permitAll = ["/login","/register","/password/forgot"];
        if(!data.data) {
            if(permitAll.includes(path)) {
                return element;
            }
            return <Navigate to="/login" />;
        }
        if(permitAll.includes(path)) {
            return <Navigate to="/" />;
        }
        return element;
    }

};

export default AuthRouteReactQuery;