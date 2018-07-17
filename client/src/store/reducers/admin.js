import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  ledger: null,
  loading: false
};

const adminStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const adminFail = ( state, action ) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const adminLedgerSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    ledger: action.ledger
  });
};

const adminReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.ADMIN_START: return adminStart(state, action);
    case actionTypes.ADMIN_FAIL: return adminFail( state, action );
    case actionTypes.ADMIN_LEDGER_SUCCESS: return adminLedgerSuccess(state, action);

    default:
      return state;
    }
};

export default adminReducer;