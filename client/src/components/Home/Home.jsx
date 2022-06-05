import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterByGenres, sortByName, sortByRating } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import { Loader } from "../Loader/Loader";
import FilterAndSorts from "../FilterAndSorts/FilterAndSorts";


export default function Home(){
    
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);

    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line 
    const [videogamesPerPage, setVidegoamesPerPage] = useState(15);

    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [dispatch]);
    
    // useEffect(()=>{
    // }, [dispatch]);
    

    const paginationFunction = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const paginationPrev = () => {

        if(currentPage > 1) setCurrentPage( currentPage - 1)
    }

    const paginationNext = () => {
        const lastPage = Math.ceil(allVideogames.length/videogamesPerPage)
        if(currentPage < lastPage)  setCurrentPage(currentPage + 1)
    }
    
    
    const data = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    
    const handleFilterByGenre = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
    }
    
    const handleSortByName = (e) => {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        // dispatch(getVideogames())
    }

    const handleSortByRating = (e) => {
        e.preventDefault();
        dispatch(sortByRating(e.target.value))
    }

    
    
    return(
        <>
            <NavBar />

            <FilterAndSorts 
            genres={genres}
            handleFilterByGenre={handleFilterByGenre}
            handleSortByName={handleSortByName} 
            handleSortByRating={handleSortByRating} />
            
            {
                allVideogames.length ? 
            
            <>

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction}
            paginationPrev={paginationPrev}
            paginationNext={paginationNext}
            currentPage={currentPage} />

            <Cards data={data} />

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction} />

            </>

            : <Loader/>

            }


        </>
    )
}