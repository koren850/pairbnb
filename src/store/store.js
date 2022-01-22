import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { stayReducer } from "../store/stay.reducer.js";
import { headerReducer } from "../store/header.reducer.js";
import { userReducer } from './userReducer.js';



const rootReducer = combineReducers({
    stayModule: stayReducer,
    headerModule: headerReducer,
    userModule: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
