import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions"

export default function Cards(){
    const videogames = useSelector(state => state.videogames);
    const dispatch = useDispatch();

    
    useEffect(()=> {
        dispatch(getVideogames())
    }, [dispatch])
    

    const tenVideogames = videogames.slice(0,10);
    console.log('tenVideogames', tenVideogames)
    return(
        <>
            {
                tenVideogames.map((el, i) => (

                    <Card name={el.name} img={el.img} genres={el.genres} key={i}/>
                ))
            }
        </>
    )
}