import React from "react";
import { useNavigate } from "react-router-dom";

const OFFERS = [
  { id: "OFF-1", title: "Grocery Mega Sale", desc: "Up to 40% off on essentials", badge: "40% OFF", color: "#e0f7f4", path: "/" },
  { id: "OFF-2", title: "Bakery Fresh Deals", desc: "Buy 2 get 1 free", badge: "B2G1", color: "#fff3e0", path: "/bakery" },
  { id: "OFF-3", title: "Fashion Clearance", desc: "Flat 60% off", badge: "60% OFF", color: "#e8eaf6", path: "/fashion" },
  { id: "OFF-4", title: "Electronics Savings", desc: "Extra 10% with code SAVE10", badge: "SAVE10", color: "#e3f2fd", path: "/electronics" },
  { id: "OFF-5", title: "Sports Weekend", desc: "Up to 30% off", badge: "30% OFF", color: "#f1f8e9", path: "/sports" },
];

const OffersPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Offers</h1>
        <p className="text-muted">Latest deals and coupons across categories</p>
      </div>

      <div className="container-xxl px-3 px-lg-5 mt-4">
        <div className="row g-3 g-md-4">
          {OFFERS.map((o) => (
            <div key={o.id} className="col-12 col-md-6 col-lg-4">
              <button
                className="w-100 text-start bg-white p-4 rounded-3 shadow-sm d-flex align-items-center gap-3 border-0"
                onClick={() => navigate(o.path)}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 56, height: 56, background: o.color }}>
                  <span className="fw-bold">{o.badge}</span>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{o.title}</div>
                  <div className="small text-muted">{o.desc}</div>
                </div>
                <div>
                  <span className="badge bg-success">Shop Now</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;

