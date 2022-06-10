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
        dispatch(getGenres())
        dispatch(getVideogames())
    }, [])

    // console.log('genres', genres)
    // console.log('videogames', videogames)

    return(
        <>
            <div className={style.form_container}>
                <div className={style.form_card}>
                    <form action="">
                        <div className={style.firstColumn}>
                            <div>
                                <label htmlFor="">Name</label>
                                <input type="text" name='name' />
                            </div>
                            <div>
                                <label htmlFor="">Release Date</label>
                                <input type="date" name='name' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Name</label>
                            <select name="" id="">
                                {
                                    genres?.map(el =>(
                                        <option value={el.name}> {el.name} </option>

                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Platforms:</label>
                            {
                                platforms?.map(el =>(
                                    <>
                                        <label htmlFor="">{el }</label>
                                        <input type="checkbox" name='name' />
                                    </>
                                ))
                            }
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <input type="text" name='name' />
                        </div>
                        <div>
                            <label htmlFor="">Rating</label>
                            <input type="text" name='name' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}