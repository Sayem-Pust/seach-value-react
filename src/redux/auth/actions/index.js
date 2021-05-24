import {AUTH_START, AUTH_FAIL, AUTH_LOGOUT,AUTH_SUCCESS, ALERT_DANGER, ALERT_SUCCESS, ALERT_HIDE, GET_USER, GET_USER_LOADING, GET_USER_FAILED} from '../constants'
import axios from 'axios'
import { Url } from '../../../utils/URL'

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: AUTH_SUCCESS,
        token: token
    }
} 

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationTime => (dispatch) => {
    setTimeout(() => {
        dispatch(logout())
    }, expirationTime * 1000)
}

export const authLogin = (email, password) => (dispatch) => {
    dispatch(authStart());
    axios.post(`${Url}/api/login/`, {
        email: email,
        password: password
    })
    .then(res => {
        console.log(res)
        const token = res.data.data.access;
        const username = res.data.data.user.username;
        const id = res.data.data.user.id;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem('token', token)
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user", username);
        localStorage.setItem("id", id);
        dispatch(authSuccess(token))
        dispatch({
          type: ALERT_SUCCESS,
          payload: "You successfully logged in...",
        });
        dispatch(checkAuthTimeout(3600))
    })
    .catch(err => {
        dispatch(authFail(err))
        dispatch({
          type: ALERT_DANGER,
          payload: "Something wrong. Please try again..",
        });
        console.log(err)
    })
}

export const authSignup = (username, email, password1, password2) => (dispatch) => {
    console.log(username,email,password1)
  dispatch(authStart());
  axios
    // .post("http://127.0.0.1:8000/rest-auth/registration/", {
    .post(`${Url}/api/registration/`, {
      username: username,
      email: email,
      password: password1,
    })
    .then((res) => {
        console.log('enter')
    //   const token = res.data.access;
    //   const username = res.data.username;
    //   console.log(username);
    //   const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("expirationDate", expirationDate);
    //   localStorage.setItem("user", username);
    //   dispatch(authSuccess(token));
      dispatch({ type: ALERT_SUCCESS, payload: "You registered successfully... please login !!" });
    //   dispatch(checkAuthTimeout(3600));
    })
    .catch((err) => {
        console.log(err)
      dispatch(authFail(err));
      dispatch({ type: ALERT_DANGER, payload: "Something wrong. Please try again.." });
      console.log(err);
    });
};


export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token')
    if(token === undefined) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if(expirationDate <= new Date()){
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            console.log('enter')
        }
    }
}


export const alertHide = () => {
    return {
      type: ALERT_HIDE,
    };
}

export const getUsers = () => (dispatch) => {
    dispatch({type: GET_USER_LOADING})
    axios.get(`${Url}/api/users`).then(res => {
        dispatch({type: GET_USER, payload: res.data})
    }).catch(err => {
        dispatch({type: GET_USER_FAILED, payload: err})
    })
}
