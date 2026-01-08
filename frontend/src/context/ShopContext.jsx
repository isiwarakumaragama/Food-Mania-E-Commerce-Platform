import React, {createContext, useState, useEffect} from "react";
import all_product from '../components/Assets/all_product';

export  const ShopContext = createContext(null);
const getDefaultCart = () =>{
    let cart = {};
    for(let index = 0; index < all_product.length+1;index++){
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) =>{
    const[cartItems,setCartItems] = useState(getDefaultCart());
    const[isLoggedInState, setIsLoggedInState] = useState(localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token'));
    
    // Check if user is logged in
    const isUserLoggedIn = () => {
        return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token');
    };
    
    // Update login state when localStorage changes
    React.useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedInState(isUserLoggedIn());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (itemId) =>{
        const loggedIn = isUserLoggedIn();
        console.log('Add to cart called - isLoggedIn:', loggedIn, 'token:', localStorage.getItem('token'), 'isLoggedIn flag:', localStorage.getItem('isLoggedIn'));
        if (!loggedIn) {
            alert('Please login first to add items to cart');
            window.location.href = '/login';
            return;
        }
        console.log('Adding item to cart:', itemId);
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
    }
    const increaseQuantity = (itemId) =>{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
    }
    const decreaseQuantity = (itemId) =>{
        setCartItems((prev) =>({
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId]-1 : 1
        }))
    }
    const clearCart = () =>{
        setCartItems(getDefaultCart());
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };
    const getTotalCartItem = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };
    
    const setLoginState = (loggedIn) => {
        setIsLoggedInState(loggedIn);
    };
    
    const contextValue = {getTotalCartItem,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart,isUserLoggedIn,isLoggedIn:isLoggedInState,setLoginState};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;