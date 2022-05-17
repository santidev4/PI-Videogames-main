import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

export default function NavBar(){
    return(
        <>
            <SearchBar />
            <button className={style.btn}>A-Z</button>
        </>
    )
}