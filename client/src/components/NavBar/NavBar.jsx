import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

export default function NavBar(){
    return(
        <div className={style.container}>
            <div className={style.filtros}>
                <div>
                    <button className={style.btn}>A-Z</button>
                    <button className={style.btn}>A-Z</button>
                </div>
                <div className={style.custom_select}>
                    <select>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
            </div>
            <SearchBar />
        </div>
    )
}