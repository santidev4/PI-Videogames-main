import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { getGenres, getVideogames, createVideogame } from "../../redux/actions";
import style from "../CreateVideogame/CreateVideogame.module.css"

export default function CreateVideogame(){

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const videogames = useSelector(state => state.videogames);

    const platforms = [...new Set(videogames.reduce((r, a) => r.concat(a.platforms), []))];


    const navigate = useNavigate();

    let [input, setInput] = useState({
        name: '',
        released: '',
        img: '',
        genres: [],
        platforms: [],
        description: '',
        rating: 0
    });

    const [errors, setErrors] = useState({
        name: '',
        platforms: '',
        genres: '',
        released: '',
        description: '',
        rating: '',
        img: '',
    });

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch]);

    const validate = (input) => {
        // const errors = {};
        !input.name ? errors.name = 'Se debe completar un nombre' : errors.name = ''
        !input.platforms.length ? errors.platforms = 'Se debe elegir al menos una plataforma': errors.platforms = ''
        !input.genres.length ? errors.genres = 'Se debe elegir al menos un genero' : errors.genres = ''
        
        if(!input.released) errors.released = 'Debe elegir una fecha'
        else if(input.released.slice(0, 4) < 1960) errors.released = 'Elija un año a partir de 1960'
        else if(input.released.slice(0, 4) > 2022) errors.released = 'Elija un año menor a 2023'
        else errors.released = '';

        !input.description ? errors.description = 'Se debe escribir una descripcion' : errors.description = ''
        input.rating === 0 ? errors.rating = 'Se debe dar un rating' : errors.rating = '';
        !input.img ? errors.img = 'Se debe agregar una imagen' : errors.img = ''
    
        console.log('errors', errors);
        return errors;
    };

    const handleChange = (e) => {
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));

        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log('input', input)
    }
    
    // Rating

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
        setErrors(validate({
            ...input,
            rating: newRating
        }))
        setInput({
            ...input,
            rating: newRating
        })
    }
    const hoverRating = (rating) => {
        setStarState({
            ...starState,
            hovered: rating
        });
    };
    const { stars, rating, hovered, deselectedIcon, selectedIcon } = starState;
    
    const handleGenres = (e) => {
        if(!input.genres.includes(e)){
            setInput({
                ...input,
                genres: [...new Set([...input.genres, e.target.value])]
            })
        };
    };
    const handlePlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        })
    };
    const handleDeleteGenre = (e) => {
        // e.preventDefault();
        console.log('e', e)
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e)
        });
    };

    const handleDeletePlatform = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== e)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('input', input);
        dispatch(createVideogame(input))
        alert('Videogame Creado');
        setInput({
            name: '',
            released: '',
            img: '',
            genres: [],
            platforms: [],
            description: '',
            rating: 0
        });
        navigate('/home')
    };
    
    return(
        <>
            <div className={style.form_container}>
                <div className={style.form_card}>
                    <form action="" >

                        <div className={style.first_column}>
                            <div className={style.single_input}>
                                <label htmlFor="">Name</label>
                                <input 
                                type="text" 
                                value={input.name} 
                                name='name' 
                                className={style.name_input} 
                                onChange={(e)=> handleChange(e)} />
                                {
                                    errors.name && <p className={style.errors}> {errors.name} </p>
                                }
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Release Date</label>
                                <input 
                                type="date" 
                                min="1960-01-01" max="2022-12-31"
                                value={input.released} 
                                name='released' 
                                className={style.date_input} 
                                onChange={(e)=> handleChange(e)} />
                                {
                                    errors.released && <p className={style.errors}> {errors.released} </p>
                                }
                            </div>
                        </div>

                        <div className={style.second_column}>  
                            <div className={style.single_input}> 
                                <label htmlFor="">Genres</label>
                                <select 
                                name="genres" 
                                id="" 
                                className={style.genres_select} 
                                onChange={(e) => handleGenres(e)}
                                disabled={input.genres.length < 3 ? false : true} >
                                <option selected disabled>Genres</option>
                                    {
                                        genres?.map(el =>(
                                            <option value={el.name} name='genres' key={el.id}> {el.name} </option>

                                        ))
                                    }
                                </select>
                                    {
                                        errors.genres && <p className={style.errors}> {errors.genres} </p>
                                    }
                                <div className={style.selected_options}>
                                    {
                                        input.genres?.map((el, i) =>{
                                            return(
                                                
                                                <span key={i} 
                                                className={style.btn_selected} 
                                                onClick={() => handleDeleteGenre(el)}
                                                name="genres"
                                                value={el} > 
                                                {el} 
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Platforms:</label>
                                <select 
                                name="platforms" 
                                id="" 
                                className={style.platforms_input} 
                                onChange={(e) => handlePlatforms(e)}
                                disabled={input.platforms.length < 3 ? false : true} >
                                <option selected disabled>Platforms</option>
                                {
                                    platforms?.map(el =>(
                                        <>
                                            <option value={el}> {el} </option>
                                        </>
                                    ))
                                }
                                </select>
                                    {
                                        errors.platforms && <p className={style.errors}> {errors.platforms} </p>
                                    }
                                <div className={style.selected_options}>
                                {
                                    input.platforms?.map((el, i) => {
                                        return(
                                                    <span key={i} 
                                                    className={style.btn_selected} 
                                                    onClick={() => handleDeletePlatform(el)}
                                                    name='platforms'
                                                    value={el} > 
                                                    {el} 
                                                    </span>                                        
                                                )
                                    })
                                }
                                </div>

                            </div>
                        </div>

                        <div className={style.third_column} >
                            <label htmlFor="">Description</label>
                            <textarea 
                            type="text" 
                            name='description' 
                            className={style.description_input} 
                            onChange={(e)=> handleChange(e)}/>
                            {
                                errors.description && <p className={style.errors}> {errors.description} </p>
                            }
                        </div>
                        <div className={style.fourth_column} >
                            <label htmlFor="img">img url</label>
                            <input 
                            type="text" 
                            name="img" 
                            className={style.img_url} 
                        onChange={(e)=> handleChange(e)}/>
                            {
                                errors.img && <p className={style.errors}> {errors.img} </p>
                            }
                        </div>
                        <div>
                            <div className={style.rating}  >
                                <p htmlFor="" className={style.rating_title} >Rating</p>
                                {
                                    stars.map(star => {
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
                                    })
                                }
                        {
                            errors.rating && <p className={style.errors}> {errors.rating} </p>
                        }
                            </div>
                        </div>
                        

                        <div className={style.div_create}>
                            <button 
                            type="submit"
                            className={ Object.values(input).some(e => e === '' || e === [] || e === 0) ? style.btn_createDisabled : style.btn_create}
                            onClick={(e)=> handleSubmit(e)}
                            disabled={Object.values(input).some(e => e === '' || e === [] || e === 0)} >
                            Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}