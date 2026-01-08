import React, { useState, useContext } from 'react';
import all_product from '../components/Assets/all_product';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();
  const { addToCart, isLoggedIn, all_product: contextProducts } = useContext(ShopContext);

  const filteredProducts = selectedCategory === 'all' 
    ? contextProducts 
    : contextProducts.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.new_price - b.new_price;
      case 'price-high':
        return b.new_price - a.new_price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product.id);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1>Our Menu</h1>
          <p>Discover our delicious selection of food items</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="menu-filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-group">
              <h3>Category</h3>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Items
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'food' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('food')}
                >
                  Foods
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'sweet' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('sweet')}
                >
                  Sweets
                </button>
                <button 
                  className={`filter-btn ${selectedCategory === 'drink' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('drink')}
                >
                  Drinks
                </button>
              </div>
            </div>

            <div className="sort-group">
              <h3>Sort By</h3>
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="menu-items-section">
        <div className="container">
          <div className="menu-items-count">
            <p>Showing {sortedProducts.length} items</p>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="menu-grid">
              {sortedProducts.map((product) => (
                <div key={product.id} className="menu-item-card card">
                  <div className="menu-item-image">
                    <img src={product.image} alt={product.name} />
                    <div className="menu-item-overlay">
                      <button 
                        className="btn-primary"
                        onClick={() => handleViewDetails(product)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="menu-item-content">
                    <h3>{product.name}</h3>
                    {product.description && <p className="item-description">{product.description}</p>}

                    {/* Rating */}
                    {product.rating && (
                      <div className="item-rating">
                        <span className="stars">⭐ {product.rating}</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                      </div>
                    )}

                    {/* Details */}
                    {(product.prepTime || product.servings) && (
                      <div className="item-details">
                        {product.prepTime && (
                          <div className="detail-badge">
                            <span className="detail-icon">⏱️</span>
                            <span>{product.prepTime}</span>
                          </div>
                        )}
                        {product.servings && (
                          <div className="detail-badge">
                            <span className="detail-icon">👥</span>
                            <span>{product.servings} {product.servings === 1 ? 'Serving' : 'Servings'}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ingredients */}
                    {product.ingredients && (
                      <div className="item-ingredients">
                        <p className="ingredients-label">Key Ingredients:</p>
                        <div className="ingredients-list">
                          {product.ingredients.slice(0, 3).map((ingredient, idx) => (
                            <span key={idx} className="ingredient-tag">{ingredient}</span>
                          ))}
                          {product.ingredients.length > 3 && (
                            <span className="ingredient-tag more">+{product.ingredients.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Price and Action */}
                    <div className="item-footer">
                      <div className="item-price">
                        <span className="price-new">Rs {product.new_price.toFixed(2)}</span>
                        <span className="price-old">Rs {product.old_price.toFixed(2)}</span>
                        <span className="discount">
                          {Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF
                        </span>
                      </div>
                      <button 
                        className="btn-add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No items found</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="menu-info-section">
        <div className="container">
          <h2>About Our Menu</h2>
          <div className="info-grid">
            <div className="info-item card">
              <div className="info-icon">🌟</div>
              <h3>Quality Ingredients</h3>
              <p>All our dishes are prepared using the freshest and highest quality ingredients sourced locally and internationally.</p>
            </div>
            <div className="info-item card">
              <div className="info-icon">👨‍🍳</div>
              <h3>Expert Preparation</h3>
              <p>Our experienced chefs prepare each dish with care and precision following traditional and modern cooking techniques.</p>
            </div>
            <div className="info-item card">
              <div className="info-icon">🍽️</div>
              <h3>Variety</h3>
              <p>We offer a diverse menu with options to cater to different tastes and dietary preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
