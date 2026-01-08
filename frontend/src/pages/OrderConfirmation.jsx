import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generatePDF } from "../utils/generatePDF";
import { ShopContext } from "../context/ShopContext";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useContext(ShopContext);
    const [orderData, setOrderData] = useState(null);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        if (location.state) {
            setOrderId(location.state.orderId);
            setOrderData(location.state.orderData);
            // Clear cart after successful payment
            clearCart();
        } else {
            // Redirect to home if no order data
            navigate("/");
        }
    }, [location, navigate, clearCart]);

    const handleDownloadPDF = () => {
        if (orderData && orderId) {
            generatePDF(orderData, orderId);
        }
    };

    const handleContinueShopping = () => {
        navigate("/");
    };

    if (!orderData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="order-confirmation-container">
            <div className="confirmation-content">
                {/* Success Icon */}
                <div className="success-icon">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="40" cy="40" r="40" fill="#8de593" />
                        <path
                            d="M35 50L25 40M35 50L55 30"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Success Message */}
                <h1>Order Placed Successfully!</h1>
                <p className="subtitle">Thank you for your purchase</p>

                {/* Order Details */}
                <div className="order-details-box">
                    <div className="detail-row">
                        <span className="label">Order ID:</span>
                        <span className="value">{orderId}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Order Date:</span>
                        <span className="value">
                            {new Date().toLocaleDateString()}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Customer Name:</span>
                        <span className="value">{orderData.customerName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Email:</span>
                        <span className="value">{orderData.customerEmail}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Phone:</span>
                        <span className="value">{orderData.customerPhone}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Delivery Address:</span>
                        <span className="value">{orderData.deliveryAddress}</span>
                    </div>
                </div>

                {/* Items Summary */}
                <div className="items-summary">
                    <h3>Order Items</h3>
                    <div className="items-list">
                        {orderData.items.map((item, index) => (
                            <div key={index} className="item-row">
                                <div className="item-info">
                                    <p className="item-name">{item.productName}</p>
                                    <p className="item-meta">
                                        Quantity: {item.quantity} × Rs. {item.price}
                                    </p>
                                </div>
                                <p className="item-total">Rs. {item.total}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Amount */}
                <div className="total-section">
                    <div className="total-row">
                        <span>Subtotal</span>
                        <span>Rs. {orderData.subtotal}</span>
                    </div>
                    <div className="total-row">
                        <span>Delivery Fee</span>
                        <span>Free</span>
                    </div>
                    <div className="total-row final">
                        <span>Total Amount</span>
                        <span>Rs. {orderData.total}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="actions">
                    <button 
                        className="btn btn-primary" 
                        onClick={handleDownloadPDF}
                    >
                        📥 Download Receipt (PDF)
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>

                {/* Additional Info */}
                <div className="info-box">
                    <p>
                        <strong>Note:</strong> Your order has been confirmed and will be processed soon. 
                        You will receive updates on your email and phone number.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
