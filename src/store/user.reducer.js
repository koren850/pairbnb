import {userService} from '../services/user.service'
const initialState = {
	user: userService.getLoggedinUser() || {},
};

export function userReducer(state = initialState, action) {
	let newState = state;
	switch (action.type) {
		case 'SET_USER':
			newState = { user: action.user }
			break;
		default:
		}
		return newState;
}