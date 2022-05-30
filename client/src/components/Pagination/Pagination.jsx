import React from "react";

export default function Pagination({videogamesPerPage, allVideogames, paginationFunction, paginationPrev, paginationNext}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button onClick={(e) => paginationPrev(e)}> {'<'} </button>
            {
                pageNumbers?.map(number => (
                    <button 
                    onClick={() => paginationFunction(number)}
                    key={number}
                    className="">
                        {number}
                    </button>
                ))
            }
            <button onClick={(e) => paginationNext(e)}> {'>'} </button>
        </div>
    )
}
