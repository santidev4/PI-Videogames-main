import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import style from "../Cards/Cards.module.css"

export default function Cards(props){
 

    console.log('props', props)
    return(
        <div className={style.card_container}>
        
            {
                props.data?.map((el, i) => (
                    <Link to={`/card/${el.id}`}>
                        <Card name={el.name} img={el.img} genres={el.genres} key={el.id} />
                    </Link>
                ))
            }
        </div>
    )
}