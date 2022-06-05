import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

// Filtros: por genero - creados o existentes
// Ordenamientos: A-Z asc-desc  -   rating asc-desc

export default function NavBar({handleSearchByName}){
    
    return(
        <div className={style.container}>
            
            <SearchBar
            handleSearchByName={handleSearchByName} />
        </div>
    )
}