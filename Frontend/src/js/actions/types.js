import { USER_SIGNUP} from "../constants/index-types";
import { USER_LOGIN } from "../constants/index-types";
export function register(payload) {
  console.log("dispatching the action")
  return { type: USER_SIGNUP, payload };
};

export function loginUser(payload){
    console.log("dispatching the action")
    return { type: USER_LOGIN, payload};
}
