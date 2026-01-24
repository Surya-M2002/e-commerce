import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCog, FaSignOutAlt, FaHome, FaShoppingCart, FaBox, FaChartLine, FaUser } from "react-icons/fa";

const TabButton = ({ activeTab, setActiveTab, icon, label, tab }) => (
  <button
    className={`d-block w-100 text-start p-3 fw-semibold btn ${activeTab === tab ? "btn-success-subtle" : "btn-light"}`}
    onClick={() => setActiveTab(tab)}
    style={{ border: "none", background: activeTab === tab ? "rgba(0,159,127,0.1)" : "transparent" }}
  >
    {React.createElement(icon, { className: "me-2" })} {label}
  </button>
);

const SALES = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 25 },
  { name: "Sat", value: 30 },
  { name: "Sun", value: 28 },
];

const DEFAULT_ORDERS = [
  { id: "ORD-001", date: "2025-12-01", customer: "Arun Kumar", status: "Delivered", amount: 1250 },
  { id: "ORD-002", date: "2025-12-02", customer: "Priya Sharma", status: "Pending", amount: 899 },
  { id: "ORD-003", date: "2025-12-02", customer: "Rahul Verma", status: "Processing", amount: 1499 },
  { id: "ORD-004", date: "2025-12-03", customer: "Meera Nair", status: "Cancelled", amount: 720 },
];

const DEFAULT_PRODUCTS = [
  { id: "PROD-001", name: "Organic Cornflakes", category: "Grocery", price: 199, stock: 150, status: "Active" },
  { id: "PROD-002", name: "Strawberry Jam", category: "Grocery", price: 249, stock: 90, status: "Active" },
  { id: "PROD-003", name: "Whole Wheat Bread", category: "Bakery", price: 79, stock: 40, status: "Low Stock" },
  { id: "PROD-004", name: "Almond Butter", category: "Grocery", price: 349, stock: 0, status: "Inactive" },
];

const SellerDashboard = () => {
  const maxSales = Math.max(...SALES.map((s) => s.value));
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("seller_orders");
      return raw ? JSON.parse(raw) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("seller_products");
      return raw ? JSON.parse(raw) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ id: "", name: "", category: "", price: "", stock: "", status: "Active" });
  const totalSales = useMemo(() => orders.reduce((sum, o) => sum + o.amount, 0), [orders]);
  const totalOrders = useMemo(() => orders.length, [orders]);
  const pendingOrders = useMemo(() => orders.filter(o => o.status === "Pending").length, [orders]);
  const totalProducts = useMemo(() => products.length, [products]);

  const persistProducts = (next) => {
    setProducts(next);
    try { localStorage.setItem("seller_products", JSON.stringify(next)); } catch { void 0; }
  };
  const persistOrders = (next) => {
    setOrders(next);
    try { localStorage.setItem("seller_orders", JSON.stringify(next)); } catch { void 0; }
  };
  const openAddProduct = () => {
    setEditProduct(null);
    setForm({ id: `PROD-${Date.now()}`, name: "", category: "", price: "", stock: "", status: "Active" });
    setShowProductModal(true);
  };
  const openEditProduct = (p) => {
    setEditProduct(p);
    setForm({ id: p.id, name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), status: p.status });
    setShowProductModal(true);
  };
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const saveProduct = () => {
    const price = Math.max(0, Number(form.price || 0));
    const stock = Math.max(0, Number(form.stock || 0));
    const nextItem = { id: form.id, name: form.name.trim(), category: form.category.trim(), price, stock, status: form.status };
    if (editProduct) {
      const next = products.map((p) => (p.id === editProduct.id ? nextItem : p));
      persistProducts(next);
    } else {
      const next = [nextItem, ...products];
      persistProducts(next);
    }
    setShowProductModal(false);
    setEditProduct(null);
  };
  const removeProduct = (id) => {
    const next = products.filter((p) => p.id !== id);
    persistProducts(next);
  };
  const changeStatus = (id, status) => {
    const next = products.map((p) => (p.id === id ? { ...p, status } : p));
    persistProducts(next);
  };
  const adjustStock = (id, delta) => {
    const next = products.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
    persistProducts(next);
  };
  const updateOrderStatus = (id, status) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
    persistOrders(next);
  };

  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="main-layout">
      <div className="d-flex">
        <div className="sidebar bg-white shadow-sm d-none d-lg-block" style={{ width: 250, minHeight: "calc(100vh - 64px)" }}>
          <div className="p-4 border-bottom">
            <h5 className="fw-bold">Seller Panel</h5>
          </div>
          <nav className="p-2">
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaHome} label="Dashboard" tab="dashboard" />
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaShoppingCart} label="Orders" tab="orders" />
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaBox} label="Products" tab="products" />
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaChartLine} label="Sales" tab="sales" />
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaUser} label="Profile" tab="profile" />
            <TabButton activeTab={activeTab} setActiveTab={setActiveTab} icon={FaCog} label="Settings" tab="settings" />
            <button
              className="d-block w-100 text-start p-3 fw-semibold btn btn-light"
              onClick={() => {
                try { localStorage.removeItem('pb_user'); } catch { void 0; }
                try { localStorage.removeItem('pb_token'); } catch { void 0; }
                window.location.href = '/';
              }}
              style={{ border: "none" }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </nav>
        </div>

        <div className="flex-grow-1">
          <div className="bg-white shadow-sm p-3 p-md-4 border-bottom">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h4 className="fw-bold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "orders" && "Orders"}
                {activeTab === "products" && "Products"}
                {activeTab === "sales" && "Sales"}
                {activeTab === "profile" && "Profile"}
                {activeTab === "settings" && "Settings"}
              </h4>
              <div className="d-flex align-items-center gap-2 gap-md-3">
                <button className="btn btn-light border rounded-circle" style={{ width: 44, height: 44 }}>
                  <FaBell size={18} />
                </button>
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-light border" style={{ width: 44, height: 44 }}>
                  <FaUser size={20} className="text-success" />
                </div>
              </div>
            </div>
            {activeTab === "dashboard" && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                <button className="btn btn-success rounded-pill px-3" onClick={() => updateOrderStatus(`ORD-${Date.now()}`, "Pending")}>New Order</button>
                <button className="btn btn-light border rounded-pill px-3" onClick={openAddProduct}>Add Product</button>
                <button className="btn btn-light border rounded-pill px-3">View Reports</button>
              </div>
            )}
          </div>

          <div className="container-xxl px-3 px-md-4 py-3 py-md-4">
            {activeTab === "dashboard" && (
            <div className="row g-3 g-md-4">
              <div className="col-6 col-md-3">
                <div className="bg-white p-4 rounded-3 shadow-sm">
                  <h6 className="text-muted">Total Sales</h6>
                  <h3 className="fw-bold">₹{totalSales.toLocaleString('en-IN')}</h3>
                  <p className="text-success">+12% from last month</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-4 rounded-3 shadow-sm">
                  <h6 className="text-muted">Total Orders</h6>
                  <h3 className="fw-bold">{totalOrders}</h3>
                  <p className="text-success">+8% from last month</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-4 rounded-3 shadow-sm">
                  <h6 className="text-muted">Total Products</h6>
                  <h3 className="fw-bold">{totalProducts}</h3>
                  <p className="text-success">+3 new products</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="bg-white p-4 rounded-3 shadow-sm">
                  <h6 className="text-muted">Pending Orders</h6>
                  <h3 className="fw-bold">{pendingOrders}</h3>
                  <p className="text-danger">+2 from yesterday</p>
                </div>
              </div>
            </div>
            )}

            {activeTab === "dashboard" || activeTab === "sales" ? (
              <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm mt-4">
                <h5 className="fw-bold mb-3">Sales Overview</h5>
                <div className="d-flex align-items-end gap-2 gap-md-3" style={{ height: 220 }}>
                  {SALES.map((s) => {
                    const h = Math.round((s.value / maxSales) * 200) + 20;
                    return (
                      <div key={s.name} className="text-center">
                        <div className="bg-success rounded-2" style={{ width: 22, height: h }} />
                        <div className="small text-muted mt-2">{s.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {activeTab === "orders" && (
            <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm mt-4">
              <h5 className="fw-bold mb-3">Recent Orders</h5>
              <div className="d-none d-md-block table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr className="border-bottom">
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-bottom">
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.customer}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Delivered"
                                ? "bg-success"
                                : order.status === "Pending"
                                ? "bg-warning"
                                : order.status === "Processing"
                                ? "bg-info"
                                : "bg-danger"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>₹{order.amount.toLocaleString('en-IN')}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Processing")}>Process</button>
                            <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Delivered")}>Deliver</button>
                            <button className="btn btn-sm btn-danger rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Cancelled")}>Cancel</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-md-none">
                <div className="row g-2">
                  {orders.map((order) => (
                    <div key={order.id} className="col-12">
                      <div className="border rounded-3 p-3 d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{order.id}</div>
                          <div className="small text-muted">{order.date}</div>
                          <div className="small text-muted">{order.customer}</div>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${order.status === "Delivered" ? "bg-success" : order.status === "Pending" ? "bg-warning" : order.status === "Processing" ? "bg-info" : "bg-danger"}`}>
                            {order.status}
                          </span>
                          <div className="fw-bold mt-2">₹{order.amount.toLocaleString('en-IN')}</div>
                          <div className="mt-2 d-flex gap-2">
                            <button className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Processing")}>Process</button>
                            <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Delivered")}>Deliver</button>
                            <button className="btn btn-sm btn-danger rounded-pill px-3" onClick={() => updateOrderStatus(order.id, "Cancelled")}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {activeTab === "products" && (
            <>
            <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm mt-4">
              <h5 className="fw-bold mb-3">Product Management</h5>
              <div className="d-none d-md-block table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr className="border-bottom">
                      <th>Product ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-bottom">
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>₹{product.price.toLocaleString('en-IN')}</td>
                        <td>{product.stock}</td>
                        <td>
                          <span
                            className={`badge ${
                              product.status === "Active"
                                ? "bg-success"
                                : product.status === "Low Stock"
                                ? "bg-warning"
                                : "bg-secondary"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => openEditProduct(product)}>Edit</button>
                            <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => adjustStock(product.id, +10)}>+10</button>
                            <button className="btn btn-sm btn-outline-warning rounded-pill px-3" onClick={() => changeStatus(product.id, product.status === "Active" ? "Inactive" : "Active")}>Toggle</button>
                            <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => removeProduct(product.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-md-none">
                <div className="row g-2">
                  {products.map((product) => (
                    <div key={product.id} className="col-12">
                      <div className="border rounded-3 p-3">
                        <div className="d-flex justify-content-between">
                          <div className="fw-semibold">{product.name}</div>
                          <span className={`badge ${product.status === "Active" ? "bg-success" : product.status === "Low Stock" ? "bg-warning" : "bg-secondary"}`}>
                            {product.status}
                          </span>
                        </div>
                        <div className="small text-muted">{product.category}</div>
                        <div className="d-flex justify-content-between mt-2">
                          <div>₹{product.price.toLocaleString('en-IN')}</div>
                          <div>Stock: {product.stock}</div>
                        </div>
                        <div className="mt-2">
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => openEditProduct(product)}>Edit</button>
                            <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => adjustStock(product.id, +10)}>+10</button>
                            <button className="btn btn-sm btn-outline-warning rounded-pill px-3" onClick={() => changeStatus(product.id, product.status === "Active" ? "Inactive" : "Active")}>Toggle</button>
                            <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => removeProduct(product.id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {showProductModal && (
              <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
                <div className="seller-modal bg-white rounded-3 shadow p-3 p-md-4" style={{ maxWidth: 560, width: "100%" }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">{editProduct ? "Edit Product" : "Add Product"}</h5>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => setShowProductModal(false)}>Close</button>
                  </div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input className="form-control rounded-pill" name="name" value={form.name} onChange={onFormChange} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Category</label>
                      <input className="form-control rounded-pill" name="category" value={form.category} onChange={onFormChange} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Price</label>
                      <input type="number" className="form-control rounded-pill" name="price" value={form.price} onChange={onFormChange} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Stock</label>
                      <input type="number" className="form-control rounded-pill" name="stock" value={form.stock} onChange={onFormChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Status</label>
                      <select className="form-select rounded-pill" name="status" value={form.status} onChange={onFormChange}>
                        <option>Active</option>
                        <option>Low Stock</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-success rounded-pill px-4" onClick={saveProduct}>Save</button>
                    <button className="btn btn-light border rounded-pill px-4" onClick={() => setShowProductModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            </>
          )}
          </div>
        </div>
        </div>
      </div>
      );
};

export default SellerDashboard;
