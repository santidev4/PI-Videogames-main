import React from "react";
import style from "../Error404/Error404.module.css"

export default function Error404(){
    return(
        <div className={style.container}>
            <h1 className={style.error}>
                404
            </h1>
            <h3 className={style.message}>
                Juego no encontrado
            </h3>
        </div>
    )
}