import React from "react";
import style from "../Card/Card.module.css";

export default function Card({name, img, genres}){
    
    return(
        <div className={style.card}>
            <figure>
                <img src={img} alt=""/>
            </figure>
            <div className={style.contenido}>
                <h3> {name} </h3>
                <span> {
                    genres?.map(el=> {
                        return `${el} `
                    })
                } </span>           
            </div>
        </div> 
    )
}