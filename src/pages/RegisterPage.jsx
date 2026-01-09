import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const RegisterPage = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    if (!name || !emailOk || password.length < 6 || password !== confirm) {
      setError(
        !name ? "Enter your name"
        : !emailOk ? "Enter a valid email address"
        : password.length < 6 ? "Password must be at least 6 characters"
        : "Passwords do not match"
      );
      return;
    }
    setLoading(true);
  try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed");
      }
      const data = await res.json();
      try { localStorage.setItem('pb_user', JSON.stringify(data.user)); } catch { void 0; }
      try { localStorage.setItem('pb_token', data.token || ''); } catch { void 0; }
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card shadow border-0 w-100" style={{ maxWidth: 480 }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#e6f5f1",
                color: "#009f7f",
              }}
            >
              <FaUser size={22} />
            </div>
            <h4 className="fw-bold mb-1">Create Account</h4>
            <p className="text-muted small">Register to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y px-3 text-muted cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control py-2"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100 py-2 fw-bold text-white rounded-pill mt-2"
              style={{ backgroundColor: "#009f7f" }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
            {error && <div className="text-danger small mt-2">{error}</div>}
          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <span
                className="fw-semibold text-success cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
