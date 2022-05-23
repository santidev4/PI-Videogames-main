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

    // eslint-disable-next-line
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line 
    const [videogamesPerPage, setVidegoamesPerPage] = useState(15);

    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

    useEffect(() => {
        dispatch(getVideogames());
        return()=>{}
    }, [dispatch, currentPage]);
    
    useEffect(()=>{
        dispatch(getGenres());
    }, [dispatch]);
    
    const paginationFunction = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    // useEffect(()=>{

    //     return()=>{}
    // }, [currentPage])

    const data = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    
    return(
        <>
            <NavBar genres={genres} />

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction} />

            <Cards data={data} />

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction} />
        </>
    )
}