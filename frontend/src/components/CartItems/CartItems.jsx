import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,increaseQuantity,decreaseQuantity,isUserLoggedIn} = useContext(ShopContext);
    const navigate = useNavigate();
    
    const handleProceedToCheckout = () => {
        if (!isUserLoggedIn()) {
            alert('Please login first to proceed to checkout');
            navigate('/login');
            return;
        }
        navigate('/payment');
    }

    return(
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return  <div key={e.id}>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className="carticon-product-icon" />
                        <p>{e.name}</p>
                        <p>Rs.{e.new_price}</p>
                        <div className="cartitems-quantity-container">
                            <button className="quantity-btn" onClick={()=>{decreaseQuantity(e.id)}}>-</button>
                            <span className="cartitems-quantity">{cartItems[e.id]}</span>
                            <button className="quantity-btn" onClick={()=>{increaseQuantity(e.id)}}>+</button>
                        </div>
                        <p>Rs.{e.new_price*cartItems[e.id]}</p>
                        <img className="carticon-remove-icon" src ={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""/>
                    </div>
                    <hr />
                    </div>
                }
                return null
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>Rs.{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Dilivery Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>Rs.{getTotalCartAmount()}</h3>
                    </div>
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}
export default CartItems;