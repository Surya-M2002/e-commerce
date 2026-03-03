import React from 'react';
import { ShoppingBag } from 'lucide-react';

const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const FloatingCart = ({ totalItems, totalPrice }) => (
  <div className="floating-cart-exact">
    <div className="cart-top">
      <ShoppingBag size={18} className="mb-1" />
      <div style={{fontSize: '12px', fontWeight: 'bold'}}>{totalItems} Items</div>
    </div>
    <div className="cart-bottom">
      {formatINR(totalPrice)}
    </div>
  </div>
);

export default FloatingCart;
