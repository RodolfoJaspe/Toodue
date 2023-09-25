import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { clearSignupError, createUser } from "../actions/userActions";
import '../styles/Signup.css';

function Signup ({createUser, error, clearSignupError }) {
    
    const navigate = useNavigate()

    const [user, setUser] = useState({
        user_name: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        user_name: '',
        password: '',
    });
  
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        user_name: yup
          .string()
          .required('Username required')
          .min(3, 'Username must be at least 3 characters long'),
        password: yup
          .string()
          .required('Password required')
          .min(6, 'Password must be at least 6 characters long'),
      });

    useEffect(() => {
        formSchema.isValid(user).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formSchema,user]);

    const validate = e => {
        yup
          .reach(formSchema, e.target.name)
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

    const textBoxChanges = e => {
        e.persist();
        validate(e);
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const formSubmit = e => {
        e.preventDefault();
        createUser(user, setUser, go);
    }

    const go = (user_id, user_name) => {
        navigate(`/users/${user_id}/${user_name}/todos`)
    }

    return (
        <div className='signup-outer-div'>
            <form 
                onSubmit={formSubmit}
                className="form-container"
                autoComplete='off'>
                <h2>Sign up</h2>
                <label htmlFor="user_name">Username<br/>
                    <input 
                        name="user_name" 
                        value={user.user_name} 
                        onChange={textBoxChanges}
                        placeholder="At least 3 characters long" 
                    />
                </label><br />
                <div className="username-error">
                   {errors.user_name.length > 0 ? (
                    <p className="username-error-p">{errors.user_name}</p>
                    ) : ""} 
                </div>   
                <label htmlFor="password">Password<br/>
                    <input 
                        name="password" 
                        type="password" 
                        value={user.password} 
                        onChange={textBoxChanges} 
                        placeholder="At least 6 characters long" 
                    />
                </label><br /> 
                    <div className="password-error">
                        {errors.password.length > 0 ? (
                        <p className='password-error-p'>{errors.password}</p>
                        ) : null}  
                    </div>
                <div className='button-div'>
                    <button 
                        disabled={buttonDisabled}
                        className={buttonDisabled?"disabled":""}
                        >Signup</button> 
                </div>
            </form>
            <div className="already-signedup">
                <p>Already signed up?</p>
                <button onClick={() => navigate("/login")}>Login</button> 
            </div>
            {error ? (
                    <div className='signup-error'>
                        <div className='signup-error-inner'>
                           <p className="signup-error-text">{error}</p>
                        <button 
                        className='close-signup-error'
                        onClick={() => clearSignupError()}>X</button>  
                        </div>
                    </div> 
                ) : null}   
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error : state.userReducer.signupError
    }
}

export default connect( mapStateToProps, { createUser, clearSignupError } )(Signup)