import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = (token) => {
    setIsLoggedInLocal(true);
    setIsLoggedIn(true); // Use the prop to update App state
    // Store token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log('is logged in ', isLoggedIn);
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrorMessage(''); // Clear error when user starts typing
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).every((error) => error === '')) {
      setLoading(true);
      try {
        // Make the login request
        const res = await axios.post('http://localhost:8081/login', values);

        if (res.data.token) {
          handleLoginSuccess(res.data.token);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message || 'Login failed. Please check your credentials.');
        } else {
          setErrorMessage('Network error. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {errorMessage && <span className="error" style={{display: 'block', marginBottom: '10px'}}>{errorMessage}</span>}
          <div className="loginsignup-fields">
            <input 
              type="email" 
              placeholder="Email Address" 
              onChange={handleInput} 
              name="email" 
              value={values.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input 
              type="password" 
              placeholder="Password" 
              onChange={handleInput} 
              name="password"
              value={values.password}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </button>
          <p className="loginsignup-login">
            Don't have an account? <Link to="/signup" className="loginsignup-login-Link">Signup here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
