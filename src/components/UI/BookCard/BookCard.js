/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import {AiOutlineLike} from 'react-icons/ai'
import { useState } from 'react';
const cardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 7px;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px #dbdbdb;

    margin: 20px;
    width: 300px;
    cursor: pointer;
    &:hover{ 
            box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
`;

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;

    padding :20px;

`;

const titleText = css`
    font-weight: 600;
`;

const main = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

`;

const imgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 10px;
    border-radius: 7px;
    box-shadow: 2px 2px 5px #dbdbdb;

    width: 200px;
    background-color: #fafafa;
    overflow: hidden;
`;

const img = css`
    height: 100%;
`;


// const rentalButton = css`
//     border: 1px solid #dbdbdb;
//     border-radius: 7px;
    
//     width: 50%;
//     height: 30px;
    
//     background-color: white;
//     font-weight: 600;
//     box-shadow: 0px 5px 5px #dbdbdb;
//     cursor: pointer;
//     &:hover {
//         background-color: #fafafa;
//     }
//     &:active {
//         background-color: #eee;
//     }
//     `;

    const footer = css` 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 100%;
        font-weight: 600;
    `;

    const like = css`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        border-radius: 7px;
        
        padding: 10px;
        height: 30px;
        
        background-color: white;
        font-weight: 600;
        box-shadow: 0px 5px 5px #dbdbdb;

    `;

    const likeIcon = css`
        padding-right: 5px;
    `;
const BookCard = ({ book }) => {
    return (
        <div css={cardContainer}>
            <header css={header}>
                <h1 css={titleText}> {book.bookName}</h1>
            </header>
            <main css={main}>
                <div css={imgBox}>
                    <img css= {img} src={book.coverImgUrl} alt={book.bookName}/>
                </div>

            </main>
            <footer css={footer}>
                <div css={like}><div css={likeIcon}> <AiOutlineLike  /> </div> 추천: 10</div>
                <h2>저자 : {book.authorName}</h2>
                <h2>출판사 : {book.publisherName}</h2>
            </footer>
            
        </div>
    );
};

export default BookCard;