/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import ListButton from './ListButton';
import { BiHome, BiLike, BiListUl, BiLogOut } from 'react-icons/bi';
import { useQuery } from 'react-query';
import axios from 'axios';

const sidebar =(isOpen) => css`
    position: absolute;
    display: flex;
    flex-direction: column;
    left : ${isOpen ? "10x" : "-240px"};

    border: 1px solid #dbdbdb;
    border-radius: 10px;
    
    background-color: white;
    width: 250px;
    box-shadow: -1px 0px 5px black;
    transition: left 1s ease;
    ${isOpen ? "" : `
         cursor: pointer;
    `}
   
    ${isOpen ? "" :
        `&:hover {
            left: -230px;
        }`
    }
    
`;

const header = css`
    display: flex;
    align-items: center;
    padding : 10px;
    margin-bottom: 15px;
`;

const userIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 8px;

    width: 45px;
    height: 45px;
    background-color: #713fff;
    color: white;
    font-size: 30px;
`;

const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const userName = css`
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    padding-top: 0;
`

const userEmail = css`
    font-size: 12px;
`;
const closeButton =css`
    position: absolute;
    top: 10px;
    right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1px solid #dbdbdb;
    padding-left: 0.3px;
    
    width: 17px;
    height: 17px;
    border-radius: 50%;
    font-size: 12px;
    cursor: pointer;
    &:active{
        background-color: #fafafa;
    }
`

    const main = css`
        padding: 10px;
        border-bottom: 1px solid #dbdbdb;
    `
    const footer = css`
        padding: 10px;
    `
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data ,isLoading } = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal" ,
         {params : { accessToken }} , 
         {
            enabled : accessToken
         }
         );
        return response;
    })
    const sidebarOpenClickhandle = () => {
        if(!isOpen) {
            setIsOpen(true);
        }
    }

    const sidebarCloseClickhandle = () => {
        setIsOpen(false);
    }  

    const logoutClickHandle =() => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken")
        }
    }

    if(isLoading) {
        return <>로딩중...</>
    }

    if(!isLoading)
    return (
        <div  css={sidebar(isOpen)} onClick={sidebarOpenClickhandle}>

            <header css={header}>
                <div css={userIcon}>
                    {data.data.name.substr(0, 1)}
                </div>
                <div css={userInfo}>
                    <h1 css= {userName}>{data.data.name}</h1>
                    <p css ={userEmail}>{data.data.email}</p>
                </div>
                <div css={closeButton} onClick={sidebarCloseClickhandle}><GrFormClose /></div>
            </header>

            <main css={main}>
                <ListButton title="Dashboard"><BiHome /></ListButton>
                <ListButton title="Likes"><BiLike /></ListButton>
                <ListButton title="Rental"><BiListUl /></ListButton>
            </main>

            <footer css={footer}>
                <ListButton title="Rogout" onClick={logoutClickHandle}><BiLogOut /></ListButton>
            </footer>
        </div>
    );
};

export default Sidebar;