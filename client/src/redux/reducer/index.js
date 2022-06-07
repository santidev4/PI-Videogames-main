const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: []
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
            const allVideogames = state.allVideogames;
            let filteredVideogamesByGenre;
            if(action.payload === 'All') filteredVideogamesByGenre = allVideogames;
            else filteredVideogamesByGenre = allVideogames.filter(el => el.genres.includes(action.payload));

            return{
                ...state,
                videogames: filteredVideogamesByGenre
            };
        case 'SORT_BY_NAME':
            let sortedVideogames;
            if(action.payload === 'ASC'){
                sortedVideogames = state.videogames.slice(0).sort((a, b) => {
                    if(a.name < b.name) return -1;
                    else if(a.name > b.name) return 1;
                    else return 0
                })
            }
            else{
                sortedVideogames = state.videogames.slice(0).sort((a, b) => {
                    if(a.name > b.name) return -1;
                    else if(a.name < b.name) return 1;
                    else return 0
            })} 
            return{
                ...state,
                videogames: sortedVideogames
            };
        case 'SORT_BY_RATING':
            let sortedByRating;
            if(action.payload === 'ASC') sortedByRating = state.videogames.slice(0).sort((a, b) => {
                if(a.rating < b.rating) return -1
                else if(a.rating > b.rating) return 1
                else return 0;
            });
            else sortedByRating = state.videogames.slice(0).sort((a, b) => {
                if(a.rating < b.rating) return 1;
                else if(a.rating > b.rating) return -1;
                else return 0;
            });

            return{
                ...state,
                videogames: sortedByRating
            };
        case 'FILTER_CREATED':
            const allVideogames1 = state.allVideogames;
            let filteredByCreated;
            if(action.payload === 'All')    filteredByCreated = allVideogames1;
            else if(action.payload === 'Created')   filteredByCreated = allVideogames1.filter(el => el.fromDb);
            else if(action.payload === 'Api')   filteredByCreated = allVideogames1.filter(el => !el.fromDb);
            

            return{
                ...state,
                videogames: filteredByCreated
            }
        case 'FILTER_BY_NAME':
            return{
                ...state,
                videogames: action.payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: [action.payload]
            }
        default:
            return state;
    }
};

export default rootReducer;