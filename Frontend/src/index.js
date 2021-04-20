import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./js/store/index";
import rootReducers from './js/reducers';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

// const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//render App component on the root element
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
