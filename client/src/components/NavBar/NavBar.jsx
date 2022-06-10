import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"
import { Link } from "react-router-dom";

export default function NavBar({handleInputChange, handleSubmit}){
    
    return(
        <div className={style.container}>
            
            <SearchBar
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit} />

            <Link to="/create">
                <button>Create</button>
            </Link>
        </div>
    )
}