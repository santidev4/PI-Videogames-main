import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail, deleteVideogame, getVideogames } from "../../redux/actions";
import { useEffect } from "react";
import style from "../Detail/Detail.module.css"
import Loader from "../Loader/Loader"


export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams();
    const videogame = useSelector(state => state.detail);

    const navigate = useNavigate();

    console.log('videogame', videogame);
    console.log('id', id)

    useEffect(() => {
        dispatch(getDetail(id));
        return ()=> dispatch(resetDetail())
    }, [dispatch, id]);
    
    
    const handleDeleteVideogame = () => {
        // e.preventDefault();
        dispatch(deleteVideogame(id));
        alert('Juego eliminado')
        navigate('/home')
        dispatch(getVideogames())
    };

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

            {
                
                id.includes('-') ? 
                <button onClick={() => handleDeleteVideogame()} >Delete</button>
                : null
            }
        </>
    )
}