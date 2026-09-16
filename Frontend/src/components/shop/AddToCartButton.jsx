import React, { useContext } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import '../../styles/shop/AddToCartButton.css';

const AddToCartButton = ({ product, variant = 'small' }) => {
  const { addToCart, decrementItem, getItemQuantity } = useContext(CartContext);
  const quantity = getItemQuantity(product._id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    decrementItem(product._id);
  };

  const isLarge = variant === 'large';

  if (quantity === 0) {
    return (
      <button className={`atc-btn atc-btn-add ${isLarge ? 'atc-btn-lg' : ''}`} onClick={handleAdd}>
        {isLarge ? 'Add to cart' : 'ADD'}
      </button>
    );
  }

  return (
    <div className={`atc-btn atc-counter ${isLarge ? 'atc-btn-lg' : ''}`}>
      <button className="atc-counter-btn" onClick={handleDecrement}>
        <Minus size={isLarge ? 18 : 14} />
      </button>
      <span className="atc-counter-qty">{quantity}</span>
      <button className="atc-counter-btn" onClick={handleIncrement}>
        <Plus size={isLarge ? 18 : 14} />
      </button>
    </div>
  );
};

export default AddToCartButton;

