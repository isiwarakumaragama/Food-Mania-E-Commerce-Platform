import React, { useState } from "react";
import './CSS/LoginSignup.css';
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        setErrorMessage('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        
        if (Object.values(Validation(values)).every((error) => error === '')) {
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:8081/signup', values);
                
                if (res.data.token) {
                    // Store token in localStorage
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/login');
                } else {
                    setErrorMessage('Signup failed. Please try again.');
                }
            } catch (err) {
                console.log(err);
                if (err.response && err.response.data) {
                    setErrorMessage(err.response.data.message || 'Signup failed. Please try again.');
                } else {
                    setErrorMessage('Network error. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    {errorMessage && <span className="error" style={{display: 'block', marginBottom: '10px'}}>{errorMessage}</span>}
                    <div className="loginsignup-fields">
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            name="name" 
                            onChange={handleInput}
                            value={values.name}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            onChange={handleInput}
                            value={values.email}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            onChange={handleInput}
                            value={values.password}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Continue'}
                    </button>
                    <p className="loginsignup-login">Already have an account? <Link to='/login' className="loginsignup-login-Link">Login here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;
