import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import LoginInput from '../../componets/UI/Login/LoginInput/LoginInput';
import { FiUser ,FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BiRename } from 'react-icons/bi'
import axios from 'axios';

// 라우터 안에서 링크


const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
`

const logo = css`
    margin: 50px 0px;
    font-size: 34px;
    font-weight: 600;
`;


const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 40px 20px;


    width: 400px;

`

const authForm = css`
    width: 100%;

   

`;

const inputLabel = css`
    margin-right: 5px;
    font-size: 12px;
    font-weight: 600;
`;

// const forgotPassword =css`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;

//     margin-bottom: 45px;

//     width: 100%;

//     font-size: 12px;
//     font-weight: 600;
    
    
// `;

const loginButton = css`

    margin: 10px 0px ;
    border: 1px solid #dbdbdb;
    border-radius: 7px;

    width: 100%;
    height: 50px;

    background-color: white;
    font-weight: 900;
    cursor: pointer;

    &:hover {
        background-color: #fafafa;
    }

    &:active {
        background-color: #eee;
    }
`;
// const oauth2Container =css`
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     width: 100%;
//     margin: 20px;
// `;

// const oauth2 = (provider) => css`
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     margin: 0px 10px;
//     border: 3px solid ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
//     border-radius: 50%;

//     height: 50px;
//     width: 50px;

//     font-size: ${provider ==="kakao" ? "30px" : "20px"};
    
//     cursor: pointer;
//     &:hover {
//         background-color: ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
//     }

// `;

const signupMessage = css`
    margin-top: 20px ;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`

const login = css`
    margin-top: 10px;
    font-weight: 600;
`

const errorMsg = css`
    margin-bottom: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`

const  Register = () => {
    const [registerUser, setRegisterUser] = useState({email: "", password: "", name : ""});
    const [errorMessages , setErrorMessage] = useState({email : "", password: "", name: "" });
    const onChangeHandle = (e) => {
        const {name, value} = e.target;
        setRegisterUser({...registerUser, [name] : value})
    }

    const registSubmit = async () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
        // data를 json으로 보낼껀데
        // json으로 보내려면 content-type : application/json 로 잡혀있어야 가능하기때문에 추가로 보내주는거임
        // then 함수의 return은 무조건 Promise

        // await를 쓰려면 async안에 무조건 써야함
        // await를 쓰면 then을 사용한거랑 같아짐
        // try catch써서 실행하고 오류나면 catch가 실행
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data),option);
            setErrorMessage({email : "", password: "", name: ""});
            if(response.status == 200) {
                console.log("성공");
            }
        } catch(error) {
            setErrorMessage({email : "", password: "", name: "" , ...error.response.data.errorData});

        }
        // .then(response => {
        //     setErrorMessage({email : "", password: "", name: ""});
        //     console.log(response);
        //     console.log(registerUser);
        // })
        // .catch(error => {
        //     setErrorMessage({email : "", password: "", name: "" , ...error.response.data.errorData});
        // })
        

    }

    return (
        <div css = {container}>
            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>
            <main css={mainContainer}> 
                    <div css  = {authForm}>
                        <label css ={inputLabel} >Email</label>
                        <LoginInput type="email" placeholder="Type your email"  onChange={onChangeHandle} name="email"> 
                            <FiUser />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessages.email}</div>

                        <label css={inputLabel} >Password</label>
                        <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                            <FiLock />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessages.password}</div>

                        <label css={inputLabel} >Name</label>
                        <LoginInput type="text"  placeholder="Type your name" onChange={onChangeHandle} name="name">
                            <BiRename />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessages.name}</div>

                        <button css ={loginButton} onClick={registSubmit}>REGISTER</button>
                    </div>
                    <div></div>
            </main>
                    
                <div css={signupMessage}>Already a user?</div>

            <footer>
                <div css={login}><Link to="/login" >LOGIN</Link></div>
            </footer>

        </div>
    );
};

export default Register;