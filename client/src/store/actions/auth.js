import axios from "axios";

import { URL } from '../../shared/utility';
import * as actionTypes from "../actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const auth = ( email, password ) => {
  return dispatch => {
    dispatch( authStart() );
    const request = axios
      .post(URL + "/user/login", { email, password })
      .then(response => {
        localStorage.setItem("token", response.data.user.token);
        //localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user", response.data.user);
        dispatch(authSuccess(response.data.user.token, response.data.user));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });;
  }

};