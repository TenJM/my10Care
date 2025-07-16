import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Welcome to NIVEA App 👋</h1>
      <p>Please choose an option:</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login">
          <button style={{ padding: '1rem', marginRight: '1rem' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ padding: '1rem' }}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
