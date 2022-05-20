import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

// Filtros: por genero - creados o existentes
// Ordenamientos: A-Z asc-desc  -   rating asc-desc

export default function NavBar({genres}){

    console.log('genres', genres[0])

    return(
        <div className={style.container}>
            <div className={style.filtros}>
                <div>
                    <button className={style.btn} value='ASC'>A - Z ↑</button>
                    <button className={style.btn} value='DESC' >Z - A ↓</button>
                </div>
                <div className={style.custom_select}>
                    <select>
                        {/* <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option> */}
                        {
                            genres?.map(el => (
                                <option value={el.name} key={el.id}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button className={style.btn} value='ASC'>Rating ↑</button>
                    <button className={style.btn} value='DESC' >Rating ↓</button>
                </div>
            </div>
            <SearchBar />
        </div>
    )
}