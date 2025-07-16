import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';
import '../index.css';

const Register = () => {
  const [showSplit, setShowSplit] = useState(false);

  useEffect(() => {
    // Delay for smooth transition
    const timer = setTimeout(() => {
      setShowSplit(true);
    }, 200); // You can reduce or increase this delay if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="register-container">
      {showSplit && (
        <>
          <motion.div
            className="left-panel"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <div className="nivea-logo">
              <h1>my10Care</h1>
            </div>
          </motion.div>

          <motion.div
            className="right-panel"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <RegisterForm />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Register;
