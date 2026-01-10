import React, { useState, useRef, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { FaAppleAlt, FaUtensils, FaCoffee, FaDog, FaHome, FaTint, FaEgg, FaBreadSlice, FaWineGlass, FaHeart } from "react-icons/fa";

import ProductCard from "../components/grocery/ProductCard";
import ProductModal from "../components/grocery/ProductModal";
import CartDrawer from "../components/grocery/CartDrawer";
import "../App.css";
import PromoBanners from "../components/grocery/PromoBanners";
import CategoryBar from "../components/grocery/CategoryBar";
import useScrollToResults from "../hooks/useScrollToResults";
import { includesMatch } from "../utils/search";
import API_URL from "../config";

const Home = ({ cart, updateCart, removeItem, onCheckout, activeCategoryId, onSelectCategory, domain = "grocery" }) => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const resultsRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const activeCat = activeCategoryId ?? null;
  useScrollToResults(resultsRef, appliedSearch);

  const getQty = (id) => cart.find((i) => i.id === id)?.quantity || 0;
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const fallbackMap = {
    Apple: FaAppleAlt,
    Utensils: FaUtensils,
    Coffee: FaCoffee,
    Dog: FaDog,
    Home: FaHome,
    Droplets: FaTint,
    Egg: FaEgg,
    Croissant: FaBreadSlice,
    Wine: FaWineGlass,
    Heart: FaHeart
  };
  const iconMap = Object.fromEntries(categories.map((cat) => {
    const L = LucideIcons[cat.icon];
    const F = fallbackMap[cat.icon];
    return [cat.id, L || F];
  }));

  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const filtered = products.filter((p) => (!appliedSearch || includesMatch(p, appliedSearch)) && (!activeCat || p.categoryId === activeCat));

  useEffect(() => {
    const load = async () => {
      const [catsRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/api/categories?domain=${domain}`),
        fetch(`${API_URL}/api/products?domain=${domain}`),
      ]);
      const cats = await catsRes.json();
      const items = await prodRes.json();
      setCategories(Array.isArray(cats) ? cats : []);
      setProducts(Array.isArray(items) ? items : []);
    };
    load();
  }, [domain]);

  return (
    <div className="main-layout">

      {/* HERO */}
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Groceries Delivered in 90 Minute</h1>
        <p className="text-muted">Get your healthy foods & snacks delivered at your doorstep</p>

        <div className="search-box mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search your products..."
            value={search}
            onChange={(e) => { const v = e.target.value; setSearch(v); if (!v.trim()) setAppliedSearch(''); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setAppliedSearch(search);
            }}
          />
          <button className="btn-success-pb" onClick={() => setAppliedSearch(search)}>Search</button>
        </div>
      </div>

      <CategoryBar
        categories={categories}
        iconMap={iconMap}
        activeId={activeCat}
        onSelect={(id) => { if (appliedSearch) setAppliedSearch(''); onSelectCategory && onSelectCategory(id); }}
      />

      <div className="container-xxl px-lg-5">
        <PromoBanners />
      </div>

      {/* CONTENT */}
      <div className="container-fluid px-lg-5 mt-5" ref={resultsRef}>
        <div className="row">
          {/* SIDEBAR */}
          <div className="col-lg-2 d-none d-lg-block">
            <div className="sidebar">
              <div className="row row-cols-2 g-3">
              {categories.map((cat) => {
                const Icon = iconMap[cat.id];
                const active = activeCat === cat.id;
                return (
                  <div key={cat.id} className="col">
                    <button
                      className="w-100 bg-white border-0 shadow-sm rounded-3 p-3 d-flex flex-column align-items-center"
                      style={{ height: 140, ...(active ? { outline: '2px solid #009f7f' } : {}) }}
                      onClick={() => { if (appliedSearch) setAppliedSearch(''); onSelectCategory && onSelectCategory(cat.id); }}
                    >
                      {Icon ? <Icon size={28} className={active ? 'text-success' : 'text-dark'} /> : null}
                      <div
                        className={`mt-2 fw-semibold ${active ? 'text-success' : 'text-muted'}`}
                        style={{ fontSize: 12, whiteSpace: 'normal', wordBreak: 'break-word', width: '100%', textAlign: 'center', lineHeight: 1.2 }}
                      >
                        {cat.name}
                      </div>
                    </button>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="col-lg-10 ps-lg-4">
            <div className="row g-4">
              {filtered.map((p) => (
                <div key={p.id} className="col-6 col-md-4 col-xl-3">
                  <ProductCard
                    product={p}
                    qty={getQty(p.id)}
                    onAdd={() => updateCart(p, 1)}
                    onRemove={() => updateCart(p, -1)}
                    onView={() => setSelectedProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING CART */}
      <div className="floating-cart" onClick={() => setIsDrawerOpen(true)}>
        <div className="cart-top">
          <ShoppingBag size={20} />
          <span>{totalItems} Items</span>
        </div>
        <div className="cart-bottom">{formatINR(totalPrice)}</div>
      </div>

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onUpdate={updateCart}
        onRemoveItem={removeItem} // ✅ FIXED REMOVE
        total={totalPrice}
        onCheckout={onCheckout}
      />

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          isOpen={true}
          product={selectedProduct}
          quantity={getQty(selectedProduct.id)}
          cart={cart}
          onAdd={(p) => updateCart(p, 1)}
          onRemove={(p) => updateCart(p, -1)}
          onViewRelated={(newProduct) => setSelectedProduct(newProduct)}
          relatedProducts={products.filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id).slice(0, 8)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
