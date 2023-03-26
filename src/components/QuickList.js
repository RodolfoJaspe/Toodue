import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import Logout from './Logout';
import {createQuickTodo, getQuickTodos} from "../actions/todosActions";
import"../styles/Todos.css";
import { useNavigate } from 'react-router-dom';

const QuickList = ({user_name, user_id, todos, getQuickTodos, createQuickTodo}) => {
    const [ newTodo, setNewTodos ] = useState({
        todo_name : "",
        // user_id : user_id
    })

    const navigate = useNavigate()

    useEffect(() => {
        getQuickTodos()
    },[getQuickTodos,todos])

    const textBoxChanges = e => {
        e.persist();
        setNewTodos({
        ...newTodo,
        [e.target.name]: e.target.value,
        });
    };

  const formSubmit = (e) => {
      e.preventDefault();
      createQuickTodo(newTodo)
      setNewTodos({...newTodo, todo_name: ""})
  }

    return (
        <div className='todos-outer-div'>
            <div className='logout-div'>
                <button
                    onClick={() => navigate("/")}>Back
                </button>
                <Logout /> 
            </div>
            <div className='main-todos-div'>
                <h2><b className='name'>Quick </b>2do lists</h2>
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
                            // onClick={() => navigate(`/users/${user_id}/todos/${todo.todo_id}`)}
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
        // user_name: state.userReducer.user_name,
        // user_id: state.userReducer.user_id,
        todos: state.todosReducer.todos
    }
}

export default connect(mapStateToProps, {getQuickTodos, createQuickTodo})(QuickList)