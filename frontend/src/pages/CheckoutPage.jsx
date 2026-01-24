import React, { useEffect, useState } from "react";
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
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const token = (() => {
    try { return localStorage.getItem("pb_token") || ""; } catch { return ""; }
  })();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  useEffect(() => {
    const load = async () => {
      try {
        const local = localStorage.getItem("userProfile");
        if (local) {
          const parsed = JSON.parse(local);
          setPhone(String(parsed.phone || ""));
          setBillingAddress(String(parsed.address || ""));
        }
        const rawAddrs = localStorage.getItem("userAddresses");
        if (rawAddrs) {
          const arr = JSON.parse(rawAddrs);
          setAddresses(arr);
          const first = Array.isArray(arr) && arr.length ? String(arr[0].text || arr[0]) : "";
          setShippingAddress(first || String(JSON.parse(local)?.address || ""));
        }
      } catch { /* noop */ }
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setPhone(String(data.phone || ""));
          setBillingAddress(String(data.address || ""));
          const addrs = Array.isArray(data.addresses) ? data.addresses.map((t, i) => ({ id: Date.now() + i, text: String(t) })) : addresses;
          setAddresses(addrs);
          const first = Array.isArray(addrs) && addrs.length ? String(addrs[0].text) : "";
          setShippingAddress(first || String(data.address || ""));
        }
      } catch { /* noop */ }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Step 2 */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h5 className="fw-bold mb-3">2. Billing Address</h5>
              <textarea
                className="form-control"
                rows={3}
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="House / Street / City / Pincode"
              />
              <div className="mt-3 d-flex">
                <button
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      const next = { phone, address: billingAddress };
                      try { localStorage.setItem("userProfile", JSON.stringify({ ...(JSON.parse(localStorage.getItem("userProfile") || "{}")), ...next })); } catch { /* noop */ }
                      if (token) {
                        await fetch(`${API_URL}/users/me`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                          body: JSON.stringify(next)
                        });
                      }
                    } catch { /* noop */ }
                  }}
                >
                  Save Contact & Address
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
              <h5 className="fw-bold mb-3">3. Shipping Address</h5>
              <textarea
                className="form-control"
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="House / Street / City / Pincode"
              />
              {addresses.length > 0 && (
                <div className="mt-3">
                  <h6 className="fw-semibold mb-2">Choose from saved addresses</h6>
                  <div className="d-flex flex-column gap-2">
                    {addresses.map((a) => (
                      <label key={a.id} className="d-flex gap-2 align-items-start border rounded p-2">
                        <input
                          type="radio"
                          name="shippingAddr"
                          checked={shippingAddress.trim().toLowerCase() === String(a.text).trim().toLowerCase()}
                          onChange={() => setShippingAddress(String(a.text))}
                        />
                        <span className="small">{a.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-2 d-flex gap-2">
                <button
                  className="btn btn-light border"
                  onClick={() => setShippingAddress(billingAddress)}
                >
                  Use Billing Address
                </button>
                <button
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      const exists = addresses.some((a) => String(a.text || a).trim().toLowerCase() === shippingAddress.trim().toLowerCase());
                      const nextAddrs = exists ? addresses : [{ id: Date.now(), text: shippingAddress.trim() }, ...addresses];
                      setAddresses(nextAddrs);
                      try { localStorage.setItem("userAddresses", JSON.stringify(nextAddrs)); } catch { /* noop */ }
                      try { localStorage.setItem("userShippingAddress", JSON.stringify(shippingAddress)); } catch { /* noop */ }
                      if (token) {
                        await fetch(`${API_URL}/users/me`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ addresses: nextAddrs.map(a => a.text) })
                        });
                      }
                    } catch { /* noop */ }
                  }}
                >
                  Save Shipping Address
                </button>
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
