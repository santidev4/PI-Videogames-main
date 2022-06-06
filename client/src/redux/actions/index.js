import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        try {
            const videogames = await axios('http://localhost:3001/videogames');
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: videogames.data
            })
        } catch (error) {
            console.log('error', error)
        }
    }
};

export function getGenres(){
    return async function(dispatch){
        try {
            const genres = await axios('http://localhost:3001/genres');
            return dispatch({
                type: 'GET_GENRES',
                payload: genres.data
            })
        } catch (error) {
            console.log('error', error)
        }
    }
};

export function filterByGenres(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
};

export function sortByName(payload){
    return{
        type: 'SORT_BY_NAME',
        payload
    };
};

export function sortByRating(payload){
    return{
        type: 'SORT_BY_RATING',
        payload
    };
};

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
};

export function filterByName(payload){
    return async function(dispatch){
        try {
            let response = await axios(`http://localhost:3001/videogames?name=${payload}`);
            let videogame = response.data
            return{
                type: 'FILTER_BY_NAME',
                payload: videogame
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}