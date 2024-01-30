import React, { useEffect, useReducer, useState } from 'react';
import "./index.scss";
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../redux/authSlice.ts';
import Toast from 'react-bootstrap/Toast';
import { useAppDispatch } from '../../redux/hooks.ts';
 

 interface State{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirmPassword: string;
 }

type reducerAction = Object;
 
const reducer = (state: State, action: reducerAction) => {
    return {
        ...state,
        ...action
    }
};
 
const initialState: State = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmPassword: ''
}
 
 
const PageSignup = () => {
 
    const navigate = useNavigate();
    const reduxDispatch = useAppDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { username, password, firstname, lastname, confirmPassword } = state;
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState('');
 
 
    const SignupFn = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            reduxDispatch(signup({ name: `${firstname} ${lastname}`, username, password }))
                .then(
                    data => {
                        if (data.payload.data.status === 200) {
                            setShowToast(true);
                        } else {
                            setError(data.payload.data.message);
                          }
                    }
                );
        } 
        else{
            setError("Password doesn't match");
        }

    };
 
    useEffect(() => {
        if (showToast) {
            setTimeout(() => {
                setShowToast(false);
                navigate('/'); 
            }, 2000); 
        }
    }, [showToast, navigate]);
 
 
 
    return (
 
        <div className='signup-wrap'>
            <div className='logo-container'>
                <img src='./logo.png' alt='LOGO' />
            </div>
            <form className='signup-box' onSubmit={SignupFn}>
                <h3> Signup </h3>
                <label className='form-group'>
                    <div className='form-label'> First Name </div>
                    <input className='form-control' type="text" value={firstname} onChange={e => dispatch({ firstname: e?.target?.value })} placeholder="First Name" required/>
                </label>
                <label className='form-group'>
                    <div className='form-label'> Last Name </div>
                    <input className='form-control password' type="text" value={lastname} onChange={e => dispatch({ lastname: e?.target?.value })} placeholder="Last Name" required/>
                </label>
                <label className='form-group'>
                    <div className='form-label'> Username </div>
                    <input className='form-control' type="text" value={username} onChange={e => dispatch({ username: e?.target?.value })} placeholder="Username" required />
                </label>
                <label className='form-group'>
                    <div className='form-label'> Password </div>
                    <input className='form-control password' type="password" value={password} onChange={e => dispatch({ password: e?.target?.value })} placeholder="Password" required />
                </label>
                <label className='form-group'>
                    <div className='form-label'> Confirm Password </div>
                    <input className='form-control password' type="password" value={confirmPassword} onChange={e => dispatch({ confirmPassword: e?.target?.value })} placeholder="Confirm Password" required />
                </label>
 
                <div className='signup-footer'>
                    <Link to="/"> Login </Link>
                    <button className='btn-primary' type="submit"> Signup </button>
                </div>
            </form>
            <Toast className='toast-container' show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                </Toast.Header>
                <Toast.Body> User Created </Toast.Body>
            </Toast>
            {error && <div className="error-message"> {error}</div>}
        </div>
 
    );
};
 
export default PageSignup;