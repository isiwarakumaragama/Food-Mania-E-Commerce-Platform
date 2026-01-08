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
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

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

## 🧪 Testing the Application

### Test User Registration
1. Navigate to `/signup`
2. Enter name, email, and password
3. Click "Continue"
4. You'll be redirected to login page
5. Login with your new credentials

### Test User Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Continue"
4. You'll be logged in and redirected to home

### Test Cart Protection (Logged Out)
1. Logout or open in a private/incognito window
2. Try to add an item to the cart
3. You'll be redirected to login page

### Test Checkout Protection
1. Logout or open in a private window
2. Try to access `/cart` or `/checkout`
3. You'll be redirected to login page

### Test Complete Purchase Flow
1. Login with valid credentials
2. Browse products
3. Add items to cart
4. Go to cart page
5. Proceed to checkout
6. Complete payment
7. View order confirmation

---

## 🚀 Deployment

### Deploy Backend

**Option 1: Heroku**
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

**Option 2: Railway, Render, or Vercel**
- Connect your GitHub repository
- Set environment variables in dashboard
- Deploy with one click

### Deploy Frontend

**Option 1: Vercel (Recommended for React)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Option 2: Netlify**
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build`

**Option 3: GitHub Pages**
- Configure `homepage` in package.json
- Run `npm run build`
- Deploy from `build` folder

### Update API URL for Production
After deploying backend, update the API URL in frontend code:

**Frontend API Configuration**
- Update axios baseURL to your production backend URL
- Example: `https://your-backend.herokuapp.com`

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem**: `Error connecting to MongoDB`

**Solutions**:
- ✅ Verify `MONGODB_URI` in `.env` is correct
- ✅ Check MongoDB Atlas IP whitelist includes your IP
- ✅ Ensure database user has correct password
- ✅ Verify cluster is running in MongoDB Atlas dashboard
- ✅ Check internet connection

### Authentication Issues

**Problem**: `Can't login even with correct credentials`

**Solutions**:
- ✅ Clear browser localStorage: `localStorage.clear()`
- ✅ Clear browser cookies
- ✅ Check if user exists in MongoDB
- ✅ Verify JWT_SECRET is same on backend
- ✅ Check browser console for errors (F12)

### Port Already in Use

**Problem**: `Port 8081 or 3000 is already in use`

**Windows**:
```powershell
# Find process on port 8081
netstat -ano | findstr :8081

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
# Find and kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### CORS Errors

**Problem**: `CORS policy error when frontend calls backend`

**Solutions**:
- ✅ Verify backend has CORS enabled
- ✅ Check frontend API URL matches backend domain
- ✅ Ensure credentials are included in requests
- ✅ Check backend .env has correct allowed origins

### Cart Not Saving

**Problem**: `Items disappear from cart after refresh`

**Solutions**:
- ✅ Verify user is logged in (check localStorage for token)
- ✅ Check browser console for errors
- ✅ Verify MongoDB is connected
- ✅ Check cart endpoints in backend are working

### More Issues?

Check the following:
1. **Server logs** – Run backend in terminal to see errors
2. **Browser console** – Press F12 to open DevTools
3. **Network tab** – Check API request/response in DevTools
4. **MongoDB Atlas** – Verify cluster is running
5. **Environment variables** – Confirm .env file is correct

---

## 🔒 Security Best Practices

✅ **Do's:**
- Keep `.env` file private (add to `.gitignore`)
- Use strong JWT_SECRET (min 32 characters)
- Use strong database passwords
- Enable HTTPS in production
- Whitelist specific IPs in MongoDB Atlas (production)
- Keep dependencies updated (`npm audit fix`)
- Validate all user inputs on backend
- Use HTTPS only in production

❌ **Don'ts:**
- Never commit `.env` file to git
- Never use weak passwords
- Never push to production without testing
- Never allow access from `0.0.0.0/0` in production
- Never store passwords in plain text
- Never expose API keys in client code
- Never disable CORS without good reason

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Test your changes before submitting PR
- Write clear commit messages

---

## 📄 License

This project is **open source** and available under the MIT License. Feel free to use, modify, and distribute as needed.

---

## 📞 Support & Questions

If you encounter issues:

1. **Check Troubleshooting** – See the troubleshooting section above
2. **Search Issues** – Check GitHub issues for similar problems
3. **Check Logs** – Review terminal output and browser console
4. **Verify Setup** – Ensure all steps were followed correctly

---

## 🎉 Getting Started Checklist

- [ ] Fork/Clone the repository
- [ ] Install Node.js v14+
- [ ] Create MongoDB Atlas account
- [ ] Copy repository to your machine
- [ ] Install backend dependencies (`cd backend && npm install`)
- [ ] Install frontend dependencies (`cd frontend && npm install`)
- [ ] Create `.env` file with MongoDB URI and JWT secret
- [ ] Whitelist your IP in MongoDB Atlas
- [ ] Start backend (`npm start` from backend folder)
- [ ] Start frontend (`npm start` from frontend folder)
- [ ] Test signup/login functionality
- [ ] Test adding items to cart (logged in)
- [ ] Test protection (logged out)
- [ ] Deploy to your hosting platform

---

## 📊 Project Statistics

- **Frontend**: React.js with 20+ components
- **Backend**: Node.js/Express with 3+ models
- **Database**: MongoDB with cloud storage
- **Total Pages**: 10+ user-facing pages
- **API Endpoints**: 7+ REST endpoints
- **Authentication**: JWT-based with bcryptjs hashing

---

**Version**: 2.0.0 (MongoDB + JWT)  
**Last Updated**: January 2026  
**Status**: ✅ Production Ready

Made with ❤️ for food lovers and developers
