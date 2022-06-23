import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterByGenres, sortByName, sortByRating, filterByName, filterCreated } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import Loader  from "../Loader/Loader";
import FilterAndSorts from "../FilterAndSorts/FilterAndSorts";


export default function Home(){
    
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const genres = useSelector(state => state.genres);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);

    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    let data = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    useEffect(() => {
        // if(!allVideogames.length){
            dispatch(getVideogames());
        // }
        dispatch(getGenres());
    }, []);
    
    
    // Paginado
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

    // handlers
    const handleFilterByGenre = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        // setCurrentPage(1)
    }
    
    const handleSortByName = (e) => {
        e.preventDefault();
        // setCurrentPage(1);
        dispatch(sortByName(e.target.value))
    }

    const handleSortByRating = (e) => {
        e.preventDefault();
        // setCurrentPage(1);
        dispatch(sortByRating(e.target.value))
    }

    const [name, setName] = React.useState('');

    const handleInputChange = (e) => {
        setName(e.target.value)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // setCurrentPage(1);
        dispatch(filterByName(name));
        setName('');        
    };

    const handleFilterCreated = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterCreated(e.target.value))
    };

    console.log('data', data)
    
    return(
        <>
            <NavBar 
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}/>

            <FilterAndSorts 
            genres={genres}
            handleFilterByGenre={handleFilterByGenre}
            handleSortByName={handleSortByName} 
            handleSortByRating={handleSortByRating}
            handleFilterCreated={handleFilterCreated} />
            
          
            {   
                data.length ? 
                 
                <>

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction}
            paginationPrev={paginationPrev}
            paginationNext={paginationNext}
            currentPage={currentPage} />

            <Cards 
            data={data} />

            <Pagination 
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginationFunction={paginationFunction}
            paginationPrev={paginationPrev}
            paginationNext={paginationNext}
            currentPage={currentPage} />

            </>  

            :
            <Loader/> 
            
            }


        </>
    )
}