import React from "react";
import { FaUserCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  FaAppleAlt,
  FaBreadSlice,
  FaPalette,
  FaShoppingBag,
  FaTshirt,
  FaCouch,
  FaBoxOpen,
  FaGamepad,
  FaGift,
  FaDumbbell,
  FaPlug,
  FaGem,
} from "react-icons/fa";

const iconMap = {
  grocery: FaAppleAlt,
  bakery: FaBreadSlice,
  makeup: FaPalette,
  bags: FaShoppingBag,
  clothing: FaTshirt,
  furniture: FaCouch,
  daily: FaBoxOpen,
  gadget: FaGamepad,
  gift: FaGift,
  sports: FaDumbbell,
  electronics: FaPlug,
  fashion: FaGem,
};

const Navbar = ({
  user,
  onJoinClick,
  headerCategories = [],
  activeHeaderKey,
}) => {
  const activeHeader = headerCategories.find((c) => c.key === activeHeaderKey);

  const ActiveIcon = iconMap[activeHeaderKey] || FaAppleAlt;

  const pathForKey = (key) => {
    if (key === "grocery") return "/";
    return `/${key}`;
  };

  return (
    <nav className="navbar navbar-expand-md bg-white sticky-top navbar-light shadow-sm" style={{ minHeight: 64 }}>
      <div className="container-xxl">

        {/* LEFT + Mobile action row */}
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center gap-3">
            <Link className="navbar-brand m-0 fw-bold text-success fs-4" to="/">
              LOGO
            </Link>

          {/* CATEGORY SWITCH */}
          <div className="dropdown d-none d-md-block">
            <button
              className="btn border bg-white px-3 py-2 fw-bold d-inline-flex align-items-center"
              style={{ borderRadius: 999, color: "#009f7f" }}
              data-bs-toggle="dropdown"
            >
              <ActiveIcon className="me-2" />
              {activeHeader?.name || "Grocery"}
              <ChevronDown size={14} className="ms-2" />
            </button>

            <ul
              className="dropdown-menu shadow border-0 p-2"
              style={{ minWidth: 260, maxHeight: 320, overflowY: "auto" }}
            >
              {headerCategories.map((cat) => {
                const Icon = iconMap[cat.key] || FaAppleAlt;
                return (
                  <li key={cat.key}>
                    <Link
                      to={pathForKey(cat.key)}
                      className={`dropdown-item d-flex align-items-center gap-3 ${
                        activeHeaderKey === cat.key ? "fw-bold text-success" : ""
                      }`}
                    >
                      <Icon size={18} />
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          </div>

          <div className="d-flex d-md-none align-items-center gap-3 ms-auto">
            <Link className="btn px-3 py-2 fw-bold text-white" style={{ background: "#009f7f", borderRadius: 999 }} to="/seller-dashboard">Become a Seller</Link>
          </div>
        </div>

        {/* Mobile controls: Filter + Category pill */}
        <div className="d-md-none w-100 px-3 mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-light border d-flex align-items-center gap-2 px-3 py-2 rounded-3" data-bs-toggle="offcanvas" data-bs-target="#pbCategoryOffcanvas">
              <SlidersHorizontal size={18} />
              <span className="fw-semibold">Filter</span>
              </button>
              <div className="dropdown">
                <button
                  className="btn border bg-white px-3 py-2 fw-bold d-inline-flex align-items-center rounded-pill"
                  style={{ borderRadius: 999, color: "#009f7f" }}
                  data-bs-toggle="dropdown"
                >
                  <ActiveIcon className="me-2" />
                  {activeHeader?.name || "Grocery"}
                  <ChevronDown size={14} className="ms-2" />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border-0 p-2 rounded-3"
                  style={{ minWidth: 280, width: '50vw', maxHeight: 360, overflowY: "auto" }}
                >
                  {headerCategories.map((cat) => {
                    const Icon = iconMap[cat.key] || FaAppleAlt;
                    return (
                    <li key={cat.key}>
                      <Link
                        to={pathForKey(cat.key)}
                        className={`dropdown-item d-flex align-items-center gap-3 py-2 ${
                          activeHeaderKey === cat.key ? "fw-bold text-success" : ""
                        }`}
                      >
                        <Icon size={18} />
                        <span>{cat.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Seller quick link moved to the mobile nav group above */}
          </div>
        </div>

        <div className="collapse navbar-collapse mt-3 mt-md-0" id="pbNav">
          {/* Desktop dropdown retained above; collapse primarily for right-side links */}

          <div className="ms-md-auto d-flex align-items-center gap-4">
            <Link className="nav-link fw-semibold" to="/shops">Shops</Link>
            <Link className="nav-link fw-semibold" to="/offers">Offers</Link>
            <Link className="nav-link fw-semibold" to="/contact">Contact</Link>
            <Link className="nav-link fw-semibold d-none d-md-inline" to="/orders">Orders</Link>
            <Link className="btn btn-success fw-semibold px-4" to="/seller-dashboard"> Seller</Link>
      
            
            {user ? (
              <Link to="/profile" className="text-decoration-none">
                <FaUserCircle className="text-success" style={{ width: 36, height: 36 }} />
              </Link>
            ) : (
              <button
                className="btn px-4 py-2 fw-bold text-white"
                style={{ background: "#009f7f", borderRadius: 999 }}
                onClick={onJoinClick}
              >
                Join
              </button>
            )}
            {/* Removed standalone 'Become a Seller' button; now a standard nav link */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
