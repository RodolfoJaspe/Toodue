import axios from "axios"
import { useUrl } from "../utils/urls";

export const FETCH_TASKS_START = "FETCH_TASKS_START";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const CREATE_TASK_START = "CREATE_TASK_START";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";

export const DELETE_TASK_START = "DELETE_TASK_START";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const CREATE_QUICK_TASK = "CREATE_QUICK_TASK";

export const FETCH_QUICK_TASKS = "FETCH_QUICK_TASKS";

export const DELETE_QUICK_TASKS = "DELETE_QUICK_TASKS";

export const TOGGLE_TASK = "TOGGLE_TASK";


const headers = {
    Accept: "application/json"
}

export const getTasks = (todo_id) => dispatch => {
    dispatch({type: FETCH_TASKS_START});
    axios.get(`${useUrl}/api/tasks/${todo_id}`, {headers})
        .then(res => {
            dispatch({type: FETCH_TASKS_SUCCESS, payload: res.data})
        }
        ).catch(err => {
            dispatch({type:FETCH_TASKS_FAILURE})
        })
}

export const createTask = (task) => dispatch => {
    dispatch({type: CREATE_TASK_START});
    axios.post(`${useUrl}/api/tasks`, task)
        .then(res => {
            console.log(res)
            dispatch({type: CREATE_TASK_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log(err)
            dispatch({type:CREATE_TASK_FAILURE})
        })
}

export const createQuickTask = (task) => dispatch => {
    dispatch({type: CREATE_QUICK_TASK, payload: task});
}

export const getQuickTasks = () => dispatch => {
    dispatch({type: FETCH_QUICK_TASKS});
}

export const deleteQuickTasks = (tasks) => dispatch => {
    const newTasksList = tasks.filter(task => task.completed === false)
    dispatch({type : DELETE_QUICK_TASKS, payload: newTasksList})
}

export const toggleTask = (task_id, tasks) => dispatch => {
    const updatedTasks = tasks.map(task => {
        if(task_id === task.task_id) {
            return {...task, completed : !task.completed}
        }
        return task
    })
    dispatch({type: TOGGLE_TASK, payload: updatedTasks})
}

export const deleteTasks = (tasks) => dispatch => {
    dispatch({type: DELETE_TASK_START})
    const tasksToDelete = tasks.filter(task => task.completed === true)
    tasksToDelete.forEach(task => {
        axios.delete(`${useUrl}/api/tasks/${task.task_id}`)
            .then(res => {
                console.log(res)
                dispatch({type: DELETE_TASK_SUCCESS, payload: res.data})
            }).catch(err => {
                dispatch({type: DELETE_TASK_FAILURE})
            })
    });
    
}
