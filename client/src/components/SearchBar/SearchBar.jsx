import React from "react";
import style from "../SearchBar/SearchBar.module.css"
 
export default function SearchBar(){
    return(
        <div className={style.box}>
            <form>
                <input type="text" placeholder="Search..." />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}