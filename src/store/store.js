import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import {stayReducer} from "../store/stay.reducer.js"

// const { createStore, combineReducers } = Redux
// const { applyMiddleware } = Redux
// const thunk = ReduxThunk.default


const rootReducer = combineReducers({
    stayModule : stayReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
