# 🍕 Trendy Restaurant E-Commerce Platform

A full-stack e-commerce platform for restaurant order management. Users can browse the menu, add items to cart, and checkout securely with JWT authentication and MongoDB storage.

**Version**: 2.0.0 | **Status**: Production Ready

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

---

## ✨ Features

- **🔐 Secure Authentication** – JWT-based login/signup with bcryptjs password hashing
- **🛒 Protected Shopping** – Login required to add items to cart and checkout
- **☁️ Cloud Database** – MongoDB Atlas for scalable, serverless data storage
- **📱 Responsive Design** – Mobile-friendly React.js frontend
- **⚡ Fast Backend** – Node.js/Express for quick API responses
- **🔒 Production Security** – Password hashing, token verification, CORS enabled

---

## 🛠️ Tech Stack

### Frontend
- **React.js** 18 – UI library
- **React Router** v6 – Client-side routing
- **Axios** – HTTP client
- **Context API** – State management

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** 4.18 – Web framework
- **MongoDB Atlas** – Cloud database
- **Mongoose** 8.0 – ODM library
- **JWT** (jsonwebtoken) – Token authentication
- **bcryptjs** – Password hashing

### Database
- **MongoDB Atlas** – NoSQL cloud database

---

## 📝 Prerequisites

- **Node.js** v14.0.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (optional, for cloning)

---

## 📥 Installation

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/yourusername/E-Commerce-Platform.git
cd E-Commerce-Platform
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### MongoDB Atlas Setup

1. **Create MongoDB Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up (free tier available)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select your region
   - Click "Create Cluster"

3. **Create Database User**
   - Click "Database Access"
   - Click "Add New Database User"
   - Set username and strong password
   - Click "Add User"

4. **Get Connection String**
   - Click "Databases" → Your Cluster
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string

5. **Create .env File**
   - In the `backend` folder, create a `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_random_string_here
PORT=8081
```

Replace:
- `username` and `password` with your MongoDB user credentials
- `cluster0.xxxxx` with your actual cluster URL
- `JWT_SECRET` with a random secure string (use: [randomkeygen.com](https://randomkeygen.com/))

### Whitelist IP in MongoDB

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access"
3. Click "Add IP Address"
4. Choose "Allow access from anywhere" (for development) or add your IP
5. Click "Confirm"

> ⚠️ **Security Note**: For production, whitelist specific IPs instead of allowing all addresses.

---

## 🚀 Running the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm start
```

Backend will run on: **http://localhost:8081**

### Terminal 2 - Start Frontend Application

```bash
cd frontend
npm start
```

Frontend will run on: **http://localhost:3000**

Your browser will automatically open the application.

---

## 🔐 Authentication Flow

1. **User Registration** – Sign up with name, email, and password
2. **Password Security** – Password hashed with bcryptjs (never stored in plain text)
3. **JWT Token** – Login returns a secure JWT token
4. **Token Storage** – Token saved in browser's localStorage
5. **Protected Routes** – Cart and checkout require valid authentication
6. **Session Persistence** – Login state automatically restored on page reload
7. **Logout** – Token removed from localStorage

## � API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/signup` | Create new user account | ❌ No |
| POST | `/login` | Login and get JWT token | ❌ No |
| GET | `/profile` | Get current user profile | ✅ Yes |

### Cart Endpoints (Protected)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/cart/add` | Add item to cart | ✅ Yes |
| GET | `/cart` | Get user's cart items | ✅ Yes |
| POST | `/cart/remove` | Remove item from cart | ✅ Yes |
| POST | `/cart/clear` | Clear entire cart | ✅ Yes |

> All cart endpoints require valid JWT token in Authorization header

## � Project Structure

```
E-Commerce-Platform/
│
├── backend/                          # Node.js/Express Backend
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Cart.js                  # Cart schema
│   │   └── Order.js                 # Order schema
│   ├── server.js                    # Main server file
│   ├── package.json                 # Backend dependencies
│   ├── .env.example                 # Environment template
│   └── .gitignore
│
├── frontend/                         # React.js Frontend
│   ├── public/
│   │   ├── index.html               # HTML entry point
│   │   ├── manifest.json            # PWA manifest
│   │   └── robots.txt               # SEO robots
│   │
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Assets/              # Product data
│   │   │   ├── Breadcrums/          # Breadcrumb navigation
│   │   │   ├── CartItems/           # Cart display
│   │   │   ├── Footer/              # Footer component
│   │   │   ├── Hero/                # Hero section
│   │   │   ├── Items/               # Product item
│   │   │   ├── navbar/              # Navigation bar
│   │   │   ├── NewsLetter/          # Newsletter signup
│   │   │   ├── Offers/              # Promotions
│   │   │   ├── Popular/             # Popular items
│   │   │   ├── ProductDisplay/      # Product detail
│   │   │   └── WeekendSpecial/      # Special offers
│   │   │
│   │   ├── context/                 # Context API
│   │   │   └── ShopContext.jsx      # Global state management
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── About.jsx            # About page
│   │   │   ├── Cart.jsx             # Shopping cart
│   │   │   ├── Checkout.jsx         # Checkout process
│   │   │   ├── Contact.jsx          # Contact page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   ├── Product.jsx          # Product details
│   │   │   ├── Shop.jsx             # Shop main page
│   │   │   ├── ShopCategory.jsx     # Category filter
│   │   │   ├── Payment.jsx          # Payment page
│   │   │   ├── OrderConfirmation.jsx# Confirmation page
│   │   │   └── OrderHistory.jsx     # Order history
│   │   │
│   │   ├── utils/
│   │   │   └── generatePDF.js       # PDF generation
│   │   │
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global CSS
│   │
│   └── package.json                 # Frontend dependencies
│
├── README.md                         # This file
└── .gitignore                        # Git ignore rules
```