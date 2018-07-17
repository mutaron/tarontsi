import axios from "axios";

import { URL } from "../../shared/utility";
import * as actionTypes from "../actionTypes";

export const adminStart = () => {
  return {
    type: actionTypes.ADMIN_START,
    loading: true
  };
};

export const adminLedgerSuccess = ({ ledger }) => {

  return {
    type: actionTypes.ADMIN_LEDGER_SUCCESS,
    ledger: ledger,
    error: null,
    loading: false
  };
};

export const adminFail = errMssg => {
  return {
    type: actionTypes.ADMIN_FAIL,
    error: errMssg,
    loading: false    
  };
};

export const adminAddLedger = ( id, ledger ) => {
  return dispatch => {
    dispatch(adminStart());

    if (!id) {
      return;
    } else {
      axios
        .post(URL + "/admin/add_ledger", { id, ledger })
        .then(response => {
          dispatch(adminLedgerSuccess(response.data));
        })
        .catch( err => {
          dispatch(adminFail(err));
        });
    }
  };
};

export const adminGetLedger = ( id, month, year ) => {
  return dispatch => {
    dispatch(adminStart());

    if (!id) {
      return;
    } else {
      id = "Bearer " + id;
      axios
        .get(`${URL}/admin/ledgers?month=${month}&year=${year}`, {
          headers: { id: id }
        })
        .then(response => {
          dispatch(adminLedgerSuccess(response.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(adminFail(err.data));
        });
    }
  };
};