import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-white border-top mt-5">
    <div className="container-xxl px-lg-5 py-5">
      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <h3 className="fw-bold text-primary-custom mb-3">My Shop</h3>
          <p className="text-muted small">
            We offer high-quality foods and the best delivery service, and the food market you can blindly trust.
          </p>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="fw-bold mb-2">Categories</div>
          <ul className="list-unstyled small m-0">
            <li><Link to="/" className="text-decoration-none text-muted">Grocery</Link></li>
            <li><Link to="/fashion" className="text-decoration-none text-muted">Fashion</Link></li>
            <li><Link to="/electronics" className="text-decoration-none text-muted">Electronics</Link></li>
            <li><Link to="/gadget" className="text-decoration-none text-muted">Gadgets</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="fw-bold mb-2">Company</div>
          <ul className="list-unstyled small m-0">
            <li><Link to="/shops" className="text-decoration-none text-muted">Shops</Link></li>
            <li><Link to="/contact" className="text-decoration-none text-muted">Contact</Link></li>
            <li><Link to="/login" className="text-decoration-none text-muted">Login</Link></li>
            <li><Link to="/checkout" className="text-decoration-none text-muted">Checkout</Link></li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <div className="fw-bold mb-2">Stay Connected</div>
          <div className="d-flex align-items-center gap-2">
            <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaFacebookF /></a>
            <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaTwitter /></a>
            <a href="#" className="btn btn-light border rounded-circle" style={{ width: 36, height: 36 }}><FaInstagram /></a>
          </div>
          <div className="small text-muted mt-3">© {new Date().getFullYear()} My Shop. All rights reserved.</div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
