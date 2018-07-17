import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  isAuth: false,
  token: null,
  user: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  selectedTab: 0
};

const authStart = ( state, action ) => {
  return updateObject(state, { error: null, loading: true });
};

// const authLogin = ( state, action ) => {
//   return updateObject( state, {
//     isAuth: action.isAuth,
//     token: action.user.token,
//     user: action.user,
//     error: null,
//     loading: false
//   });
// };

const authSuccess = ( state, action ) => {
  
  return updateObject(state, {
    isAuth: action.isAuth,
    token: action.user.token,
    user: action.user,
    error: null,
    loading: false
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {
    isAuth: false,
    token: null,
    user: null,
    error: null,
    loading: false,
    selectedTab: 0
  });
};
const authTabChange = ( state, action ) => {
  return updateObject(state, {
    selectedTab: action.selectedTab,
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

const authCheck = ( state, action ) => {
  return updateObject(state, {
    isAuth: action.isAuth,
    token: action.user.token,
    user: action.user,
    error: null,
    loading: false
  });
};

const authReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.AUTH_START: return authStart( state, action );
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_FAIL: return authFail( state, action );
    case actionTypes.AUTH_CHECK: return authCheck(state, action);
    case actionTypes.AUTH_REGISTER: return authSuccess(state, action);
    case actionTypes.AUTH_CONFIRM_REGISTER: return authSuccess(state, action);
    case actionTypes.AUTH_TAB_CHANGE: return authTabChange(state, action);

    default:
      return state;
    }
};

export default authReducer;