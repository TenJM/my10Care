import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';

const productImage = process.env.PUBLIC_URL + "/assets/my10care.png";

const HomePage = () => {
  const [bgColor, setBgColor] = useState('sky');
  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBgColor('dark');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="home-wrapper"
      onMouseMove={(e) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
      }}
    >
      {/* Background transition */}
      <div className={`bg-layer ${bgColor === 'dark' ? 'dark-show' : 'dark-hide'}`} />

      {/* Left panel */}
      <motion.div
        className="floating-panel left-panel"
        animate={mouseX < window.innerWidth * 0.25 ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
      >
        <h2>🧴 Product Showcase</h2>
        <ul>
          <li>my10Care Touch</li>
          <li>my10Care Radiance Lotion</li>
          <li>my10Care Enriched Lotion</li>
          <li>my10Care Sporty Glow</li>
          <li>my10Care Fashion Looks</li>
          <li>my10Care Daily Moisture</li>
          <li>my10Care Skin Essentials</li>
          <li>my10Care Hydration Boost</li>

        </ul>
      </motion.div>
      <motion.div
  className="floating-panel top-panel"
  animate={mouseY < window.innerHeight * 0.15 ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
  transition={{ duration: 0.4 }}
>
  <div className="top-links">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <a href="#">Careers</a>
    <a href="#">Help</a>
    <a href="#">Menu</a>
  </div>
</motion.div>


      {/* Right panel */}
      <motion.div
  className="floating-panel right-panel"
  animate={mouseX > window.innerWidth * 0.75 ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
  transition={{ duration: 0.4 }}
>
  <h2>💃 Radiance in Action</h2>
  <ul>
   
  </ul>
  <img
    src={process.env.PUBLIC_URL + "/assets/nivea_model1.jpg"}
    alt="Nivea Model"
    className="model-image"
  />
</motion.div>
<motion.div
  className="bottom-panel"
  initial={{ y: 100, opacity: 0 }}
  animate={mouseY > window.innerHeight * 0.85 ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
  transition={{ duration: 0.4 }}
>
  <div className="bottom-info">
    <p>📍 Chennai, India</p>
    <p>📞 +91 12345 67890</p>
    <p>📧 support@my10Care.com</p>
    <div className="socials">
      <a href="#">Instagram</a> | <a href="#">Facebook</a> | <a href="#">Twitter</a>
    </div>
  </div>
</motion.div>



      {/* Product image */}
      <motion.img
        src={productImage}
        alt="Nivea Products"
        className="product-img"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Tagline */}
      <motion.h1
        className="tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={bgColor === 'dark' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Skin first. Always!
      </motion.h1>
    </div>
  );
};

export default HomePage;
