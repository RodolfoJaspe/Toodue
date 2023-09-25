import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createTodo, getTodos } from "../actions/todosActions";
import "../styles/Todos.css";
import gear from "../utils/images/gear.png";
import Logout from './Logout';

const Todos = ({user_name, user_id, todos, getTodos, createTodo }) => {
    const [ newTodo, setNewTodos ] = useState({
        todo_name : "",
        user_id : user_id
    })

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        getTodos(params.user_id)
    },[getTodos, params])

    const textBoxChanges = e => {
        e.persist();
        setNewTodos({
        ...newTodo,
        [e.target.name]: e.target.value,
        });
    };

  const formSubmit = (e) => {
      e.preventDefault();
      createTodo(newTodo)
      setNewTodos({...newTodo, todo_name: ""})
  }

    return (
        <div className='todos-outer-div'>
            <div 
                className='settings'
                onClick={() => navigate(`/users/${params.user_id}/${params.user_name}/settings`)}>
                <img src={gear} alt='settings' />
            </div>
            <div className='logout-div'>
                <button
                    onClick={() => navigate("/")}>Back
                </button>
                <Logout /> 
            </div>
            <div className='main-todos-div'>
                <h2><b className='name'>{params.user_name}'s </b>2do lists</h2>
                <form 
                    onSubmit={formSubmit} 
                    className="add-todo-form"
                    autoComplete='off'
                >
                    <input 
                        type='text'
                        name='todo_name'
                        id='todo_name'
                        value={newTodo.todo_name}
                        onChange={textBoxChanges}
                        placeholder='List name'
                    />
                    <button className='add-button'>Add</button>
                </form>
                <div className='todo-list'>
                    {todos.map(todo => (
                        <div 
                            className='todo' 
                            key={todo.todo_name}
                            onClick={() => navigate(`/users/${params.user_id}/${params.user_name}/todos/${todo.todo_id}`)}
                            >
                            <p>{todo.todo_name}</p>
                        </div>
                    ))}
                </div>                
            </div>

        </div>
    
    )
}

const mapStateToProps = state => {
    return {
        user_name: state.userReducer.user_name,
        user_id: state.userReducer.user_id,
        todos: state.todosReducer.todos
    }
}

export default connect(mapStateToProps, {getTodos, createTodo})(Todos)