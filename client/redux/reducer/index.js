const initialState = {
    videogames: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
    
        default:
            break;
    }
}