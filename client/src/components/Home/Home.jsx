import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getVideogames } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar"


export default function Home(){

    return(
        <>
            <NavBar />
            <Cards />
        </>
    )
}