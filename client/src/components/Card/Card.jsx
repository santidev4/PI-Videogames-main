import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";

export default function Card({name, img, genre}){

    const allVideogames = useSelector(state => state.videogames)
    console.log(allVideogames);
    
    return(
        <div>
            <img src={img} alt="" />
            <h3> {name} </h3>
            <span> {genre} </span>
        </div> 
    )
}