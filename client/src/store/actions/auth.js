import axios from "axios";

import { URL } from '../../shared/utility';
import * as actionTypes from "../actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = ( { isAuth, user, error = null } ) => {
  const expirationDate = null;
  localStorage.setItem( "expirationDate", expirationDate ); //TODO need to implement session expiration
  localStorage.setItem( "user", user );
  localStorage.setItem( "token", user.token );
  
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: user.token,
    isAuth: isAuth,
    user: user,
    error: null,
  };
};

export const authFail = errMssg => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: errMssg,
    isAuth: false,    
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    isAuth: false,
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(URL + "/user/login", { email, password })
      .then( response => {
        if ( response.data.isAuth )
        {
          dispatch( authSuccess( response.data ) );
        }  
        else
        {
          dispatch(authFail(response.data.message));  
        }  
      })
      .catch( err => {
        dispatch(authFail(err));
      });
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authStart());
      
    const token = localStorage.getItem( "token" );
    if (!token) {
        dispatch(logout());
      }
    else {
      axios
        .post( URL + "/user/logout", { token } )
        .then( response => {
          dispatch( logout( response.data.success ) );
        } )
        .catch( err => {
          dispatch( authFail( err.response.data.error ) );
        } );
      }
    };
};

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem( "token" );
    
    if (!token) {
      dispatch(logout());
    }
    else
    {
      axios
        .then( response => {
          dispatch( authSuccess( response.data ) );
        } )
        .catch( err => {
          dispatch( authFail( err.response.data.error ) );
        } );
    }
  };
};

export const authRegister = ( user ) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(URL + "/user/register", { user })
      .then(response => {
        if (response.data.isAuth) {
          dispatch(authSuccess(response.data));
        }
        else {
          dispatch(authFail(response.data.error));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authConfirmRegisteration = id => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${URL}/user/confirmregisteration?id=${id}`)
      .then(response => {
        if ( response.data.isAuth ) {
          console.log(response.data);
          dispatch(authSuccess(response.data));
        } else {
          dispatch(authFail(response.data.error));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};