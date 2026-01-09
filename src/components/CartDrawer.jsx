import React, { useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onUpdate,
  onRemoveItem,
  total,
  onCheckout,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const formatINR = (n) =>
    `₹${n.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="drawer-header d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
          <h6 className="m-0 fw-bold text-success">
            👜 {cart.length} Items
          </h6>
          <button
            className="btn rounded-circle bg-success text-white"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-1">🛒</div>
              <p className="text-muted">No products found</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Qty */}
                <div className="qty-box">
                  <button onClick={() => onUpdate(item, 1)}>
                    <Plus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdate(item, -1)}>
                    <Minus size={14} />
                  </button>
                </div>

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="cart-img"
                />

                {/* Info */}
                <div className="cart-info">
                  <div className="fw-bold">{item.name}</div>
                  <small className="text-muted">
                    {item.quantity} × {item.unit || "1 pc"}
                  </small>
                  <div className="text-success fw-bold">
                    {formatINR(item.price)}
                  </div>
                </div>

                {/* Remove */}
                <div className="cart-right">
                  <div className="fw-bold">
                    {formatINR(item.price * item.quantity)}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <button
              className="checkout-btn"
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
