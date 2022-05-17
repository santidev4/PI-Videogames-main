import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar"


export default function Home(){
    
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    const tenVideogames = allVideogames.slice(0, 10);

    return(
        <>
            <NavBar />
            <Cards data={tenVideogames} />
        </>
    )
}