const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.log('Continuing without database connection...');
    });

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email and check password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get user profile (protected route)
app.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
});

// Add to cart (protected route)
app.post('/cart/add', verifyToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Please provide productId and quantity' });
        }

        let cart = await Cart.findOne({ userId: req.userId });

        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
        }

        // Check if product already in cart
        const existingItem = cart.items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.updatedAt = Date.now();
        await cart.save();

        res.json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
});

// Get user cart (protected route)
app.get('/cart', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
});

// Remove from cart (protected route)
app.post('/cart/remove', verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        cart.updatedAt = Date.now();
        await cart.save();

        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart' });
    }
});

// Clear cart (protected route)
app.post('/cart/clear', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.updatedAt = Date.now();
        await cart.save();

        res.json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
});

// Payment endpoint (protected route)
app.post('/api/payment', verifyToken, async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, deliveryAddress, items, subtotal, deliveryFee, total, paymentStatus, transactionId } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !items || items.length === 0) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create new order
        const order = new Order({
            userId: req.userId,
            customerName,
            customerEmail,
            customerPhone,
            deliveryAddress,
            items,
            subtotal,
            deliveryFee,
            total,
            paymentStatus,
            transactionId,
            status: 'confirmed'
        });

        // Save order to database
        await order.save();

        // Clear user's cart after successful payment
        await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });

        res.status(201).json({
            success: true,
            message: 'Payment processed successfully',
            orderId: order._id,
            order
        });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
});

// Get order details (protected route)
app.get('/api/orders/:orderId', verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized access to order' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details' });
    }
});

// Get all user orders (protected route)
app.get('/api/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});