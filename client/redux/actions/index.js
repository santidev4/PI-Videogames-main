import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        const videogames = await axios('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: videogames.data
        })
    }
}