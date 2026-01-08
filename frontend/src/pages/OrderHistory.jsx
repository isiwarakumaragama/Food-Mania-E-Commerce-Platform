import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";
import { generatePDF } from "../utils/generatePDF";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    setError("Please login to view your order history");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    "http://localhost:8081/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                setOrders(response.data);
                setError("");
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load order history. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDownloadPDF = (order) => {
        const orderData = {
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            deliveryAddress: order.deliveryAddress,
            items: order.items,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
            paymentStatus: order.paymentStatus,
            orderDate: order.orderDate
        };
        generatePDF(orderData, order._id);
    };

    if (loading) {
        return <div className="order-history-container"><div className="loading">Loading order history...</div></div>;
    }

    if (error) {
        return <div className="order-history-container"><div className="error-message">{error}</div></div>;
    }

    return (
        <div className="order-history-container">
            <div className="order-history-content">
                <h1>📋 Order History</h1>
                
                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>You haven't placed any orders yet.</p>
                        <p>Start shopping to see your order history here!</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <div className="order-id-date">
                                        <h3>Order #{order._id.substring(0, 8).toUpperCase()}</h3>
                                        <p className="order-date">
                                            {new Date(order.orderDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="order-status">
                                        <span className={`status-badge ${order.status}`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-details">
                                    <div className="customer-info">
                                        <p><strong>Name:</strong> {order.customerName}</p>
                                        <p><strong>Email:</strong> {order.customerEmail}</p>
                                        <p><strong>Phone:</strong> {order.customerPhone}</p>
                                        <p><strong>Address:</strong> {order.deliveryAddress}</p>
                                    </div>
                                </div>

                                <div className="order-items">
                                    <h4>Items Ordered:</h4>
                                    <div className="items-table">
                                        <div className="table-header">
                                            <span>Product</span>
                                            <span>Quantity</span>
                                            <span>Price</span>
                                            <span>Total</span>
                                        </div>
                                        {order.items.map((item, index) => (
                                            <div key={index} className="table-row">
                                                <span className="item-name">{item.productName}</span>
                                                <span>{item.quantity}</span>
                                                <span>Rs. {item.price}</span>
                                                <span className="item-total">Rs. {item.total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="order-totals">
                                    <div className="total-row">
                                        <span>Subtotal:</span>
                                        <span>Rs. {order.subtotal}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Delivery Fee:</span>
                                        <span>{order.deliveryFee === 0 ? "Free" : `Rs. ${order.deliveryFee}`}</span>
                                    </div>
                                    <div className="total-row final">
                                        <span>Total:</span>
                                        <span>Rs. {order.total}</span>
                                    </div>
                                </div>

                                <div className="order-actions">
                                    <button 
                                        className="btn-download-pdf"
                                        onClick={() => handleDownloadPDF(order)}
                                    >
                                        📥 Download Receipt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
