import { USER_LOGIN } from '../constants/index-types';

const initialState ={
    user : []
}

function rootReducer(state = initialState, action) {
    if (action.type === USER_LOGIN) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        user: state.user.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;