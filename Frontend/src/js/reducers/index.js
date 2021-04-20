import { combineReducers } from 'redux';
// import SignUp from '../../components/SignUp';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';

const rootReducers = combineReducers({
    login: loginReducer,
    signup: signupReducer
})

export default rootReducers;