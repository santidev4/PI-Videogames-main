import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
import { getGenres, getVideogames } from "../../redux/actions";
import style from "../CreateVideogame/CreateVideogame.module.css"

export default function CreateVideogame(){

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const videogames = useSelector(state => state.videogames);

    const platforms = [...new Set(videogames.reduce((r, a) => r.concat(a.platforms), []))];


    // const navigate = useNavigate();

    let [input, setInput] = useState({
        name: '',
        releaseDate: '',
        img: '',
        genres: [],
        platforms: [],
        description: '',
        rating: 0
    })

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log('input', input)
    }
    
    const [ starState, setStarState ] = useState({
        stars: [1, 2, 3, 4, 5],
        rating: 0,
        hovered: 0,
        selectedIcon: "★",
        deselectedIcon: "☆"
    })
    const changeRating = (newRating) => {
        setStarState({
            ...starState,
            rating: newRating
        });
        setInput({
            ...input,
            rating: newRating
        })
        console.log('rating', input)
    }
    const hoverRating = (rating) => {
        setStarState({
            ...starState,
            hovered: rating
        });
    };
    const { stars, rating, hovered, deselectedIcon, selectedIcon } = starState;
    
    const handleGenres = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
    const handlePlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    
    return(
        <>
            <div className={style.form_container}>
                <div className={style.form_card}>
                    <form action="">

                        <div className={style.first_column}>
                            <div className={style.single_input}>
                                <label htmlFor="">Name</label>
                                <input type="text" value={input.name} name='name' className={style.name_input} onChange={(e)=> handleChange(e)} />
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Release Date</label>
                                <input type="date" value={input.releaseDate} name='releaseDate' className={style.date_input} onChange={(e)=> handleChange(e)}/>
                            </div>
                        </div>

                        <div className={style.second_column}>  
                            <div className={style.single_input}> 
                                <label htmlFor="">Genres</label>
                                <select name="genres" id="" className={style.genres_select} onChange={(e) => handleGenres(e)}>
                                    {
                                        genres?.map(el =>(
                                            <option value={el.name} name='genres' key={el.id}> {el.name} </option>

                                        ))
                                    }
                                </select>
                                <div className={style.selected_options}>
                                    {
                                        input.genres?.map(el =>{
                                            return(
                                                <button className={style.btn_selected}> {el} </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Platforms:</label>
                                <select name="platforms" id="" className={style.platforms_input} onChange={(e) => handlePlatforms(e)} >
                                {
                                    platforms?.map(el =>(
                                        <>
                                            {/* <label htmlFor="">{el }</label>
                                            <input type="checkbox" name='name' /> */}
                                            <option value={el}> {el} </option>
                                        </>
                                    ))
                                }
                                </select>

                                <div className={style.selected_options}>
                                {
                                    input.platforms?.map(el => {
                                        return(
                                                    <button className={style.btn_selected}> {el} </button>
                                        )
                                    })
                                }
              
                                </div>

                            </div>
                        </div>

                        <div className={style.third_column} >
                            <label htmlFor="">Description</label>
                            <textarea type="text" name='description' className={style.description_input} onChange={(e)=> handleChange(e)}/>
                        </div>
                        <div className={style.fourth_column} >
                            <label htmlFor="img">img url</label>
                            <input type="text"  name="img" className={style.img_url} onChange={(e)=> handleChange(e)}/>
                        </div>
                        <div>
                            <div className={style.rating}  >
                                <p htmlFor="" className={style.rating_title} >Rating</p>
                                {stars.map(star => {
                        return (
                            <span
                                key={star}
                                style={{ cursor: 'pointer' }}
                                onClick={() => { changeRating(star); }}
                                onMouseEnter={() => { hoverRating(star); }}
                                onMouseLeave={() => { hoverRating(0); }}
                                
                            >
                                {rating < star ?
                                    hovered < star ? deselectedIcon : selectedIcon
                                    :
                                    selectedIcon
                                }
                            </span>
                        );
                    })}
                            </div>
                        </div>
                        

                        <div className={style.div_create}>
                            <button className={style.btn_create}>Crear</button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}