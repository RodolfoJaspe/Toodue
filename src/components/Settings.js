import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { changePassword, changeUsername, deleteUser } from '../actions/userActions';
import "../styles/Settings.css";


function Settings({changePassword, changeUsername, user_name, deleteUser}) {
    const [user, setUser] = useState({
        user_name: user_name,
        password: ""
    })
    const [errors, setErrors] = useState({
        user_name: '',
        password: '',
    });

    const [usernameButtonDisabled, setusernameButtonDisabled] = useState(true);
    const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(true);

    const [deleteButton, setDeleteButton] = useState(false);

    const params = useParams()

    const navigate = useNavigate()

    const usernameSchema = yup.object().shape({
        user_name: yup
          .string()
          .required('Username required')
          .min(3, 'Username must be at least 3 characters long'),
      });

    const passwordSchema = yup.object().shape({
        password: yup
            .string()
            .required('Password required')
            .min(6, 'Password must be at least 6 characters long'),
    });

    useEffect(() => {
        usernameSchema.isValid(user).then(valid => {
            setusernameButtonDisabled(!valid);
        });
        passwordSchema.isValid(user).then(valid => {
            setPasswordButtonDisabled(!valid);
        });
    }, [usernameSchema,passwordSchema,user]);

    const validateUsername = e => {
        yup
          .reach(usernameSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: '',
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.message,
            });
          });
    };

    const validatePassword = e => {
        yup
          .reach(passwordSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: '',
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.message,
            });
          });
    };

    const usernameTextBoxChanges = e => {
        e.persist();
        validateUsername(e);
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const passwordTextBoxChanges = e => {
        e.persist();
        validatePassword(e);
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const submitPassword = e => {
        e.preventDefault();
        changePassword(Number(params.user_id), user.password);
        localStorage.removeItem('token');
        navigate('/')
      
    }
    const submitUsername = e => {
        e.preventDefault();
        changeUsername(Number(params.user_id), user.user_name);
        localStorage.removeItem('token');
        navigate('/')
       
    }
    return (
        <div className='settings'>
            <div style={{textAlign : 'center'}}>
               <h2>Settings</h2>
                <h3>username: {params.user_name}</h3> 
            </div>
            
            <div>
                <div className='settings-forms'>
                    <form onSubmit={submitUsername}>
                    <h3>Change Username</h3>
                    <div className='settings-form-div'>
                        <label htmlFor='user_name'>New Username
                            <input
                                name="user_name"
                                value={user.user_name}
                                onChange={usernameTextBoxChanges}
                                placeholder="At least 3 characters long" 
                            />
                        </label>
                        <button
                            disabled ={usernameButtonDisabled}>Save
                        </button>
                    </div>
                  
                    <div className="username-error">
                        {errors.user_name.length > 0 ? (
                        <p className='username-error-p'>{errors.user_name}</p>
                        ) : null}  
                    </div>
                    </form>
                    <form onSubmit={submitPassword}>
                    <h3>Change Password</h3>
                    <div className='settings-form-div'>
                        <label htmlFor='password'>New Password
                            <input
                                name="password"
                                value={user.password}
                                onChange={passwordTextBoxChanges}
                                placeholder="At least 6 characters long" 
                            />
                        </label>
                        <button
                            disabled = {passwordButtonDisabled}>Save
                        </button>
                    </div>
                    <div className="password-error">
                        {errors.password.length > 0 ? (
                        <p className='username-error-p'>{errors.password}</p>
                        ) : null}  
                    </div>
                    </form>
                </div>
                
                <div className='delete-account-div'>
                   <button 
                    onClick={() => setDeleteButton(true)}
                    className="delete-button">
                        Delete Account
                    </button> 
                </div>
                {deleteButton? (
                    <div className='delete-warning'>
                        <h2>U SHRRR<b className='question-mark'>?</b></h2>
                        <div className='yup-nope-div'>
                            <button
                                onClick={() => deleteUser(params.user_id,navigate)}
                                className='delete-button'>YUP
                            </button>
                            <button
                                onClick={() => setDeleteButton(false)}>
                                Nope
                            </button>
                        </div>
                    </div>
                ):null}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        passwordError: state.userReducer.changePasswordError,
        usernameError: state.userReducer.changeUsernameError,
        user_name: state.userReducer.user_name,
        user_id : state.userReducer.user_id
    }
}

export default connect(mapStateToProps, {changePassword, changeUsername, deleteUser})(Settings)