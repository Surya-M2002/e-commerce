import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Grocery';
import CheckoutPage from './pages/CheckoutPage'; // The code you provided
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import GadgetPage from './pages/GadgetPage';
import GiftPage from './pages/GiftPage';
import SportsPage from './pages/SportsPage';
import ElectronicsPage from './pages/ElectronicsPage';
import FashionPage from './pages/FashionPage';
import FurniturePage from './pages/FurniturePage';
import ClothingPage from './pages/ClothingPage';
import BagsPage from './pages/BagsPage';
import MakeupPage from './pages/MakeupPage';
import BakeryPage from './pages/BakeryPage';
import ContactPage from './pages/ContactPage';
import ShopsPage from './pages/ShopsPage';
import MobileNavBar from './components/MobileNavBar';
import Footer from './components/Footer';
import CategoryOffcanvas from './components/CategoryOffcanvas';
import './App.css';
import { HEADER_CATEGORIES as HEADER_CATS_DATA } from './data/headerCategories';
import SellerDashboard from './pages/SellerDashboard';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OffersPage from './pages/OffersPage';
import SocialSuccessPage from './pages/SocialSuccessPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('pb_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }); // Moved cart state here
  const [manualActiveCategoryId, setManualActiveCategoryId] = useState(null);
  const headerKey = location.pathname === '/' ? 'grocery' : location.pathname.slice(1).toLowerCase();
  const HOME_CATEGORY_MAP = { bakery: 8, daily: 5 };
  const derivedCategoryId = HOME_CATEGORY_MAP[headerKey] ?? null;
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('pb_user', JSON.stringify(user));
    else localStorage.removeItem('pb_user');
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('pb_cart', JSON.stringify(cart));
    } catch { void 0; }
  }, [cart]);

  useEffect(() => {
    const handler = () => {
      try {
        const raw = localStorage.getItem('pb_cart');
        setCart(raw ? JSON.parse(raw) : []);
      } catch { void 0; }
    };
    window.addEventListener('pb_cart_updated', handler);
    return () => window.removeEventListener('pb_cart_updated', handler);
  }, []);

  // derive header and category from location; no setState in effect needed

  // Global Cart Logic
  const updateCart = (product, delta) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        return newQty <= 0 
          ? prev.filter((i) => i.id !== product.id)
          : prev.map((i) => (i.id === product.id ? { ...i, quantity: newQty } : i));
      }
      return delta > 0 ? [...prev, { ...product, quantity: 1 }] : prev;
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const placeOrder = (meta) => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      items: itemsCount,
      total: +subtotal.toFixed(2),
      payment: meta?.payment || "cod",
      userEmail: user?.email || "guest@checkout.com",
      userName: user?.name || "Guest",
      itemsList: cart.map((i) => ({
        id: i.id,
        name: i.name,
        unit: i.unit,
        price: i.price,
        quantity: i.quantity,
        img: i.img,
        categoryId: i.categoryId,
      })),
    };
    try {
      const raw = localStorage.getItem("orders");
      const prev = raw ? JSON.parse(raw) : [];
      localStorage.setItem("orders", JSON.stringify([order, ...prev]));
    } catch { void 0; }
    setCart([]);
    navigate('/order-success');
  };

  return (
    <div className="App">
      {/* 1. Navbar stays on both pages */}
      <Navbar
        user={user}
        onJoinClick={() => navigate('/login')}
        headerCategories={HEADER_CATS_DATA}
        activeHeaderKey={headerKey}
        onSelectHeader={(key) => {
          if (key === 'grocery') {
            setManualActiveCategoryId(null);
            navigate('/');
            return;
          }
          if (HOME_CATEGORY_MAP[key]) {
            setManualActiveCategoryId(HOME_CATEGORY_MAP[key]);
            navigate('/');
            return;
          }
          navigate(`/${key}`);
        }}
      />
      <CategoryOffcanvas
        activeCategoryId={manualActiveCategoryId ?? derivedCategoryId}
        onSelect={(id) => {
          setManualActiveCategoryId(id);
          navigate('/');
        }}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
                activeCategoryId={manualActiveCategoryId ?? derivedCategoryId}
                onSelectCategory={setManualActiveCategoryId}
              />
            }
          />
          <Route
            path="/bakery"
            element={
              <BakeryPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/makeup"
            element={
              <MakeupPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/bags"
            element={
              <BagsPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/clothing"
            element={
              <ClothingPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/furniture"
            element={
              <FurniturePage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/daily"
            element={
              <Home
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
                activeCategoryId={manualActiveCategoryId ?? derivedCategoryId}
                onSelectCategory={setManualActiveCategoryId}
                domain="daily"
              />
            }
          />
          <Route
            path="/gadget"
            element={
              <GadgetPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/gift"
            element={
              <GiftPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <SportsPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/electronics"
            element={
              <ElectronicsPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route
            path="/fashion"
            element={
              <FashionPage
                cart={cart}
                updateCart={updateCart}
                removeItem={removeItem}
                onCheckout={() => navigate(user ? '/checkout' : '/login')}
              />
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={(u) => {
                  setUser(u);
                  navigate('/');
                }}
              />
            }
          />
          <Route path="/social-success" element={<SocialSuccessPage />} />
          <Route
            path="/register"
            element={
              <RegisterPage
                onLoginSuccess={(u) => {
                  setUser(u);
                  navigate('/checkout');
                }}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cart}
                onOrderPlaced={placeOrder}
              />
            }
          />
          <Route
            path="/order-success"
            element={
              <OrderSuccessPage
                cartItems={cart.map((item) => ({
                  ...item,
                  qty: item.quantity,
                  image: item.img,
                  weight: item.unit,
                }))}
                onBackHome={() => {
                  setCart([]);
                  navigate('/');
                }}
              />
            }
          />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/offers" element={<OffersPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileNavBar />
    </div>
  );
}

export default App;
