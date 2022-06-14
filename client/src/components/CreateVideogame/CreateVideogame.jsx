import React, { useEffect } from "react";
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

    // let [input, setInput] = useState({
    //     name: '',
    //     releasedDate: '',
    //     genres: [],
    //     platforms: [],
    //     description: '',
    //     rating: 0
    // })

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [])


    return(
        <>
            <div className={style.form_container}>
                <div className={style.form_card}>
                    <form action="">
                        <div className={style.first_column}>
                            <div className={style.single_input}>
                                <label htmlFor="">Name</label>
                                <input type="text" name='name' className={style.name_input} />
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Release Date</label>
                                <input type="date" name='name' className={style.date_input} />
                            </div>
                        </div>

                        <div className={style.second_column}>  
                            <div className={style.single_input}> 
                                <label htmlFor="">Genres</label>
                                <select name="" id="" className={style.genres_select} >
                                    {
                                        genres?.map(el =>(
                                            <option value={el.name}> {el.name} </option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className={style.single_input}>
                                <label htmlFor="">Platforms:</label>
                                <select name="" id="" className={style.platforms_input} >
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
                            </div>
                        </div>

                        <div className={style.third_column} >
                            <label htmlFor="">Description</label>
                            <textarea type="text" name='name' className={style.description_input} />
                        </div>
                        <div className={style.fourth_column} >
                            <label htmlFor="img">img url</label>
                            <input type="text" className={style.img_url}/>
                        </div>
                        <div>
                            <div className={style.rating} >
                                <input type="radio" name="rating" value="5" className={style.five} /><label for="5">☆</label>
                                <input type="radio" name="rating" value="4" className={style.four}/><label for="4">☆</label>
                                <input type="radio" name="rating" value="3" className={style.three}/><label for="3">☆</label>
                                <input type="radio" name="rating" value="2" className={style.two}/><label for="2">☆</label>
                                <input type="radio" name="rating" value="1" className={style.one}/><label for="1">☆</label>
                                <p htmlFor="" className={style.rating_title} >Rating</p>
                            </div>
                        </div>
                        

                        <div className={style.btn_create}>
                            <button >Crear</button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}