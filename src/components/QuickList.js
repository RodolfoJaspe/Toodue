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
    const [draggedTask, setDraggedTask] = useState(null)
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

        const draggedIndex = lsTasks.findIndex(task => task.task_id === draggedTask.task_id);
        const targetIndex = lsTasks.findIndex(task => task.task_id === targetTask.task_id);
        
        const newTasks = [...lsTasks];
        newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, draggedTask);
        
        setLsTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setDraggedTask(null);
    };

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
                <div className='task-list'>
                    {lsTasks.map(task => (
                        task ? 
                        <div 
                            draggable
                            onDragStart={(e) => handleDragStart(e, task)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, task)}
                            className={`task${task.completed? ' completed' : '' }`}
                            key={task.task_id}
                            onClick={() => toggleCompleted(task.task_id)}
                            style={{ cursor: 'move' }}>
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
