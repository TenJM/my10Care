// src/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    pincode: '',
  });

  const [isFocused, setIsFocused] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:1901/register', formData);
      alert('✅ Registered successfully!');
      console.log(res.data);

      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        pincode: '',
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`❌ ${err.response?.data?.error || 'Registration failed'}`);
    }
  };

  const styles = {
    container: {
      backgroundColor: '#ffffffcc',
      padding: '2rem',
      borderRadius: '20px',
      width: '450px',
      margin: '3rem auto',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      color: '#0d1333',
      fontWeight: 'bold',
      marginBottom: '1.2rem',
      fontSize: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      margin: '8px 0',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      outline: 'none',
    },
    button: {
      marginTop: '10px',
      padding: '12px',
      width: '100%',
      backgroundColor: '#0d1333',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    robotHead: {
      width: '70px',
      height: '70px',
      background: '#bbdefb',
      borderRadius: '50%',
      position: 'relative',
      margin: '0 auto 1rem',
      transition: 'transform 0.4s ease',
      transform: isFocused ? 'rotate(-20deg)' : 'rotate(20deg)',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    eye: {
      width: '12px',
      height: blink ? '2px' : '12px',
      backgroundColor: '#000',
      borderRadius: blink ? '1px' : '50%',
      transition: 'height 0.15s ease-in-out',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.robotHead}>
        <div style={styles.eye}></div>
        <div style={styles.eye}></div>
      </div>

      <h2 style={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name (Optional)"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1a237e')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#0d1333')}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
