import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('agrimart_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('agrimart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Decrement by 1; if quantity becomes 0, remove from cart
  const decrementItem = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i._id === productId);
      if (!item) return prevItems;
      if (item.quantity <= 1) {
        return prevItems.filter(i => i._id !== productId);
      }
      return prevItems.map(i =>
        i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // Get quantity of a specific product in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i._id === productId);
    return item ? item.quantity : 0;
  };

  // Total items count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        decrementItem,
        getItemQuantity,
        cartCount,
        cartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
