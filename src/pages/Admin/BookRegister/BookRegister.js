/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import Sidebar from '../../../componets/Sidebar/Sidebar';


const table = css`
    border: 1px solid #dbdbdb;
    font-size: 12px;
`
const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`
const tableContainer =css`
    height: 300px;
    overflow: auto;
`

const BookRegister = () => {
    const queryClient = useQueryClient();
    
    const [ searchParams, setSearchParams ] = useState({page: 1, searchValue: ""});
    const [ refresh, setRefresh ] = useState(true); 
    const [findBook , setFindBook] = useState({
        "bookId" : "",
        "bookName":"",
        "authorName":"",
        "publisherName":"",
        "categoryName":"",
        "coverImgUrl":""
    });

    const getBooks = useQuery(["registerSearchBooks"], async ()=> {
        const option = {
            params: {
                ...searchParams
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.get("http://localhost:8080/books", option);
    }, {
        enabled: refresh,
        onSuccess: () => {
            setRefresh(false);
        }
    });

    const registeBookList = useMutation(async (bookId) => {
        const option = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : localStorage.getItem("accessToken")

            }
        }
        return await axios.post("http://localhost:8080/admin/book/list",JSON.stringify({bookId}),option);
        
    });

    const searchInputHandle = (e) => {
        
        setSearchParams({...searchParams, searchValue: e.target.value});

    }

    const searchSubmitHandle = (e) => {
        if(e.type !== "click") {
            if(e.keyCode !== 13) {
                return;
            }
        }
        setSearchParams({...searchParams, page: 1});
        setRefresh(true);
    }

    const checkBookHandle = (e) => {
        if(!e.target.checked) {
            return;
        }
        const book = getBooks.data.data.bookList.filter(book => book.bookId === parseInt(e.target.value))[0]
        setFindBook({...book});
    }

    const pagination = () => {
        if(getBooks.isLoading) {
            return (<></>);
        }

        const nowPage = searchParams.page;

        const lastPage = getBooks.data.data.totalCount % 20 === 0 
            ? getBooks.data.data.totalCount / 20
            : Math.floor(getBooks.data.data.totalCount / 20) + 1;
        
        const startIndex = nowPage % 5 === 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;

        const pageNumbers = [];

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        return (
            <>  
                 <button disabled={nowPage ===1} onClick={() => {
                    setSearchParams({...searchParams, page : 1});
                    setRefresh(true);
                }}>&#60;&#60;</button>
                <button disabled={nowPage ===1} onClick={() => {
                    setSearchParams({...searchParams, page : nowPage -1});
                    setRefresh(true);
                }}>&#60;</button>
                {pageNumbers.map(page => (<button onClick={() => {
                    setSearchParams({...searchParams, page});
                    setRefresh(true);
                }} disabled = {page === nowPage}>{page}</button>))}
                <button disabled={nowPage === lastPage}onClick={() => {
                    setSearchParams({...searchParams, page : nowPage +1});
                    setRefresh(true);
                }}>&#62;</button>
                <button disabled={nowPage === lastPage}onClick={() => {
                    setSearchParams({...searchParams, page : lastPage});
                    setRefresh(true);
                }}>&#62;&#62;</button>
            </>
        )
    }
    return (
        <div>
            <Sidebar></Sidebar>
            <div>
                <label>도서검색</label>
                <input type="text" onChange={searchInputHandle} onKeyUp={searchSubmitHandle}></input>
                <button onClick={searchSubmitHandle} ><BiSearch /></button>
            </div>
            <div css={tableContainer}>
                <table css={table}>
                    <thead>
                        <tr>
                            <th css={thAndTd}>선택</th> 
                            <th css={thAndTd}>분류</th>
                            <th css={thAndTd}>도서명</th>
                            <th css={thAndTd}>저자명</th>
                            <th css={thAndTd}>출판사</th>
                        </tr>
                    </thead>
                    <tbody >
                        {getBooks.isLoading ? "" : getBooks.data.data.bookList.map(book =>(
                            <tr key={book.bookId}>
                                <td css={thAndTd}><input type="radio" onChange={checkBookHandle} name='select' value = {book.bookId}/></td>
                                <td css={thAndTd}>{book.categoryName}</td>
                                <td css={thAndTd}>{book.bookName}</td>
                                <td css={thAndTd}>{book.authorName}</td>
                                <td css={thAndTd}>{book.publisherName}</td>
                            </tr>)
                        )}
                        
                    </tbody>
                </table>
            </div>
            <div>

                {pagination()}
                
            </div>
            <div>
                <label>도서코드</label>
                <input type="text" value = {findBook.bookId}readOnly></input>
            </div>
            <div>
                <label>분류</label>
                <input type="text" value = {findBook.categoryName}readOnly></input>
            </div>
            <div>
              <label>도서명</label>
                <input type="text" value = {findBook.bookName}readOnly></input>
            </div>
            <div>
                <label>저자</label>
                <input type="text" value = {findBook.authorName}readOnly></input>
            </div>
            <div>
                <label>출판사</label>
                <input type="text" value = {findBook.publisherName}readOnly></input>
            </div>
            <div>
                <label>이미지</label>
                <input type="text" value = {findBook.coverImgUrl}readOnly></input>
            </div>
            <button onClick={() => {registeBookList.mutate(findBook.bookId)}}>등록</button>
        </div>
        
    );
};

export default BookRegister;