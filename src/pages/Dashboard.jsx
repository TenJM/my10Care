import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import '../index.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [openProduct, setOpenProduct] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  const pastSearches = ['soap', 'cream', 'serum'];

  useEffect(() => {
    axios.get('http://localhost:1901/products')
      .then((res) => {
        console.log('Fetched products:', res.data); // Debug
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === 'price'
        ? a.price - b.price
        : (a.size || '').localeCompare(b.size || '')
    );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Past Searches</h3>
        <ul>
          {pastSearches.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaShoppingCart className="cart-icon" />
        </div>

        {/* Sort Dropdown */}
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="size">Size</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                {openProduct === product.id && (
                  <p>{product.description}</p>
                )}
                <div className="card-actions">
                  <button
                    className="toggle-btn"
                    onClick={() =>
                      setOpenProduct(openProduct === product.id ? null : product.id)
                    }
                  >
                    {openProduct === product.id ? 'Close' : 'Open'}
                  </button>
                  <button className="buy-btn">Buy Now</button>
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
