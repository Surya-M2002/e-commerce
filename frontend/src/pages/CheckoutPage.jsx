import React, { useState } from "react";
import API_URL from "../config";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaMobileAlt,
} from "react-icons/fa";

const CheckoutPage = ({ cartItems, onOrderPlaced }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleCheckAvailability = () => {
    setIsVerified(true);
  };

  const handlePlaceOrder = async () => {
    let paymentMeta = { payment: selectedPayment };
    if (selectedPayment === "upi") {
      try {
        const res = await fetch(`${API_URL}/payments/initiate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "upi", amount: subtotal })
        });
        if (res.ok) {
          const data = await res.json();
          paymentMeta = { payment: "upi", paymentId: data.id, upiIntent: data.upi?.intent };
          try { localStorage.setItem("pb_last_payment", JSON.stringify(data)); } catch { void 0; }
        }
      } catch { void 0; }
    }
    setShowSuccess(true);
    setTimeout(() => {
      onOrderPlaced(paymentMeta);
    }, 2000);
  };

  return (
    <div className="checkout-page bg-light min-vh-100 py-5 position-relative">

      {/* ✅ SUCCESS MODAL */}
      {showSuccess && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}
        >
          <div className="bg-white p-5 rounded-3 shadow-lg text-center animate-scale-up">
            <FaCheckCircle size={70} className="text-success mb-3" />
            <h3 className="fw-bold">Order Successful!</h3>
            <p className="text-muted mb-0">Redirecting...</p>
          </div>
        </div>
      )}

      <div className="container-xxl">
        <div className="row g-4">

          {/* LEFT SECTION */}
          <div className="col-lg-8">

            {/* Step 1 */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h5 className="fw-bold mb-3">1. Contact Number</h5>
              <input
                type="text"
                className="form-control"
                defaultValue="+91 98765 43210"
              />
            </div>

            {/* Step 2 */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h5 className="fw-bold mb-3">2. Billing Address</h5>
              <div className="border p-3 rounded bg-light">
                12/A, Gandhiji Street, Erode – 638001, Tamil Nadu
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h5 className="fw-bold mb-3">3. Shipping Address</h5>
              <div className="border p-3 rounded bg-light">
                No. 45, Saradha College Road, Salem – 636007, Tamil Nadu
              </div>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="col-lg-4">
            <div
              className="bg-white p-4 rounded-3 shadow-sm sticky-top"
              style={{ top: 100, zIndex: 900 }}
            >
              <h5 className="fw-bold text-center mb-4">Your Order</h5>

              {/* Cart Items */}
              <div className="mb-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="order-item d-flex justify-content-between align-items-center small mb-2"
                  >
                    <span className="d-flex align-items-center gap-2">
                      <img
                        src={item.img || 'https://placehold.co/40x40?text=IMG'}
                        alt={item.name}
                        width={32}
                        height={32}
                        style={{ objectFit: 'contain', borderRadius: 4 }}
                      />
                      {item.quantity} × {item.name}
                    </span>
                    <span className="fw-bold">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-top pt-3 mb-4 d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>{formatINR(subtotal)}</span>
              </div>

              {!isVerified ? (
                <button
                  className="btn btn-success w-100 py-3 fw-bold rounded"
                  onClick={handleCheckAvailability}
                >
                  Check Availability
                </button>
              ) : (
                <>
                  <h6 className="fw-bold mb-3">Payment Method</h6>

                  <label className="d-flex gap-3 align-items-center border p-3 rounded mb-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedPayment === "cod"}
                      onChange={() => setSelectedPayment("cod")}
                    />
                    <FaMoneyBillWave />
                    Cash On Delivery
                  </label>

                  <label className="d-flex gap-3 align-items-center border p-3 rounded mb-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedPayment === "upi"}
                      onChange={() => setSelectedPayment("upi")}
                    />
                    <FaMobileAlt />
                    UPI / GPay / PhonePe
                  </label>

                  <button
                    className="btn btn-success w-100 py-3 fw-bold rounded"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
