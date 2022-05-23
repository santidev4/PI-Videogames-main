import React from "react";

export default function Pagination({videogamesPerPage, allVideogames, paginationFunction}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
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
        </div>
    )
}
