import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  isAuth: false,
  token: null,
  user: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authStart = ( state, action ) => {
  return updateObject(state, { error: null, loading: true });
};

const authLogin = ( state, action ) => {
  return updateObject( state, {
    isAuth: action.isAuth,
    token: action.user.token,
    user: action.user,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authCheck = (state, action) => {
  return updateObject(state, {
    login: action.payload
  });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.AUTH_SUCCESS: return authLogin(state, action);
      case actionTypes.AUTH_FAIL: return authFail( state, action );
      case actionTypes.AUTH_CHECK: return authCheck( state, action );

      default:
        return state;
    }
};

export default reducer;