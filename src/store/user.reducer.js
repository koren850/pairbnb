import { userService } from '../services/user.service'
const initialState = {
	user: userService.getLoggedinUser() || {},
	connectionError: {
		fullName: '',
		email: '',
		password: ''
	}
};

export function userReducer(state = initialState, action) {
	let newState = state;
	switch (action.type) {
		case 'SET_USER':
			newState = {...state, user: action.user }
			break;
		case 'UPDATE_INPUTS_ERROR':
			const {key} = action;
			newState = {...state, connectionError:{...state.connectionError, [key]:action.content}}
			break;
		default:
	}
	return newState;
}