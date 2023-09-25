import axios from "axios";
import { useUrl } from "../utils/urls";

export const CREATE_USER_START="CREATE_USER_START";
export const CREATE_USER_SUCCESS="CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE="CREATE_USER_FAILURE";

export const DELETE_USER_START="DELETE_USER_START";
export const DELETE_USER_SUCCESS="DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE="DELETE_USER_FAILURE";

export const USER_LOGIN_START="USER_LOGIN_START";
export const USER_LOGIN_SUCCESS="USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE="USER_LOGIN_FAILURE";

export const CLEAR_SIGNUP_ERROR = "CLEAR_SIGNUP_ERROR";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

export const CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const CHANGE_USERNAME_START = "CHANGE_USERNAME_START";
export const CHANGE_USERNAME_SUCCESS = "CHANGE_USERNAME_SUCCESS";
export const CHANGE_USERNAME_FAILURE = "CHANGE_USERNAME_FAILURE";

const headers = {
    Accept: "application/json"
}


export const createUser = (user, setUser, go) => dispatch => {
    dispatch({type: CREATE_USER_START})
    axios.post(`${useUrl}/api/users/signup/`, user).then(res => {
        console.log(res)
        setUser({
            user_name: "",
            password: ""
        })
        let newUser = res.data.newUser
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_name', newUser.user_name)
        localStorage.setItem('user_id', newUser.user_id)
        dispatch({type: CREATE_USER_SUCCESS, payload: newUser})
        go(newUser.user_id, newUser.user_name) // navigate to todos
    }).catch((err) => {
        console.log(err.response.data.message)
        dispatch({type:CREATE_USER_FAILURE, payload: err.response.data.message})
    })
}

export const login = (user, setUser, go) => dispatch => {
    dispatch({ type: USER_LOGIN_START})
    axios.post(`${useUrl}/api/users/login/`, user).then(
        res => {
            setUser({
                user_name: "",
                password: ""
            })
            user = res.data.user
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_name', user.user_name)
            localStorage.setItem('user_id', user.user_id)
            dispatch({type: USER_LOGIN_SUCCESS, payload: user})
            go(user.user_id, user.user_name)
        }
    ).catch(err => {
        console.log(err)
        dispatch({type: USER_LOGIN_FAILURE, payload: err.response.data.message})
    })
}

export const deleteUser = (user_id, navigate) => dispatch => {
    dispatch({type: DELETE_USER_START})
    axios.delete(`${useUrl}/api/users/${user_id}`, {headers})
        .then(res => {
            console.log(res)
            dispatch({type:DELETE_USER_SUCCESS})
            localStorage.removeItem('token');
            navigate('/')
        }).catch(err => {
            console.log(err)
            dispatch({type: DELETE_USER_FAILURE})
        })
}

export const clearSignupError = () => dispatch => {
    dispatch({type: CLEAR_SIGNUP_ERROR})
}

export const clearLoginError = () => dispatch => {
    dispatch({type: CLEAR_LOGIN_ERROR})
}

export const userLogout = () => dispatch => {
    dispatch({ type: USER_LOGOUT })
}

export const changePassword = (user_id, newPassword) => dispatch => {
    dispatch({type: CHANGE_PASSWORD_START})
    axios.put(`${useUrl}/api/users/${user_id}/password`,{password: newPassword}).then(res => {
        console.log(res)
        dispatch({type: CHANGE_PASSWORD_SUCCESS})
    }).catch(err => {
        console.log(err.response)
        dispatch({type: CHANGE_PASSWORD_FAILURE, payload: err.response.data.message})
    })
    
}

export const changeUsername = (user_id, newUsername) => dispatch => {
    dispatch({type: CHANGE_USERNAME_START})
    axios.put(`${useUrl}/api/users/${user_id}/user_name`,{user_name: newUsername}).then(res => {
        console.log(res)
        dispatch({type: CHANGE_USERNAME_SUCCESS, payload: res.data.user_name})
    }).catch(err => {
        console.log(err.response)
        dispatch({type: CHANGE_USERNAME_FAILURE, payload: err.response.data.message})
    })
    
}
