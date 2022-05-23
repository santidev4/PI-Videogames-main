const initialState = {
    videogames: [],
    genres: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            };
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            };
        case 'FILTER_BY_GENRE':
            const filteredVideogames = state.videogames.filter(el => el.genres.includes(action.payload))


            return{
                ...state,
                videogames: filteredVideogames
            }
    
        default:
            return state;
    }
};

export default rootReducer;