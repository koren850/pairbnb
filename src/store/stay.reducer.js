const initialState = {
    stays : [],
    filterBy : null,
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
        case 'SET_FILTER':
            newState = { ...state, filterBy: { ...action.filterBy } }
            break;
            default:
    }
	return newState;
}
