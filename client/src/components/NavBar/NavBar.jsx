import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

// Filtros: por genero - creados o existentes
// Ordenamientos: A-Z asc-desc  -   rating asc-desc

export default function NavBar({genres, handleFilterByGenre, handleSortByName, handleSortByRating}){
    return(
        <div className={style.container}>
            <div className={style.filtros}>
                <div >
                    <button className={style.btn} value='ASC' onClick={(e) => handleSortByName(e)}>A - Z ↑</button>
                    <button className={style.btn} value='DESC' onClick={(e) => handleSortByName(e)}>Z - A ↓</button>
                </div>

                {/* <select onChange={(e) => handleSortByName(e)}>
                    <option className={style.btn} value='ASC' >A - Z ↑</option>
                    <option className={style.btn} value='DESC' >Z - A ↓</option>
                </select> */}

                <div className={style.custom_select}>
                    <select onChange={(e) => handleFilterByGenre(e)}>
                        <option value="All">All</option>
                        {
                            genres?.map(el => (
                                <option value={el.name} key={el.id}> {el.name} </option>
                            ))
                        }
                    </select>
                </div>
                <div >
                    
                    <button className={style.btn} value='ASC' onClick={(e) => handleSortByRating(e)} >Rating ↑</button>
                    <button className={style.btn} value='DESC' onClick={(e) => handleSortByRating(e)} >Rating ↓</button>
                </div>
            </div>
            <SearchBar />
        </div>
    )
}