import React, { useState, useRef, useEffect } from 'react';
import ProductCard from '../components/gift/ProductCard';
import CartDrawer from '../components/gift/CartDrawer';
import { FaGift, FaLeaf, FaRegCreditCard, FaCandyCane, FaCouch, FaChild } from 'react-icons/fa';
import CategoryBar from '../components/gift/CategoryBar';
import PromoBanners from '../components/gift/PromoBanners';
import ProductModal from '../components/ProductModal';
import useScrollToResults from '../hooks/useScrollToResults';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { includesMatch } from '../utils/search';
import { loadDomainData } from '../utils/dataLoader';

const GiftPage = ({ cart, updateCart, removeItem, onCheckout }) => {
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [appliedSearch, setAppliedSearch] = useState('');
  const resultsRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const triggerKey = `${activeCat ?? ''}|${appliedSearch}`;
  useScrollToResults(resultsRef, triggerKey);
  const debouncedSearch = useDebouncedValue(appliedSearch, 0);

  const getQty = (id) => cart.find((i) => i.id === id)?.quantity || 0;
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const formatINR = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const filtered = products.filter((p) => {
    const matches = !debouncedSearch || includesMatch(p, debouncedSearch);
    const catOk = !activeCat || p.categoryId === activeCat;
    return matches && catOk;
  });

  const iconMap = {
    Toy: FaChild,
    Flower: FaLeaf,
    Candy: FaCandyCane,
    CreditCard: FaRegCreditCard,
    Home: FaCouch,
    toys: FaChild,
    flowers: FaLeaf,
    cards: FaRegCreditCard,
    chocolate: FaCandyCane,
    decor: FaCouch,
  };

  useEffect(() => {
    const load = async () => {
      const data = await loadDomainData('gift');
      setCategories(Array.isArray(data.categories) ? data.categories : []);
      setProducts(Array.isArray(data.products) ? data.products : []);
    };
    load();
  }, []);

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Gifts</h1>
        <p className="text-muted">Curated presents for every occasion</p>
        <div className="search-box mt-4 mx-auto" style={{ maxWidth: 600 }}>
          <input className="form-control" placeholder="Search gifts..." value={search} onChange={(e) => { const v = e.target.value; setSearch(v); if (!v.trim()) setAppliedSearch(''); }} onKeyDown={(e) => { if (e.key === 'Enter') setAppliedSearch(search); }} />
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
                const Icon = iconMap[cat.icon] || iconMap[cat.id] || FaGift;
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
            <div className="row g-4">
              {filtered.map((p) => (
                <div key={p.id} className="col-6 col-md-4 col-xl-3">
                  <ProductCard product={p} qty={getQty(p.id)} onAdd={() => updateCart(p, 1)} onRemove={() => updateCart(p, -1)} onView={() => setSelectedProduct(p)} />
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

export default GiftPage;
