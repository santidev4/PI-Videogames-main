import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";


export default function Home(){
    const videogames = useSelector(state => state.videogames)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getVideogames())
    })

    console.log(videogames);

    return(
        <>
        </>
    )
}