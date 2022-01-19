const initialState = {
    stays : [],
};

export function stayReducer(state = initialState, action) {
	let newState = state;
    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, stays: [...action.stays] }
            break;
        case 'ADD_TOY':
            newState = { ...state, stays: [action.newstay, ...state.stays] }
            break;
        case 'UPDATE_TOY':
            newState = {
                ...state, stays: state.stays.map(stay => {
                    return (stay._id === action.updatedToy._id) ? action.updatedToy : stay
                })
            }
            break;
        case 'REMOVE_TOY':
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
