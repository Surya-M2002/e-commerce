import React, { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

const CartDrawer = ({ isOpen, onClose, cart, onUpdate, onRemoveItem, total, onCheckout }) => {
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
 
                <img src={item.img || item.image || 'https://placehold.co/60x60?text=IMG'} width="60" height="60" className="rounded" alt={item.name} />
 
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="m-0 fw-bold">{item.name}</h6>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                  <div className="text-muted small">{item.unit}</div>
                  <div className="fw-bold text-success">{formatINR(item.price * item.quantity)}</div>
                </div>
              </div>
            ))
          )}
        </div>
 
        <div className="drawer-footer p-4 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-semibold">Total</span>
            <span className="fw-bold text-success">{formatINR(total)}</span>
          </div>
          <button className="btn btn-success w-100 fw-bold" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
