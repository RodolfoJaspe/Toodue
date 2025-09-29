import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import QuickList from './components/QuickList';
import Settings from './components/Settings';
import Signup from './components/Signup';
import Todo from './components/Todo';
import Todos from './components/Todos';
import "./styles/App.css";
import PrivateRoute from './utils/PrivateRoute';

function App ({user_id, user_name}) {

    return (
        <Router>
            <div className="app">
                <h1 className="title"><Link to = {user_id?`/users/${user_id}/${user_name}/todos`:'/'}>toodue</Link></h1> 
                <Routes>
                    <Route exact path="/" element={<Landing />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<Signup />}/>
                    <Route 
                        path="/users/:user_id/:user_name/todos" 
                        element={
                            <PrivateRoute>
                                <Todos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/:user_id/:user_name/todos/:todo_id"
                        element = {
                            <PrivateRoute>
                                <Todo />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/:user_id/:user_name/settings"
                        element = {
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/quick_list"
                        element = { <QuickList /> }
                    />
                </Routes>
            </div>
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        user_id : state.userReducer.user_id,
        user_name : state.userReducer.user_name
    }
}

export default connect(mapStateToProps, {})(App);
