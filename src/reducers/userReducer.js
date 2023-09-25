import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_START, CHANGE_PASSWORD_SUCCESS, CHANGE_USERNAME_FAILURE, CHANGE_USERNAME_START, CHANGE_USERNAME_SUCCESS, CLEAR_LOGIN_ERROR, CLEAR_SIGNUP_ERROR, CREATE_USER_FAILURE, CREATE_USER_START, CREATE_USER_SUCCESS, DELETE_USER_FAILURE, DELETE_USER_START, DELETE_USER_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT, } from "../actions/userActions";


const user = {
    user_id : "",
    user_name : "",
    loading: false,
    signupError: "",
    loginError: "",
    changePasswordError: "",
    changeUsernameError: ""
}

export const userReducer = ( state = user, action ) => {
    switch( action.type ) {
        case CREATE_USER_START:
            return {...state, loading: true };
        case CREATE_USER_SUCCESS:
            console.log(action.payload)
            return {...state, user_id:action.payload.user_id, user_name: action.payload.user_name, loading: false } ;
        case CREATE_USER_FAILURE:
            console.log(action.payload)
            return {...state, loading: false, signupError: action.payload };
        case USER_LOGIN_START:
            return {...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return {...state, user_id: action.payload.user_id, user_name: action.payload.user_name, loading: false };
        case USER_LOGIN_FAILURE:
            return {...state, loading: false, loginError: action.payload };
        case CLEAR_SIGNUP_ERROR:
            return {...state, signupError: ""};
        case CLEAR_LOGIN_ERROR:
            return { ...state, loginError: ""};
        case USER_LOGOUT:
            return {...state, user_id: "", user_name: "", loading:false };
        case CHANGE_PASSWORD_START:
            return {...state, loading: true};
        case CHANGE_PASSWORD_SUCCESS:
            return {...state, loading: false};
        case CHANGE_PASSWORD_FAILURE:
            return {...state, loading: false, changePasswordError: action.payload};
        case CHANGE_USERNAME_START:
            return {...state, loading: true};
        case CHANGE_USERNAME_SUCCESS:
            return {...state, loading: false, user_name: action.payload};
        case CHANGE_USERNAME_FAILURE:
            return {...state, loading: false, changeUsernameError: action.payload}
        case DELETE_USER_START:
            return {...state, loading: true};
        case DELETE_USER_SUCCESS:
            return {...state, loading: false};
        case DELETE_USER_FAILURE:
            return {...state, loading: false,};
        default:
            return state;
    }
}