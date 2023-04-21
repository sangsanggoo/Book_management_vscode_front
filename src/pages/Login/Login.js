import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import LoginInput from '../../componets/UI/Login/LoginInput/LoginInput';
import { FiUser ,FiLock } from 'react-icons/fi';
import { Link, Navigate } from 'react-router-dom';
import { BsGoogle } from 'react-icons/bs'
import { SiNaver, SiKakao } from 'react-icons/si'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../componets/UI/atoms/auth/AuthAtoms';

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

const forgotPassword =css`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin-bottom: 45px;

    width: 100%;

    font-size: 12px;
    font-weight: 600;
    
    
`;

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
const oauth2Container =css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin: 20px;
`;

const oauth2 = (provider) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0px 10px;
    border: 3px solid ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
    border-radius: 50%;

    height: 50px;
    width: 50px;

    font-size: ${provider ==="kakao" ? "30px" : "20px"};
    
    cursor: pointer;
    &:hover {
        background-color: ${provider === "google" ? "#0075ff" : provider === "naver" ? "#19ce60" : "#ffdc00"};
    }

`;

const signupMessage = css`
    margin-top: 20px ;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`

const register = css`
    margin-top: 10px;
    font-weight: 600;
`

const errorMsg = css`
    margin-bottom: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`

const Login = () => {
    const [logUser, setLoginUser] = useState({email:"" , password: ""})
    const [errorMessage,setErrorMessage] = useState({email: "",password: ""})
    const [ authenticated, setAuthenticated] = useRecoilState(authenticatedState);

    // auth를 setAuth로 넣으면 authenticated에 넣어주는거 전역변수에 값을 넣어주는거
    const onChangeHandle = (e) => {
        const {name, value} = e.target;
        setLoginUser({...logUser,[name] : value})
    }
    const loginSubmit = async () => {
        const data = {
            ...logUser
        }
        const option = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
        try{
            const response  = await axios.post("http://localhost:8080/auth/login",JSON.stringify(data),option)
            alert("로그인 성공");
            setErrorMessage({email : "", password: ""});
            const acessToken = response.data.GranType + " " + response.data.accessToken;
            localStorage.setItem("acessToken",acessToken);
            setAuthenticated(true);
            

        } catch(error) {
            alert("로그인 실패");
            setErrorMessage({email : "", password: "", ...error.response.data.errorData});
            console.log(error);
        }
    }





    return (
        <div css = {container}>
            <header>
                <h1 css={logo}>LOGIN</h1>
            </header>
            <main css={mainContainer}> 
                    <div css  = {authForm}>
                        <label css ={inputLabel} >Email</label>
                        <LoginInput type="email" placeholder="Type your email" onChange={onChangeHandle} name="email">
                            <FiUser />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessage.email}</div>
                        <label css={inputLabel} >Password</label>
                        <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                            <FiLock />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessage.email}</div>
                        <div css={forgotPassword}>
                            <Link to="/forgot/password">Forgot Password?</Link>
                        </div>
                        <button css ={loginButton} onClick={loginSubmit}>Login</button>
                    </div>
                    <div></div>
            </main>
                    
                    <div css={signupMessage}>Or Sign Up Using</div>

                    <div css={oauth2Container}>
                        <div css={oauth2("google")}><BsGoogle /></div>
                        <div css={oauth2("naver")}><SiNaver /></div>
                        <div css={oauth2("kakao")}><SiKakao /></div>
                    </div>

                <div css={signupMessage}>Or Sign Up Using</div>

            <footer>
                <div css={register}><Link to="/signup" >REGISTER</Link></div>
            </footer>

        </div>
    );
};

export default Login;