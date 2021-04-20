import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from '../reducers/index';

const initialState = {};


const store = createStore(
    rootReducers,
    initialState,
    compose(

        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;