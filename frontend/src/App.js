
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCatagory from './pages/ShopCatagory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import Footer from './components/Footer/Footer';
import food_banner from './components/Assets/banner_foods.jpg';
import sweet_banner from './components/Assets/banner_sweets.jpg';
import drink_banner from './components/Assets/banner_drinks.jpg';
import Login from './pages/Login';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check for stored token on app mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (token && loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle auto logout when user leaves or closes browser
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      console.log('User logged out - browser closed');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  }

  
  return (
    <div>
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} updateLoginStatus={updateLoginStatus} />
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/foods' element={<ShopCatagory banner={food_banner} catagory="food"/>}/>
      <Route path='/sweets' element={<ShopCatagory banner={sweet_banner} catagory="sweet"/>}/>
      <Route path='/drinks' element={<ShopCatagory banner={drink_banner} catagory="drink"/>}/>
      <Route path="product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/order-confirmation' element={<OrderConfirmation/>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes><br />
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
