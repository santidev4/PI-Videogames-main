// @ts-check
import React from "react";
import { useSelector } from "react-redux";

export default function Card({name, img, genre}){

    const allVideogames = useSelector(state => state.videogames)

    return(
        <div>
            <img src={img} alt="" />
            <h3> {name} </h3>
            <span> {genre} </span>
        </div> 
    )
}