import React, { useContext, useState } from "react";
import './Navbar.css';
import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = ({isLoggedIn, updateLoginStatus }) => {
        const navigate = useNavigate();
        const[menu,setMenu]=useState("shop");
        const {getTotalCartItem} = useContext(ShopContext);
        
        const handleLogout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userName');
          updateLoginStatus(false);
          navigate('/login');
        }

    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} className="nav-logo-img" alt="logo"/>
                <p>FOOD MANIA</p>
            </div>

            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}>
                    <Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>
                    {menu==="shop"?<hr className="active"/>:<hr/>}
                </li>
                <li onClick={()=>{setMenu("menu")}}>
                    <Link style={{ textDecoration: 'none'}} to='/menu'>Menu</Link>
                    {menu==="menu"?<hr className="active"/>:<hr/>}
                </li>
                <li onClick={()=>{setMenu("about")}}>
                    <Link style={{ textDecoration: 'none'}} to='/about'>About</Link>
                    {menu==="about"?<hr className="active"/>:<hr/>}
                </li>
                <li onClick={()=>{setMenu("contact")}}>
                    <Link style={{ textDecoration: 'none'}} to='/contact'>Contact</Link>
                    {menu==="contact"?<hr className="active"/>:<hr/>}
                </li>
            </ul>

            <div className="nav-login-cart">
            
                {isLoggedIn ? (
   
                     <>
                        <Link to='/order-history' style={{ textDecoration: 'none' }}>
                            <button className="history-btn">📋 History</button>
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                        <Link to='/cart'>
                            <div className="nav-cart-icon">
                                <img src={cart_icon} alt="cart" />
                                {getTotalCartItem() > 0 && <div className="nav-cart-count">{getTotalCartItem()}</div>}
                            </div>
                        </Link>
                    </>
                ) : (
                      
                    <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>
                 )}
            </div>
        </div>
    )
}
export default Navbar;