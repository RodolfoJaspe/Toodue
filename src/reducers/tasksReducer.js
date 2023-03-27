import {FETCH_TASKS_START, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE, CREATE_TASK_START, CREATE_TASK_SUCCESS, CREATE_TASK_FAILURE, TOGGLE_TASK, DELETE_TASK_SUCCESS, CREATE_QUICK_TASK, FETCH_QUICK_TASKS, DELETE_QUICK_TASKS} from "../actions/tasksActions";
import { USER_LOGOUT } from "../actions/userActions";

const initialState = {
    loading: false,
    tasks: [],
}

export const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TASKS_START:
            return {...state, loading: true };
        case FETCH_TASKS_SUCCESS:
            return {...state, loading: false, tasks: action.payload};
        case FETCH_TASKS_FAILURE:
            return {...state, loading: false};
        case CREATE_TASK_START:
            return {...state, loading: true};
        case CREATE_TASK_SUCCESS:
            return {...state, tasks: [...state.tasks, action.payload]};
        case CREATE_TASK_FAILURE:
            return {...state, loading:false};
        case CREATE_QUICK_TASK:
            return {...state, tasks: [...state.tasks, action.payload]};
        case FETCH_QUICK_TASKS:
            return {...state};
        case DELETE_QUICK_TASKS:
            return {...state, tasks: action.payload};
        case TOGGLE_TASK:
            return {...state, tasks: action.payload};
        case DELETE_TASK_SUCCESS:
            const filteredTasks = state.tasks.filter(task => task.task_id !== action.payload.task_id)
            return {...state, tasks: filteredTasks}
        case USER_LOGOUT:
            return {...state, tasks: [], loading: false};
        default:
            return state;    
    }
}