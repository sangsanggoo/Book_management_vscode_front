/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';


const table = css`
    border: 1px solid #dbdbdb;
`
const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`

const ReantalList = ({ bookId }) => {
    
    const queryClient = useQueryClient();
    const getRentalList = useQuery(["getRentalList"], async () => {
        const option = {
            headers : {
                Authorization : localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/rental/list`, option)
        return response;
    })
    
    const rentalBook = useMutation(["rentalBook"], async () => {
        const option = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : localStorage.getItem("accessToken") 
            }
        }
        return await axios.post(`http://localhost:8080/book/${bookId}/rental`, JSON.stringify({
            userId: queryClient.getQueryData("principal").data.userId
        }), option);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getRentalList");

        }
    });

    if(getRentalList.isLoading) {
            return <div>불러오는 중 ...</div>
    }
    if(!getRentalList.isLoading)
    return (
        <table css={table}>
            <thead>
                <tr>
                    <th css={thAndTd}>도서번호</th>
                    <th css={thAndTd}>도서명</th>
                    <th css={thAndTd}>상태</th>
                </tr>
            </thead>
            <tbody>
                {getRentalList.data.data.map(rentalData => {
                    return (<tr key={rentalData.bookListId}>
                        <td css={thAndTd}>{rentalData.bookListId}</td>
                        <td css={thAndTd}>{rentalData.bookName}</td>
                        {rentalData.rentalStatus
                        ? (<td css={thAndTd}>대여가능 <button>대여</button></td>) 
                        : (<td css={thAndTd}>대여중 {rentalData.userId === queryClient.getQueryData("principal").data.userId ?
                             <button>반납</button> 
                            :""}
                            </td>)}
                    </tr>

                    )
                })}
            </tbody>
        </table>
    );
};

export default ReantalList;