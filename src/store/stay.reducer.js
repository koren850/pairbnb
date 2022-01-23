const initialState = {
    stays: [],
    filterBy: null,
    stayType: null,
    stayPrice: {
        minPrice: 0,
        maxPrice: 1000,
    },
    searchParams: null,
};

export function stayReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case 'SET_STAYS':
            newState = { ...state, stays: [...action.stays] }
            break;
        case 'ADD_STAY':
            newState = { ...state, stays: [action.newstay, ...state.stays] }
            break;
        case 'UPDATE_STAY':
            newState = {
                ...state, stays: state.stays.map(stay => {
                    return (stay._id === action.updatedSTAY._id) ? action.updatedSTAY : stay
                })
            }
            break;
        case 'REMOVE_STAY':
            let stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays }
            break;
        case 'SET_PARAMS':
            console.log(action)
            newState = { ...state, searchParams: { ...action.searchParams } }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break;
        case 'SET_STAY_TYPE':
            newState = { ...state, stayType: { ...action.stayType } }
            break;
        case 'SET_STAY_RANGE':
            newState = { ...state, stayPrice: { ...action.stayPrice } }
            break;
        case 'TOGGLE_HEADER_LAYOUT':
            newState = { ...state, headerLayoutSmall: action.set }
            break;
        default:
    }
    return newState;
}
