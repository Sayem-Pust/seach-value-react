import {
  AUTH_LOGOUT,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  GET_USER,
  GET_USER_FAILED,
  GET_USER_LOADING,
  ALERT_DANGER,
  ALERT_SUCCESS,
  ALERT_HIDE,
} from "../constants";

const initialState = {
  token: null,
  error: null,
  loading: false,
  show: false,
  msg: "",
  isPending: false,
  users: "",
  err: "",
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_START:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        show: "accessing user data. please wait...",
      });

    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        error: null,
        loading: false,
      });

    case AUTH_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
      });

    case AUTH_LOGOUT:
      return Object.assign({}, state, {
        token: null,
      });

    case GET_USER_LOADING:
        return Object.assign({}, state, {isPending: true})

    case GET_USER:
        return Object.assign({}, state, {users: action.payload, isPending: false})

    case GET_USER_FAILED:
        return Object.assign({}, state, {err: action.payload, isPending: false})

    case ALERT_SUCCESS:
      return Object.assign({}, state, { msg: action.payload, show: true });

    case ALERT_DANGER:
      return Object.assign({}, state, { msg: action.payload, show: true });

    case ALERT_HIDE:
      return Object.assign({}, state, { show: false });

    default:
      return state;
  }
};
