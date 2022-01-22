import { userService } from "../services/user.service";

export function signingUp(user) {
    return async (dispatch) => {
        const currUser = await userService.signup(user)
        const action = { type: 'SET_USER', user: currUser };
        dispatch(action)
    }
}

export function signingIn(user) {
    return async (dispatch) => {
        const currUser = await userService.login(user)
        const action = { type: 'SET_USER', user: currUser };
        dispatch(action)
    }
}

export function signOut() {
    return async (dispatch) => {
        await userService.logout()
        const action = { type: 'SET_USER', user: null };
        dispatch(action)
    }
}