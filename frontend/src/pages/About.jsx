import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Food Mania</h1>
          <p>Serving delicious food with passion and excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Food Mania was founded with a simple mission: to bring the finest quality food to your table. 
                Starting from a small kitchen in 2015, we've grown into a trusted name in the food delivery industry.
              </p>
              <p>
                We believe that good food goes beyond taste. It's about freshness, quality ingredients, and the love 
                we put into every dish. Our team works tirelessly to ensure that every bite you take is an experience 
                to remember.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F77F00 100%)' }}>
                <span>🍕</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional food experiences by maintaining the highest standards of quality, 
                freshness, and customer satisfaction in every order.
              </p>
            </div>
            <div className="mission-card card">
              <div className="card-icon">✨</div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and loved food delivery platform, known for our commitment 
                to excellence and customer delight.
              </p>
            </div>
            <div className="mission-card card">
              <div className="card-icon">❤️</div>
              <h3>Our Values</h3>
              <p>
                Quality, Integrity, Innovation, and Customer-centricity are at the heart of everything we do. 
                We're committed to sustainability and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Choose Food Mania?</h2>
          <div className="features-grid">
            <div className="feature-item card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="feature-item card">
              <div className="feature-icon">🔥</div>
              <h3>Fresh & Hot</h3>
              <p>Quality prepared and delivered hot and fresh</p>
            </div>
            <div className="feature-item card">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Expert Chefs</h3>
              <p>Experienced chefs preparing every dish with care</p>
            </div>
            <div className="feature-item card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Multiple payment options with secure transactions</p>
            </div>
            <div className="feature-item card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Customer support available round the clock</p>
            </div>
            <div className="feature-item card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Assured</h3>
              <p>Strict quality checks on every order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>150+</h3>
              <p>Food Items</p>
            </div>
            <div className="stat-item">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Orders Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Team</h2>
          <div className="team-grid">
            <div className="team-member card">
              <div className="member-avatar">👨‍💼</div>
              <h3>Isiwara Kumara</h3>
              <p>Founder & CEO</p>
              <small>Visionary leader with 10+ years in food industry</small>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👨‍🍳</div>
              <h3>Chef Rahul</h3>
              <p>Head Chef</p>
              <small>Experienced chef specializing in diverse cuisines</small>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p>Operations Manager</p>
              <small>Ensures smooth delivery and customer satisfaction</small>
            </div>
            <div className="team-member card">
              <div className="member-avatar">👨‍💼</div>
              <h3>David Martinez</h3>
              <p>Customer Success Lead</p>
              <small>Dedicated to making every customer experience special</small>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Experience Food Mania?</h2>
          <p>Order your favorite food now and taste the difference</p>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>
            Start Ordering
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
