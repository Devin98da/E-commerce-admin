import React, { useEffect, useState } from 'react'
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import {resetError} from '../../redux/UserRedux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(resetError())
    },[dispatch])

    useEffect(()=>{
        if(currentUser && !isFetching){
            navigate('/');
        }
    },[ currentUser, navigate, isFetching])

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    }



    return (
        <div className='containerr'
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className='wrapper'>
                <h1 className='title'>SIGN IN</h1>
                <form className='form'>
                    <input className='input'
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className='input'
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button disabled={isFetching} className='loginBtn' onClick={handleLogin} >
                        LOGIN
                    </button>
                    {error && <span className='error'>Something went wrong...</span>}

                </form>
            </div>
        </div>
    )
}

export default Login