// Ruta de detalle de videojuego: debe contener

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail(){
    const dispatch = useDispatch();
    const videogame = useSelector(state => state.detail);
    const { id } = useParams();

    console.log(videogame);
    console.log(id);

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    // Incluir los géneros asociados
    // [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
    // [ ] Descripción
    // [ ] Fecha de lanzamiento
    // [ ] Rating
    // [ ] Plataformas

    return(
        <>
            <Link to='/home'>
                        <button>
                            Volver
                        </button>
            </Link>

            {
                videogame.length ?
                <div>
                    <img src={videogame[0].img} alt="" />
                    <div dangerouslySetInnerHTML={{ __html: videogame[0].description }} />
                </div>
                : <p></p>
            }
        </>
    )
}