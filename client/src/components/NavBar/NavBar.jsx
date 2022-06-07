import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

export default function NavBar({handleInputChange, handleSubmit}){
    
    return(
        <div className={style.container}>
            
            <SearchBar
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit} />
        </div>
    )
}