const initialState = {
    videogames: [],
    allVideogames: [],
    genres: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            };
        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogames;
            let filteredVideogamesByGenre;
            if(action.payload === 'All') filteredVideogamesByGenre = allVideogames;
            else filteredVideogamesByGenre = allVideogames.filter(el => el.genres.includes(action.payload));

            return{
                ...state,
                videogames: filteredVideogamesByGenre
            }
    
        default:
            return state;
    }
};

export default rootReducer;