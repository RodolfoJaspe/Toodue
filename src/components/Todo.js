import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, deleteTasks, getTasks, toggleTask, reorderTasks } from "../actions/tasksActions";
import { deleteTodo, getTodos } from '../actions/todosActions';
import '../styles/Todo.css';
import Logout from './Logout';

function Todo ({todos, tasks, getTasks, createTask, toggleTask, deleteTasks, deleteTodo, getTodos}) {

    const navigate = useNavigate()

    const {todo_id} = useParams()
    const params = useParams()

    const [task, setTask] = useState({
        task_description : "",
        todo_id : todo_id
    })

    const currentTodo = todos.find((todo) => todo.todo_id === Number(todo_id))
    console.log(todos)
    console.log(tasks)

    const textBoxChanges = e => {
        e.persist();
        setTask({
          ...task,
          [e.target.name]: e.target.value,
        });
      };

    useEffect(() => {
        getTasks(todo_id)
        getTodos(params.user_id)
    },[getTasks, getTodos, todo_id, params,])

    const formSubmit = e => {
        e.preventDefault();
        createTask(task);
        setTask({...task, task_description: ""})
    }

    const [deleteButton, setDeleteButton] = useState(false);
    const [draggedTask, setDraggedTask] = useState(null);

    const firstDelete = () => {
        deleteTodo(todo_id)
        navigate(`/users/${params.user_id}/${params.user_name}/todos`)
    }

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        e.target.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        setDraggedTask(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (e.target.classList.contains('task')) {
            e.target.classList.add('drag-over');
        }
    };

    const handleDragLeave = (e) => {
        if (e.target.classList.contains('task')) {
            e.target.classList.remove('drag-over');
        }
    };

    const handleDrop = (e, targetTask) => {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        if (!draggedTask || draggedTask.task_id === targetTask.task_id) {
            return;
        }

        const draggedIndex = tasks.findIndex(task => task.task_id === draggedTask.task_id);
        const targetIndex = tasks.findIndex(task => task.task_id === targetTask.task_id);
        
        const newTasks = [...tasks];
        newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedTask);
        
        reorderTasks(newTasks, todo_id);
        setDraggedTask(null);
    };

        return (
            <div className='todo-outer-div'>
                <div className='logout-div'>
                    <button
                        onClick={() => navigate(`/users/${params.user_id}/${params.user_name}/todos`)}>Back</button>
                    <Logout />
                </div>
                <div className='todo-main-div'>
                    {currentTodo?<h2>{currentTodo.todo_name}</h2>: null}
                    <form 
                        onSubmit={formSubmit}
                        className="add-todo-form"
                        autoComplete='off'>
                        <input 
                            type='text'
                            name="task_description"
                            id='task_description'
                            placeholder='Add new item'
                            value={task.task_description}
                            onChange={textBoxChanges}
                        />
                        <button className='add-button'>Add</button>
                    </form>
                    <div className='task-list'>
                        {tasks.map(task => (
                            <div 
                                draggable
                                onDragStart={(e) => handleDragStart(e, task)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, task)}
                                onClick={() => toggleTask(task.task_id, tasks)}
                                className={`task${task.completed? ' completed' : '' }`}
                                key={task.task_id}
                                style={{ cursor: 'move' }}>
                                <h3>{task.task_description}</h3>
                            </div>
                        ))}  
                    </div>
                    <div className='delete-buttons-div'>
                        <button 
                            onClick={() => deleteTasks(tasks)}
                            className="clear"
                        >
                            Clear completed
                        </button>
                        <button 
                            onClick={() => setDeleteButton(true)}
                            className="delete-button">
                            Delete List
                        </button>
                    </div>
                    {deleteButton ? (
                        <div className='delete-warning'>
                            <h2>U SHRRR<b className='question-mark'>?</b></h2>
                            <div className='yup-nope-div'>
                                <button 
                                    onClick={() => firstDelete()}
                                    className="delete-button">
                                    YUP
                                </button>
                                <button
                                    onClick={() => setDeleteButton(false)}>
                                    Nope
                                </button>
                            </div>
                        </div>
                    ) : null}                    
                </div>

            </div>
        )
}

const mapStateToProps = state => {
    return {
        tasks : state.tasksReducer.tasks,
        todos : state.todosReducer.todos
    }
}
export default connect(mapStateToProps, { getTasks, createTask, toggleTask, deleteTasks, deleteTodo, getTodos, reorderTasks })(Todo)

