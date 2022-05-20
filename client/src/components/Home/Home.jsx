import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar"


export default function Home(){
    
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);
    
    useEffect(()=>{
        dispatch(getGenres());
    }, [dispatch]);
    
    
    
    const tenVideogames = allVideogames.slice(0, 5);

    
    return(
        <>
            <NavBar genres={genres} />
            <Cards data={tenVideogames} />
        </>
    )
}