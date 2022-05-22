import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";


export default function Home(){
    
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVidegoamesPerPage] = useState(15);

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);
    
    useEffect(()=>{
        dispatch(getGenres());
    }, [dispatch]);
    
    const paginationFunction = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const tenVideogames = allVideogames.slice(0, 15);

    
    return(
        <>
            <NavBar genres={genres} />
            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction} />
            <Cards data={tenVideogames} />
        </>
    )
}