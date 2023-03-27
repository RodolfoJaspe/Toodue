import React, { useEffect, useState } from 'react'
import '../styles/Todo.css';
import { v4 as uuidv4 } from 'uuid'; 

function QuickList () {

    const initialTaskState = {
        task_description : "",
        task_id : "",
        completed : false
    }

    const [task, setTask] = useState(initialTaskState)

    const [ lsTasks , setLsTasks ] = useState([])

    let currentTasks = []

    const textBoxChanges = e => {
        e.persist();
        setTask({
          ...task,
          [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setLsTasks(storedTasks);
        }
    },[setLsTasks])

    const toggleCompleted = (task_id) => {
        setLsTasks(lsTasks.map(task => {
            if (task.task_id === task_id) {
                return {
                    ...task,
                    completed: !task.completed
                }
            } else {
                return task
            }
        }))
        localStorage.setItem('tasks', JSON.stringify(lsTasks))
    }

    const formSubmit = e => {
        e.preventDefault();
        if(task.task_description){
            const newTask = {
                ...task,
                task_id: uuidv4()
            };
            currentTasks.push(newTask)
            setLsTasks([...lsTasks, newTask])
            localStorage.setItem('tasks', JSON.stringify([...lsTasks, newTask]))
            setTask(initialTaskState)
        }
    }

    const clearCompleted = () => {
        const filteredTasks = lsTasks.filter(task => !task.completed);
        setLsTasks(filteredTasks);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    return (
        <div className='todo-outer-div'>
            <div className='todo-main-div'>
                <h2>Quick list</h2>
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
                <div>
                    {lsTasks.map(task => (
                        task ? 
                        <div 
                            className={`task${task.completed? ' completed' : '' }`}
                            key={task.task_id}
                            onClick={() => toggleCompleted(task.task_id)}>
                            <h3>{task.task_description}</h3>
                        </div> : null
                    ))}  
                </div>
                <div className='delete-buttons-div'>
                    <button 
                        className="clear"
                        onClick={clearCompleted}>
                        Clear completed
                    </button>
                </div>                  
            </div>
        </div>
    )
}

export default QuickList
