import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Let us know how we can help!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              
              {submitStatus && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your message..."
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <h2>Contact Information</h2>

              <div className="contact-info-items">
                <div className="contact-info-item card">
                  <div className="info-icon">📍</div>
                  <h3>Address</h3>
                  <p>123 Food Street<br/>Culinary City, CC 12345<br/>Country</p>
                </div>

                <div className="contact-info-item card">
                  <div className="info-icon">📞</div>
                  <h3>Phone</h3>
                  <p>
                    <strong>Customer Support:</strong><br/>
                    +1 (555) 123-4567<br/>
                    <strong>Reservations:</strong><br/>
                    +1 (555) 987-6543
                  </p>
                </div>

                <div className="contact-info-item card">
                  <div className="info-icon">✉️</div>
                  <h3>Email</h3>
                  <p>
                    <strong>General:</strong><br/>
                    info@foodmania.com<br/>
                    <strong>Support:</strong><br/>
                    support@foodmania.com
                  </p>
                </div>

                <div className="contact-info-item card">
                  <div className="info-icon">🕐</div>
                  <h3>Working Hours</h3>
                  <p>
                    <strong>Monday - Friday:</strong><br/>
                    9:00 AM - 10:00 PM<br/>
                    <strong>Saturday - Sunday:</strong><br/>
                    10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#facebook" className="social-icon">
                    <span>f</span>
                  </a>
                  <a href="#twitter" className="social-icon">
                    <span>𝕏</span>
                  </a>
                  <a href="#instagram" className="social-icon">
                    <span>📷</span>
                  </a>
                  <a href="#linkedin" className="social-icon">
                    <span>in</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="map-placeholder">
          <div className="map-content">
            <span>📍</span>
            <p>Our Location</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item card">
              <h3>What are your delivery times?</h3>
              <p>We typically deliver within 30-45 minutes of order confirmation. During peak hours, it may take up to 60 minutes.</p>
            </div>
            <div className="faq-item card">
              <h3>Do you offer catering services?</h3>
              <p>Yes! We offer special catering packages for events. Please contact us directly for a custom quote.</p>
            </div>
            <div className="faq-item card">
              <h3>Can I modify my order?</h3>
              <p>You can modify your order within 5 minutes of placing it. Contact us immediately through the app or phone.</p>
            </div>
            <div className="faq-item card">
              <h3>What payment methods do you accept?</h3>
              <p>We accept credit cards, debit cards, digital wallets, and cash on delivery for eligible areas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
