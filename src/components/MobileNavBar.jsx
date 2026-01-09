import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUser,
  FaClipboardList
} from "react-icons/fa";
import "./MobileNavBar.css";

const MobileNavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="pb-mobile-nav d-md-none">
      <div className="pb-mobile-nav-inner">
        {/* Menu */}
        <button
          type="button"
          className="pb-mobile-item"
          data-bs-toggle="offcanvas"
          data-bs-target="#pbSiteOffcanvas"
        >
          <FaBars />
        </button>

        {/* Home */}
        <Link
          to="/"
          className={`pb-mobile-item ${isActive("/") ? "active" : ""}`}
        >
          <FaHome />
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          className={`pb-mobile-item ${isActive("/orders") ? "active" : ""}`}
        >
          <FaClipboardList />
        </Link>

        {/* Profile / Login */}
        <Link
          to="/login"
          className={`pb-mobile-item ${isActive("/login") ? "active" : ""}`}
        >
          <FaUser />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavBar;
