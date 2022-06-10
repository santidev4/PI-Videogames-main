import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../redux/actions";
import { useEffect } from "react";
import style from "../Detail/Detail.module.css"
import Loader from "../Loader/Loader"


export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams();
    // const [videogame, setVideogame] = React.useState([]); 
    // const data = useSelector(state => state.detail);
    const videogame = useSelector(state => state.detail);


    console.log(videogame);
    console.log(id);
    
    useEffect(() => {
        dispatch(getDetail(id));
        return ()=> dispatch(resetDetail())
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
            <hr/>
            {
                videogame.length ?
                <div className={style.container}>
                    <div className={style.card}>
                        <h2> {videogame[0].name} </h2>
                        <img src={videogame[0].img} alt="" />
                    </div>
                    <div className={style.info}>
                        <div className={style.description}>
                            <h2>Description</h2>
                            <div dangerouslySetInnerHTML={{ __html: videogame[0].description }} />
                        </div>
                        
                        <div className={style.data}>
                            <div className={style.title}>
                                <h4>Platforms</h4>
                                { videogame[0].platforms.map(el => {
                                    return <span>{el}</span>
                                } )}
                            </div>
                            <div className={style.title}>
                                <h4>Genres</h4>
                                { videogame[0].genres.map(el => {
                                    return <span>{el}</span>
                                } )}
                            </div>
                            <div className={style.title}>
                                <h4>Released Date</h4>
                                <span>{ videogame[0].released}</span>
                            </div>
                            <div className={style.title}>
                                <h4>Rating</h4>
                                <span>⭐️{ videogame[0].rating }</span>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loader/>
            }
        </>
    )
}