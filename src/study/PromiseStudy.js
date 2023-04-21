import React from 'react';

const PromiseStudy = () => {



    const a  = new Promise((resolve, reject) => {
        console.log("프로미스 호출");
        if( 1 !==1) {
            resolve();
        } else {
            reject(new Error("오류입니다."));
        }

    })
    
    const clickHandle = () => {
        a
        .then(() => {
            console.log("1번 then 호출");
            return new Promise((resolve, reject) => {
                resolve("리턴");
            });
        })
        .catch((error) => {
            console.log(error);
        })
        .then(b)
        
    }

    const b = (str) => {
        console.log(str);
    }
    

    return (
        <div>
            <button onClick={clickHandle}>버튼</button>
        </div>
    );
};

export default PromiseStudy;

/**
 *  promise resolve안에 매개변수는 then함수가 호출 되었을때 매개변수로 들어가게 된다.
 * 
 * 
 * 
 */