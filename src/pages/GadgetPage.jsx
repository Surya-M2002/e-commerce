import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '../components/gadget/ProductCard';
import CartDrawer from '../components/gadget/CartDrawer';
import { FaGamepad, FaLaptop, FaTv, FaUsb, FaCamera, FaHeadphones } from 'react-icons/fa';
import CategoryBar from '../components/gadget/CategoryBar';
import PromoBanners from '../components/gadget/PromoBanners';
import ProductModal from '../components/ProductModal';
import useScrollToResults from '../hooks/useScrollToResults';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { includesMatch } from '../utils/search';
import { fetchCategories, fetchProducts } from '../utils/apiClient';

const GadgetPage = ({ cart, updateCart, removeItem, onCheckout }) => {
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [appliedSearch, setAppliedSearch] = useState('');
  const resultsRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useScrollToResults(resultsRef, appliedSearch);
  const debouncedSearch = useDebouncedValue(appliedSearch, 0);

  const getQty = (id) => cart.find((i) => i.id === id)?.quantity || 0;
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const filtered = products.filter((p) => {
    const matchesSearch = !debouncedSearch || includesMatch(p, debouncedSearch);
    const matchesCat = !activeCat || p.categoryId === activeCat;
    return matchesSearch && matchesCat;
  });

  const iconMap = {
    Gamepad: FaGamepad,
    Laptop: FaLaptop,
    Tv: FaTv,
    Usb: FaUsb,
    Camera: FaCamera,
    Headphones: FaHeadphones,
    console: FaGamepad,
    laptop: FaLaptop,
    monitor: FaTv,
    accessories: FaUsb,
    camera: FaCamera,
    headphone: FaHeadphones,
  };

  useEffect(() => {
    const load = async () => {
      const [cats, items] = await Promise.all([
        fetchCategories('gadget'),
        fetchProducts('gadget'),
      ]);
      setCategories(cats);
      setProducts(items);
    };
    load();
  }, []);

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Gadgets & Electronics</h1>
        <p className="text-muted">Latest gadgets curated for you</p>
        <div className="search-box mt-4 mx-auto" style={{ maxWidth: 600 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search gadgets..."
            value={search}
            onChange={(e) => { const v = e.target.value; setSearch(v); if (!v.trim()) setAppliedSearch(''); }}
            onKeyDown={(e) => { if (e.key === 'Enter') setAppliedSearch(search); }}
          />
          <button className="btn-success-pb" onClick={() => setAppliedSearch(search)}>Search</button>
        </div>
      </div>
      <div className="container-xxl px-lg-5">
        <PromoBanners />
      </div>
      <CategoryBar
        categories={categories}
        iconMap={iconMap}
        activeId={activeCat}
        onSelect={(id) => { if (appliedSearch) setAppliedSearch(''); setActiveCat(id); }}
      />

      <div className="container-fluid px-lg-5 mt-5" ref={resultsRef}>
        <div className="row">
          <div className="col-lg-2 d-none d-lg-block">
            <div className="sidebar">
              <div className="row row-cols-2 g-3">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || iconMap[cat.id] || FaTv;
                const active = activeCat === cat.id;
                return (
                  <div key={cat.id} className="col">
                    <button
                      className="w-100 bg-white border-0 shadow-sm rounded-3 p-3 d-flex flex-column align-items-center"
                      style={{ height: 140, ...(active ? { outline: '2px solid #009f7f' } : {}) }}
                      onClick={() => { if (appliedSearch) setAppliedSearch(''); setActiveCat(cat.id); }}
                    >
                      <Icon size={28} className={active ? 'text-success' : 'text-dark'} />
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

          <div className="col-lg-10 ps-lg-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-muted small">{filtered.length} items</div>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveCat(null)}>
                Clear filter
              </button>
            </div>
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

      <div className="floating-cart" onClick={() => setIsDrawerOpen(true)}>
        <div className="cart-top">
          <span>{totalItems} Items</span>
        </div>
        <div className="cart-bottom">{formatINR(totalPrice)}</div>
      </div>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} cart={cart} onUpdate={updateCart} onRemoveItem={removeItem} total={totalPrice} onCheckout={onCheckout} />
      
      {selectedProduct && (
        <ProductModal
          isOpen={true}
          product={selectedProduct}
          quantity={getQty(selectedProduct.id)}
          cart={cart}
          onAdd={(p) => updateCart(p, 1)}
          onRemove={(p) => updateCart(p, -1)}
          onViewRelated={(newProduct) => setSelectedProduct(newProduct)}
          onClose={() => setSelectedProduct(null)}
          relatedProducts={products.filter(p => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id).slice(0, 8)}
        />
      )}
    </div>
  );
};

export default GadgetPage;
