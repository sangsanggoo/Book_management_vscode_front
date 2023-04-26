/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import Sidebar from '../../componets/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
const mainContainer =css`
        padding: 10px;
    `

const BookDetail = () => {

    const { bookId } = useParams();
    const getBook = useQuery(["getBook"],async () =>{
        const option = {
            headers : {
                Authorization : localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}`, option)
        return response;
    })
    const getLikeCount = useQuery(["getLikeCount"], async () => {
        const option = {
            headers : {
                Authorization : localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option)
        return response;
    })

    if(getBook.isLoading) {
        return <div>불러오는 중...</div>
    }
    
    if(!getBook.isLoading)
    return (
        <div css={mainContainer}>
            <Sidebar/>
            <header>
                <h1>{getBook.data.data.bookName}</h1>
                <p>분류: {getBook.data.data.categoryName} / 저자명 : {getBook.data.data.authorName} /출판사: {getBook.data.data.publisherName} / 추천 : {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}</p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName}/>
                </div>
                <div>

                </div>
                <div>
                    <button></button>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;