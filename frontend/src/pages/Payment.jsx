import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import "./Payment.css";

const Payment = () => {
    const navigate = useNavigate();
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    
    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        deliveryAddress: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getCartItems = () => {
        let items = [];
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    items.push({
                        productId: itemInfo.id,
                        productName: itemInfo.name,
                        price: itemInfo.new_price,
                        quantity: cartItems[itemId],
                        image: itemInfo.image,
                        total: itemInfo.new_price * cartItems[itemId]
                    });
                }
            }
        }
        return items;
    };

    const validateForm = () => {
        if (!formData.customerName.trim()) {
            setError("Please enter your name");
            return false;
        }
        if (!formData.customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
            setError("Please enter a valid email");
            return false;
        }
        if (!formData.customerPhone.trim() || !/^\d{10}$/.test(formData.customerPhone.replace(/\D/g, ''))) {
            setError("Please enter a valid 10-digit phone number");
            return false;
        }
        if (!formData.deliveryAddress.trim()) {
            setError("Please enter delivery address");
            return false;
        }
        if (!formData.cardNumber.trim() || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            setError("Please enter a valid 16-digit card number");
            return false;
        }
        if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            setError("Please enter expiry date in MM/YY format");
            return false;
        }
        if (!formData.cvv.trim() || !/^\d{3}$/.test(formData.cvv)) {
            setError("Please enter a valid 3-digit CVV");
            return false;
        }
        return true;
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const cartItems = getCartItems();
            const totalAmount = getTotalCartAmount();
            const token = localStorage.getItem('token');

            // Prepare order data
            const orderData = {
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                customerPhone: formData.customerPhone,
                deliveryAddress: formData.deliveryAddress,
                items: cartItems,
                subtotal: totalAmount,
                deliveryFee: 0,
                total: totalAmount,
                paymentStatus: "completed",
                transactionId: "TXN" + Date.now()
            };

            // Send payment request to backend
            const response = await axios.post(
                "http://localhost:8081/api/payment",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                // Navigate to order confirmation with order details
                navigate("/order-confirmation", { 
                    state: { 
                        orderId: response.data.orderId,
                        orderData: orderData
                    } 
                });
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError(err.response?.data?.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getTotalCartAmount();

    return (
        <div className="payment-container">
            <div className="payment-content">
                <h1>Payment Checkout</h1>
                
                <div className="payment-wrapper">
                    {/* Left Side - Payment Form */}
                    <div className="payment-form-section">
                        <form onSubmit={handlePayment}>
                            {error && <div className="error-message">{error}</div>}

                            {/* Customer Information */}
                            <div className="form-section">
                                <h3>Customer Information</h3>
                                <input
                                    type="text"
                                    name="customerName"
                                    placeholder="Full Name"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="customerEmail"
                                    placeholder="Email Address"
                                    value={formData.customerEmail}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="customerPhone"
                                    placeholder="Phone Number (10 digits)"
                                    value={formData.customerPhone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Delivery Address */}
                            <div className="form-section">
                                <h3>Delivery Address</h3>
                                <textarea
                                    name="deliveryAddress"
                                    placeholder="Enter your full delivery address"
                                    value={formData.deliveryAddress}
                                    onChange={handleInputChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            {/* Payment Information */}
                            <div className="form-section">
                                <h3>Card Information</h3>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number (16 digits)"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    maxLength="19"
                                    required
                                />
                                <div className="card-details">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        maxLength="5"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        maxLength="3"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="pay-button" 
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Complete Payment"}
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="payment-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {all_product.map((product) => {
                                if (cartItems[product.id] > 0) {
                                    return (
                                        <div key={product.id} className="summary-item">
                                            <img src={product.image} alt={product.name} />
                                            <div className="item-details">
                                                <p className="item-name">{product.name}</p>
                                                <p className="item-quantity">Qty: {cartItems[product.id]}</p>
                                                <p className="item-price">Rs. {product.new_price * cartItems[product.id]}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        
                        <div className="summary-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal}</span>
                            </div>
                            <div className="total-row">
                                <span>Delivery Fee</span>
                                <span>Free</span>
                            </div>
                            <div className="total-row total">
                                <span>Total Amount</span>
                                <span>Rs. {subtotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
