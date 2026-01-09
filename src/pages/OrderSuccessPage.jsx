import React from 'react';
import { FaCheck, FaHome, FaPrint, FaPhoneAlt } from 'react-icons/fa';

const OrderSuccessPage = ({ cartItems = [], onBackHome }) => {
  const getQty = (item) => (item.quantity ?? item.qty ?? 1);
  const getImage = (item) => {
    const src = item.image ?? item.img;
    return src && String(src).length > 0 ? src : 'https://placehold.co/60x60?text=IMG';
  };
  const getUnit = (item) => item.weight ?? item.unit;
  const lastPayment = (() => {
    try {
      const raw = localStorage.getItem('pb_last_payment');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();
  const upiIntent = lastPayment?.upi?.intent || '';
  let lastOrder = null;
  try {
    const raw = localStorage.getItem('orders');
    const parsed = raw ? JSON.parse(raw) : [];
    let userEmail = null;
    try {
      const u = localStorage.getItem('pb_user');
      if (u) userEmail = JSON.parse(u)?.email || null;
    } catch { void 0; }
    lastOrder = userEmail ? parsed.find((o) => o.userEmail === userEmail) || null : parsed[0] || null;
  } catch { void 0; }
  const items = lastOrder?.itemsList?.length
    ? lastOrder.itemsList
    : cartItems;
  const orderDate = lastOrder?.date
    ? new Date(lastOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const orderNumber = lastOrder?.id || 'ORD-IN-902341';
  const paymentLabel = lastOrder?.payment === 'upi' ? 'UPI' : 'Cash on Delivery';
  const subtotal = items.reduce((acc, item) => acc + (+item.price) * getQty(item), 0);
  const shipping = 40;
  const tax = subtotal * 0.05;
  const discount = 0;
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="bg-light min-vh-100 py-3 py-md-5">
      <div className="container-xxl">

        {/* Success Banner */}
        <div className="text-center mb-3">
          <div
            className="mx-auto mb-2 d-flex align-items-center justify-content-center"
            style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#e6f5f1', color: '#009f7f' }}
          >
            <FaCheck size={22} />
          </div>
          <h4 className="fw-bold">Order Successful</h4>
          <p className="text-muted small">Thank you. Your order has been placed.</p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBackHome}
          className="btn btn-link text-decoration-none text-dark fw-bold mb-3 d-flex align-items-center gap-2"
        >
          <FaHome className="text-primary-custom" />
          Back to Home
        </button>

        <div className="bg-white rounded-3 shadow-sm p-3 p-md-5">

          {/* Status Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center border-bottom pb-3 mb-4 gap-2">
            <div>
              <span className="fw-bold me-2">Order Status:</span>
              <span className="badge bg-warning text-dark bg-opacity-25 px-3 py-2 rounded-pill">
                Order Confirmed
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">Payment:</span>
              <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill">{paymentLabel}</span>
              {paymentLabel === 'UPI' && upiIntent && (
                <a href={upiIntent} className="btn btn-sm btn-success">Pay Now</a>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="row g-3 mb-5">
            {[
              ['Order ID', orderNumber],
              ['Order Date', orderDate],
              ['Total Amount', `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
              ['Delivery ETA', 'Today 6:00 – 8:00 PM'],
            ].map(([label, value]) => (
              <div key={label} className="col-6 col-lg-3">
                <div className="border rounded p-3 h-100">
                  <small className="text-muted d-block mb-1">{label}</small>
                  <span className="fw-bold">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Tracker */}
          <div className="mb-5">
            <div className="row text-center g-2">
              {['Placed', 'Processing', 'Out for Delivery', 'Delivered'].map(
                (step, index) => (
                  <div key={step} className="col-3">
                    <div
                      className={`mx-auto rounded-circle d-flex align-items-center justify-content-center mb-2 ${
                        index === 0
                          ? 'bg-primary-custom text-white'
                          : 'border text-muted'
                      }`}
                      style={{ width: 36, height: 36 }}
                    >
                      {index === 0 ? <FaCheck size={12} /> : index + 1}
                    </div>
                    <div className="small fw-bold">{step}</div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Amount & Address */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Price Summary</h6>
              {[
                ['Subtotal', subtotal],
                ['Shipping', shipping],
                ['GST (5%)', tax],
                ['Discount', discount],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="d-flex justify-content-between small mb-2"
                >
                  <span className="text-muted">{label}</span>
                  <span className="fw-bold">₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div className="d-flex justify-content-between fw-bold border-top pt-2">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Delivery Details</h6>
              <div className="small">
                <p className="mb-2">
                  <strong>Name:</strong> Arun Kumar
                </p>
                <p className="mb-2">
                  <strong>Shipping:</strong>  
                  No. 12, Cherry Road, Salem – 636001, Tamil Nadu
                </p>
                <p className="mb-0">
                  <strong>Billing:</strong>  
                  123, Gandhipuram, Coimbatore – 641012, Tamil Nadu
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-light rounded overflow-hidden">
            <div className="row p-3 fw-bold text-muted small border-bottom">
              <div className="col-6">Item</div>
              <div className="col-3 text-center">Qty</div>
              <div className="col-3 text-end">Price</div>
            </div>

            <div style={{ maxHeight: 350, overflowY: 'auto' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="row p-3 bg-white border-bottom align-items-center"
                >
                  <div className="col-6 d-flex gap-2 align-items-center">
                    <img
                      src={getImage(item)}
                      alt={item.name}
                      width={45}
                      height={45}
                      style={{ objectFit: 'contain' }}
                    />
                    <div>
                      <div className="fw-bold small">{item.name}</div>
                      <div className="text-muted small">{getUnit(item)}</div>
                    </div>
                  </div>
                  <div className="col-3 text-center fw-bold small">
                    {getQty(item)}
                  </div>
                  <div className="col-3 text-end fw-bold small">
                    ₹{(+item.price * getQty(item)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-4">
            <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
              <FaPrint /> Print Invoice
            </button>

            <div className="text-muted small d-flex align-items-center gap-2">
              <FaPhoneAlt />
              Need help? Call <strong>1800-123-456</strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
