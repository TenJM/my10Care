import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

const LoginForm = () => {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [robotAction, setRobotAction] = useState(null); // 'nod' or 'shake'
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:1901/login', formData);
    const token = response.data.access_token;
    localStorage.setItem('token', token);

    setRobotAction('nod');
    console.log('Login successful!');

    // Navigate to dashboard after animation
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  } catch (error) {
    setRobotAction('shake');
    console.error('Login failed:', error.response?.data?.error || error.message);
  }

  setTimeout(() => setRobotAction(null), 1000);
};

  const isBlinking = robotAction === 'nod' || robotAction === 'shake';

  return (
    <div className="form-container">
      <h2 className="form-title">Login to my10Care App</h2>

      {/* Robot Animation */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <motion.div
          animate={
            robotAction === 'shake'
              ? { x: [-10, 10, -10, 10, 0] }
              : robotAction === 'nod'
              ? { y: [-5, 5, -5, 0] }
              : {}
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            width: '70px',
            height: '70px',
            backgroundColor: '#d0f0ff',
            margin: '0 auto',
            borderRadius: '50%',
            position: 'relative',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          {/* Ears */}
          <div style={{
            width: '10px',
            height: '20px',
            backgroundColor: '#90caf9',
            borderRadius: '5px',
            position: 'absolute',
            left: '-12px',
            top: '25px',
          }} />
          <div style={{
            width: '10px',
            height: '20px',
            backgroundColor: '#90caf9',
            borderRadius: '5px',
            position: 'absolute',
            right: '-12px',
            top: '25px',
          }} />

          {/* Eyes */}
          {!passwordFocused && (
            isBlinking ? (
              <>
                <div style={{
                  width: '12px',
                  height: '2px',
                  backgroundColor: '#000',
                  position: 'absolute',
                  top: '26px',
                  left: '18px',
                  borderRadius: '2px',
                }}></div>
                <div style={{
                  width: '12px',
                  height: '2px',
                  backgroundColor: '#000',
                  position: 'absolute',
                  top: '26px',
                  right: '18px',
                  borderRadius: '2px',
                }}></div>
              </>
            ) : (
              <>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '22px',
                  left: '18px',
                }}></div>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '22px',
                  right: '18px',
                }}></div>
              </>
            )
          )}

          {/* Smile */}
          {!passwordFocused && (
            <div style={{
              width: '30px',
              height: '15px',
              borderBottom: '3px solid #333',
              borderRadius: '0 0 20px 20px',
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
            }} />
          )}
        </motion.div>
      </div>

      {/* Login Form */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="input-field"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={formData.password}
        onChange={handleChange}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />
      <button className="btn-submit" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
