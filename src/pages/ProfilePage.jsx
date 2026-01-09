import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_URL from '../config';

const defaultProfile = { name: "Arun Kumar", email: "arun.kumar@example.com", phone: "9876543210", address: "Coimbatore, Tamil Nadu" };

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem("userProfile");
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaultProfile, ...parsed };
      }
    } catch { void 0; }
    return defaultProfile;
  });
  const [saved, setSaved] = useState(false);
  const [addresses, setAddresses] = useState(() => {
    try {
      const raw = localStorage.getItem("userAddresses");
      if (raw) return JSON.parse(raw);
    } catch { void 0; }
    return [
      { id: Date.now(), text: "No. 12, Cherry Road, Salem – 636001, Tamil Nadu" },
      { id: Date.now() + 1, text: "123, Gandhipuram, Coimbatore – 641012, Tamil Nadu" },
      { id: Date.now() + 2, text: "45, Perundurai Road, Erode – 638011, Tamil Nadu" }
    ];
  });
  const [newAddress, setNewAddress] = useState("");
  const [newsletter, setNewsletter] = useState(() => {
    try {
      const raw = localStorage.getItem("userNewsletter");
      if (raw) return JSON.parse(raw);
    } catch { void 0; }
    return true;
  });
  const token = (() => {
    try { return localStorage.getItem("pb_token") || ""; } catch { return ""; }
  })();
  const ordersCount = (() => {
    try {
      const raw = localStorage.getItem("orders");
      const arr = raw ? JSON.parse(raw) : [];
      const u = profile.email;
      return u ? arr.filter((o) => o.userEmail === u).length : arr.length;
    } catch { return 0; }
  })();
  const tier = ordersCount >= 10 ? "Gold" : ordersCount >= 5 ? "Silver" : "Basic";

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const nextProfile = {
            name: data.name || profile.name,
            email: data.email || profile.email,
            phone: data.phone || profile.phone,
            address: data.address || profile.address
          };
          setProfile(nextProfile);
          const addrs = Array.isArray(data.addresses) ? data.addresses.map((t, i) => ({ id: Date.now() + i, text: t })) : addresses;
          setAddresses(addrs);
          setNewsletter(typeof data.newsletter === "boolean" ? data.newsletter : newsletter);
          try { localStorage.setItem("userProfile", JSON.stringify(nextProfile)); } catch { void 0; }
          try { localStorage.setItem("userAddresses", JSON.stringify(addrs)); } catch { void 0; }
          try { localStorage.setItem("userNewsletter", JSON.stringify(typeof data.newsletter === "boolean" ? data.newsletter : newsletter)); } catch { void 0; }
        }
      } catch { void 0; }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    setSaved(false);
  };

  const onSave = () => {
    try { localStorage.setItem("userProfile", JSON.stringify(profile)); } catch { void 0; }
    try { localStorage.setItem("userAddresses", JSON.stringify(addresses)); } catch { void 0; }
    try { localStorage.setItem("userNewsletter", JSON.stringify(newsletter)); } catch { void 0; }
    const patch = {
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
      addresses: addresses.map(a => a.text),
      newsletter
    };
    const persistRemote = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/users/me`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(patch)
        });
        if (res.ok) {
          await res.json();
        }
      } catch { void 0; }
    };
    persistRemote();
    setSaved(true);
  };

  const addAddress = () => {
    if (!newAddress.trim()) return;
    const next = [...addresses, { id: Date.now(), text: newAddress.trim() }];
    setAddresses(next);
    try { localStorage.setItem("userAddresses", JSON.stringify(next)); } catch { void 0; }
    setNewAddress("");
    if (token) {
      try {
        fetch(`${API_URL}/users/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ addresses: next.map(a => a.text) })
        });
      } catch { void 0; }
    }
  };

  const removeAddress = (id) => {
    const next = addresses.filter((a) => a.id !== id);
    setAddresses(next);
    try { localStorage.setItem("userAddresses", JSON.stringify(next)); } catch { void 0; }
    if (token) {
      try {
        fetch(`${API_URL}/users/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ addresses: next.map(a => a.text) })
        });
      } catch { void 0; }
    }
  };

  const toggleNewsletter = () => {
    const next = !newsletter;
    setNewsletter(next);
    try { localStorage.setItem("userNewsletter", JSON.stringify(next)); } catch { void 0; }
    if (token) {
      try {
        fetch(`${API_URL}/users/me`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ newsletter: next })
        });
      } catch { void 0; }
    }
  };

  const onLogout = () => {
    try { localStorage.removeItem("pb_user"); } catch { void 0; }
    try { localStorage.removeItem("pb_token"); } catch { void 0; }
    navigate("/login");
  };

  return (
    <div className="main-layout">
      <div className="hero-section text-center py-5 border-bottom">
        <h1 className="fw-bold">Account</h1>
        <p className="text-muted">Manage details, addresses, and preferences</p>
      </div>

      <div className="container-xxl px-3 px-lg-5 mt-3">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="bg-white p-3 rounded-3 shadow-sm text-center mb-3 mb-lg-3">
              {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" className="rounded-circle mb-3" style={{ width: 96, height: 96, objectFit: "cover" }} />
              ) : (
                <FaUserCircle className="mb-3 text-success" style={{ width: 96, height: 96 }} />
              )}
              <div className="fw-bold fs-5">{profile.name || "Guest"}</div>
              <div className="text-muted small">{profile.email || "Not set"}</div>
              <div className="mt-3 d-grid gap-2">
                <button className="btn btn-outline-secondary">Edit Profile</button>
                <button className="btn btn-danger" onClick={onLogout}>Logout</button>
              </div>
              <div className="border-top my-3"></div>
              <div className="d-flex justify-content-between align-items-center text-muted small mt-3 px-2">
                <div><strong className="text-dark">{ordersCount}</strong> Orders</div>
                <div><strong className="text-dark">{addresses.length}</strong> Addresses</div>
                <div><strong className="text-dark">{tier}</strong> Tier</div>
              </div>
              <div className="mt-3 d-grid">
                <button className="btn btn-success" onClick={() => navigate("/orders")}>View Orders</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="bg-light border p-4 rounded-3 mb-4">
              <h5 className="fw-bold mb-3">Account Details</h5>
              <div className="row g-3 g-md-4">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold mb-2">Name</label>
                  <input className="form-control py-2" name="name" value={profile.name} onChange={onChange} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold mb-2">Email</label>
                  <input type="email" className="form-control py-2" name="email" value={profile.email} onChange={onChange} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold mb-2">Phone</label>
                  <input className="form-control py-2" name="phone" value={profile.phone} onChange={onChange} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold mb-2">Default Address</label>
                  <textarea className="form-control" rows={3} name="address" value={profile.address} onChange={onChange} />
                </div>
              </div>
              <div className="mt-4 d-flex flex-wrap gap-3 align-items-center">
                <button className="btn btn-success" onClick={onSave}>Save Changes</button>
                {saved && <span className="text-success align-self-center">Saved</span>}
              </div>
            </div>

            <div className="bg-light border p-4 rounded-3 mb-4">
              <h5 className="fw-bold mb-3">Addresses</h5>
              <div className="row g-3">
                {addresses.map((a) => (
                  <div key={a.id} className="col-12 col-md-6">
                    <div className="bg-white border rounded-3 p-3 h-100 d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between">
                        <div className="small flex-grow-1">{a.text}</div>
                      </div>
                      <div className="mt-3 d-flex flex-wrap gap-2 align-items-center">
                        <button className="btn btn-sm btn-light border ms-auto" onClick={() => removeAddress(a.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 d-flex flex-wrap gap-2">
                <div className="w-100">
                  <input className="form-control" placeholder="Add new address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                  <button className="btn btn-success mt-2" onClick={addAddress}>Add</button>
                </div>
              </div>
            </div>

            <div className="bg-light border p-4 rounded-3 mb-4">
              <h5 className="fw-bold mb-3">Preferences</h5>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="newsletter" checked={newsletter} onChange={toggleNewsletter} />
                <label className="form-check-label" htmlFor="newsletter">Subscribe to newsletter</label>
              </div>
              <div className="mt-4 d-flex">
                <button className="btn btn-light border" onClick={onSave}>Save Preferences</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
