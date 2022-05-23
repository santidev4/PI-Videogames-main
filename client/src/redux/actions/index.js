import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        const videogames = await axios('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: videogames.data
        })
    }
};

export function getGenres(){
    return async function(dispatch){
        const genres = await axios('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
};

export function filterByGenres(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}