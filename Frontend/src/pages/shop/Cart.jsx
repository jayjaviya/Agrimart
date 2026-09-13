import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Heart, Trash2, Minus, Plus, Lock, Headset, ShieldCheck } from 'lucide-react';
import '../../styles/shop/Cart.css';

import pumpImg from '../../assets/images/tools-equipment.png';
import wheatImg from '../../assets/images/premium-seeds.png';

const initialCart = [
  {
    id: 1,
    category: 'IRRIGATION',
    name: 'High-Capacity Centrifugal Pump Pro X',
    sku: 'AG-PMP-892',
    price: 1249.00,
    quantity: 1,
    image: pumpImg
  },
  {
    id: 2,
    category: 'SEED VARIETIES',
    name: 'Drought-Resistant Wheat Hybrid Alpha',
    sku: 'AG-SD-104 • 50kg Bag',
    price: 185.50,
    quantity: 2,
    image: wheatImg
  }
];

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  const handleIncrease = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const professionalDiscount = -50.00;
  const delivery = 125.00;
  const total = subtotal > 0 ? subtotal + professionalDiscount + delivery : 0;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="cart-page">
      <div className="cart-container">
        
        {/* Header */}
        <header className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{totalItems} items in your professional order.</p>
        </header>

        <div className="cart-layout">
          {/* Left Column - Items */}
          <div className="cart-items-column">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <Link to="/products" className="btn-continue-empty">Continue Shopping</Link>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item._id} className="cart-item-card">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <span className="cart-item-category">{item.category}</span>
                        <h3 className="cart-item-title">{item.name}</h3>
                        <span className="cart-item-sku">SKU: {item.sku || 'N/A'}</span>
                      </div>
                      <div className="cart-item-price-wrap">
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        <span className="cart-item-unit">/ unit</span>
                      </div>
                    </div>

                    <div className="cart-item-actions-row">
                      <div className="cart-quantity-selector">
                        <button onClick={() => handleDecrease(item._id, item.quantity)} aria-label="Decrease"><Minus size={14} /></button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={() => handleIncrease(item._id, item.quantity)} aria-label="Increase"><Plus size={14} /></button>
                      </div>

                      <div className="cart-item-actions">
                        <button className="btn-action">
                          <Heart size={14} /> Move to Wishlist
                        </button>
                        <button className="btn-action text-danger" onClick={() => handleRemove(item._id)}>
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="cart-summary-column">
            <div className="cart-summary-box">
              <h2>Order Summary</h2>
              <hr />
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="summary-row">
                <span>Professional Discount</span>
                <span className="text-success">${Math.abs(professionalDiscount).toFixed(2).replace(/^/, '-$')}</span>
              </div>
              <div className="summary-row">
                <span>Heavy-Duty Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              
              <hr />

              <div className="summary-total-row">
                <span>Total</span>
                <span className="total-price">${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>

              <div className="promo-code-section">
                <label>PROMO CODE</label>
                <div className="promo-input-group">
                  <input type="text" placeholder="Enter code" />
                  <button>Apply</button>
                </div>
              </div>

              <button className="btn-checkout" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
              
              <div className="continue-shopping-wrap">
                <Link to="/products" className="link-continue">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="value-props-divider" />

        {/* Value Props */}
        <div className="cart-value-props">
          <div className="value-prop-item">
            <Lock size={32} />
            <h4>Secure Checkout</h4>
            <p>Enterprise-grade encryption for all transactions.</p>
          </div>
          <div className="value-prop-item center-prop">
            <Headset size={32} />
            <h4>24/7 Expert Support</h4>
            <p>Dedicated agricultural specialists available anytime.</p>
          </div>
          <div className="value-prop-item">
            <ShieldCheck size={32} />
            <h4>Professional Grade</h4>
            <p>Certified equipment for serious farming operations.</p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Cart;
