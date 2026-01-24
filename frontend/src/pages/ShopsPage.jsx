import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaAppleAlt, FaBreadSlice, FaTshirt, FaCouch, FaPlug, FaGem, FaGift, FaDumbbell, FaShoppingBag, FaPalette } from "react-icons/fa";

const shops = [
  { name: "Grocery Shop", path: "/", address: "Gandhipuram, Coimbatore, Tamil Nadu", Icon: FaAppleAlt, color: "#E7F5F2" },
  { name: "Bakery Shop", path: "/bakery", address: "Cherry Road, Salem, Tamil Nadu", Icon: FaBreadSlice, color: "#FFF3E8" },
  { name: "Makeup Shop", path: "/makeup", address: "Brough Road, Erode, Tamil Nadu", Icon: FaPalette, color: "#F3E8FF" },
  { name: "Bags Shop", path: "/bags", address: "RS Puram, Coimbatore, Tamil Nadu", Icon: FaShoppingBag, color: "#E8F1FF" },
  { name: "Clothing Shop", path: "/clothing", address: "Saibaba Colony, Coimbatore, Tamil Nadu", Icon: FaTshirt, color: "#EDEBFF" },
  { name: "Furniture Shop", path: "/furniture", address: "Fairlands, Salem, Tamil Nadu", Icon: FaCouch, color: "#E9F5FF" },
  { name: "Gadget Shop", path: "/gadget", address: "Peelamedu, Coimbatore, Tamil Nadu", Icon: FaGamepad, color: "#EDEBFF" },
  { name: "Gift Shop", path: "/gift", address: "Perundurai Road, Erode, Tamil Nadu", Icon: FaGift, color: "#FFF0F0" },
  { name: "Sports Shop", path: "/sports", address: "Race Course, Coimbatore, Tamil Nadu", Icon: FaDumbbell, color: "#E7FFF4" },
  { name: "Electronics Shop", path: "/electronics", address: "100 Feet Road, Coimbatore, Tamil Nadu", Icon: FaPlug, color: "#E7F0FF" },
  { name: "Fashion Shop", path: "/fashion", address: "Nehru Street, Erode, Tamil Nadu", Icon: FaGem, color: "#FFF5F7" },
];

const ShopsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">All Shops</h1>
        <p className="text-muted">Browse shops and jump into categories fast</p>
      </div>

      <div className="container-xxl px-lg-5 mt-4">
        <div className="row g-3 g-md-4">
          {shops.map((shop) => (
            <div key={shop.name} className="col-12 col-md-6 col-xl-4">
              <button
                className="w-100 text-start bg-white p-4 rounded-3 shadow-sm d-flex align-items-center gap-3 border-0"
                onClick={() => navigate(shop.path)}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 56, height: 56, background: shop.color }}
                >
                  <shop.Icon size={24} className="text-dark" />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{shop.name}</div>
                  <div className="small text-muted">{shop.address}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopsPage;
