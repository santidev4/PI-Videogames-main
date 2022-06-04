import React from "react";
import style from "../Pagination/Pagination.module.css"

export default function Pagination({videogamesPerPage, allVideogames, paginationFunction, paginationPrev, paginationNext}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.pagination}>
            <button className={style.arrow} onClick={(e) => paginationPrev(e)}> {'<'} Prev </button>
            {
                pageNumbers?.map(number => (
                    <button 
                    onClick={() => paginationFunction(number)}
                    key={number}
                    className={style.numbers}>
                        {number}
                    </button>
                ))
            }
            <button className={style.arrow} onClick={(e) => paginationNext(e)}>Next {'>'} </button>
        </div>
    )
}
