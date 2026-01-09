import React, { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

const CartDrawer = ({ isOpen, onClose, cart, onUpdate, onRemoveItem, total, onCheckout }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
 
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
 
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
          <h6 className="m-0 fw-bold text-success d-flex align-items-center gap-2">
            👜 {cart.length} Items
          </h6>
          <button className="btn rounded-circle bg-success text-white" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
 
        <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '70vh' }}>
          {cart.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-3 display-1">🛒</div>
              <p className="text-muted mt-3">No products found</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="d-flex gap-3 px-4 py-4 border-bottom">
                <div className="qty-vertical">
                  <button onClick={() => onUpdate(item, 1)}>
                    <Plus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdate(item, -1)}>
                    <Minus size={14} />
                  </button>
                </div>
 
                <img src={item.img} alt={item.name} width="60" height="60" className="rounded" />
 
                <div className="flex-grow-1">
                  <div className="fw-bold">{item.name}</div>
                  <div className="text-success fw-bold">{formatINR(item.price)}</div>
                  <small className="text-muted">{item.quantity} × {item.unit || "1 pc"}</small>
                </div>
 
                <div className="text-end">
                  <div className="fw-bold mb-2">{formatINR(item.price * item.quantity)}</div>
                  <button className="btn btn-sm text-muted" onClick={() => onRemoveItem(item.id)}>×</button>
                </div>
              </div>
            ))
          )}
        </div>
 
        {cart.length > 0 && (
          <div className="p-4">
            <button 
              className="checkout-btn d-flex justify-content-between align-items-center w-100"
              onClick={() => {
                onClose();
                onCheckout();
              }}
            >
              <span>Checkout</span>
            <span className="price-pill">{formatINR(total)}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartDrawer;
