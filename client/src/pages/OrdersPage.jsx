import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const statuses = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

const badgeClass = (s) =>
  s === "Delivered"
    ? "bg-success"
    : s === "Pending"
    ? "bg-warning"
    : s === "Processing"
    ? "bg-info"
    : "bg-danger";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("orders");
      if (raw) return JSON.parse(raw);
    } catch { void 0; }
    return [];
  });
  const [selected, setSelected] = useState(null);
  const [user] = useState(() => {
    try {
      const raw = localStorage.getItem("pb_user");
      if (raw) return JSON.parse(raw);
    } catch { void 0; }
    return null;
  });
  const userEmail = user?.email || null;

  const updateOrderStatus = (id, status) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(next);
    try {
      localStorage.setItem("orders", JSON.stringify(next));
    } catch { void 0; }
  };

  const myOrders = useMemo(() => {
    return orders.filter((o) => (userEmail ? o.userEmail === userEmail : false));
  }, [orders, userEmail]);

  const filtered = useMemo(() => {
    return myOrders.filter((o) => {
      const matchStatus = active === "All" || o.status === active;
      const matchQuery = !query || o.id.toLowerCase().includes(query.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [active, query, myOrders]);

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Your Orders</h1>
        <p className="text-muted">Track and manage purchases</p>
      </div>

      <div className="container-xxl px-3 px-lg-5 mt-4">
        <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${active === s ? "btn-success" : "btn-light border"}`}
                  onClick={() => setActive(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="d-flex gap-2">
              <input
                className="form-control"
                placeholder="Search by Order ID"
                style={{ maxWidth: 240 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm mt-4">
          {filtered.length === 0 ? (
            <div className="text-center text-muted py-4">No orders yet</div>
          ) : (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr className="border-bottom">
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-bottom">
                    <td>{o.id}</td>
                    <td>{o.date}</td>
                    <td>
                      <span className={`badge ${badgeClass(o.status)}`}>{o.status}</span>
                    </td>
                    <td>{o.items}</td>
                    <td>₹{o.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light border" onClick={() => setSelected(o)}>View</button>
                        <button className="btn btn-sm btn-outline-success" onClick={() => updateOrderStatus(o.id, "Delivered")}>Mark Delivered</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => updateOrderStatus(o.id, "Cancelled")}>Cancel</button>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            try {
                              localStorage.setItem("pb_cart", JSON.stringify(o.itemsList || []));
                            } catch { void 0; }
                            try { window.dispatchEvent(new Event('pb_cart_updated')); } catch { void 0; }
                            navigate("/checkout");
                          }}
                        >
                          Reorder
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
        
        {selected && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
            <div className="bg-white rounded-3 shadow p-3 p-md-4" style={{ maxWidth: 720, width: "100%" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Order Details</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
              <div className="row g-2 mb-3 small">
                <div className="col-6"><strong>ID:</strong> {selected.id}</div>
                <div className="col-6 text-end"><strong>Date:</strong> {selected.date}</div>
                <div className="col-6"><strong>Status:</strong> <span className={`badge ${badgeClass(selected.status)}`}>{selected.status}</span></div>
                <div className="col-6 text-end"><strong>Total:</strong> ₹{selected.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="border rounded">
                <div className="row p-2 fw-bold text-muted small border-bottom">
                  <div className="col-6">Item</div>
                  <div className="col-3 text-center">Qty</div>
                  <div className="col-3 text-end">Price</div>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {(selected.itemsList || []).map((it) => (
                    <div key={it.id} className="row p-2 align-items-center border-bottom small">
                      <div className="col-6 d-flex gap-2 align-items-center">
                        <img src={it.img} alt={it.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                        <div>
                          <div className="fw-bold">{it.name}</div>
                          <div className="text-muted">{it.unit}</div>
                        </div>
                      </div>
                      <div className="col-3 text-center fw-bold">{it.quantity}</div>
                      <div className="col-3 text-end fw-bold">₹{(it.price * it.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
