import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "../Cards/Cards.module.css"
import Error404 from "../Error404/Error404";


export default function Cards({data}){

    console.log('data', data)

    return(
        <div className={style.card_container}>
        
            {
                Array.isArray(data) ? data.map((el, i) => (
                    <Link to={`/card/${el.id}`}>
                        <Card 
                        name={el.name} 
                        img={el.img} 
                        genres={el.genres} 
                        key={el.id}
                         />
                    </Link>
                ))
                : <Error404 />
            }
        </div>
    )
}