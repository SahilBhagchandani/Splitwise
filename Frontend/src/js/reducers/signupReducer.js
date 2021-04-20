import { USER_SIGNUP } from '../constants/index-types';

const initialState ={
    user : []
}

function rootReducer(state = initialState, action) {
    if (action.type === USER_SIGNUP) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        user: state.user.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;